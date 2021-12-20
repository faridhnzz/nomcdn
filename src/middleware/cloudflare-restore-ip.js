const range_check = require('range_check');
const fs = require('fs');
const request = require('request');
var ipRanges = require('../../cloudflare-ip.json');

module.exports = function cloudflareRestore(options) {
  options = options || {};

  // Update list ip on start app
  if (options.update_on_start) {
    let list = {};
    const get_cf_ip = function (version) {
      return function (err, resp, body) {
        if (!err && resp.statusCode == 200) {
          list[version] = body.slice(0, -1).split('\n');
          if (list['ip4'] && list['ip6']) {
            fs.writeFile('cloudflare-ip.json', JSON.stringify(list), function (err) {
              if (err) {
                return console.log(err);
              }
              console.log('Cloudflare IP was updated and The file was saved!');
            });
          }
        }
      };
    };
    request('https://www.cloudflare.com/ips-v4', get_cf_ip('ip4'));
    request('https://www.cloudflare.com/ips-v6', get_cf_ip('ip6'));
  }

  return function (req, res, next) {
    const remoteIP = {
      ip: range_check.storeIP(req.ip), //app.set trust proxy could potentially modify this and cause issues
      ipv: 'ip' + range_check.version(range_check.storeIP(req.ip)),
    };
    req.cf_ip = remoteIP.ip; //override this if cloudflare present
    if (req.headers['cf-connecting-ip'] == undefined) {
      return next(); //no cloudflare IP, continue on like this never happened. Shhhh!
    }
    if (range_check.inRange(remoteIP.ip, ipRanges[remoteIP.ipv])) {
      req.cf_ip = req.headers['cf-connecting-ip'];
    }
    next();
  };
};
