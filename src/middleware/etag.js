// const crypto = require('crypto');

// const taggart = (opts) => {
//   // standard express style
//   return (req, res, next) => {
//     // save methods
//     const write = res.write;
//     const end = res.end;

//     // sha1 ain't that bad
//     const hash = crypto.createHash('sha1');

//     // keep track, for content-length
//     let length = 0;

//     const onData = (chunk, encoding) => {
//       // sometimes chunk can be 'undefined'
//       if (!chunk) {
//         return;
//       }

//       // convert chunk to buffer
//       chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding);

//       // update hash using chunk data
//       hash.update(chunk);
//       length += Buffer.byteLength(chunk, 'utf8');
//     };

//     const onEnd = (chunk, encoding) => {
//       onData(chunk, encoding);

//       // generate tag
//       const l = length.toString(16);
//       const h = hash.digest('hex');

//       // weak or strong? use length and hash as ETag
//       const tag = opts.weak ? `W/${l}-${h}` : `${l}-${h}`;
//       res.setHeader('ETag', tag);
//     };

//     // override the default methods
//     res.write = (...args) => {
//       onData(...args);
//       write.apply(res, [...args]);
//     };

//     res.end = (...args) => {
//       onEnd(...args);
//       end.apply(res, [...args]);
//     };

//     next();
//   };
// };

// module.exports = taggart;

// v2
