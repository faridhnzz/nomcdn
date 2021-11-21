'use strict';

// const extensionWhitelist = ('.css', '.js');

// const extensionBlacklist = '.png';

module.exports = {
  // file extension BalckList
  extensionBlacklist: new Set(['', '.bz2', '.dcm', '.exe', '.gif', '.gz', '.rar', '.iso', '.zip']),

  // file extension WhiteList
  extensionWhitelist: new Set([
    '.ico',
    '.jpg',
    '.png',
    '.jpeg',
    '.gif',
    '.appcache',
    '.coffee',
    '.css',
    '.csv',
    '.eot',
    '.geojson',
    '.handlebars',
    '.hbs',
    '.htm',
    '.html',
    '.ics',
    '.js',
    '.json',
    '.jsonld',
    '.kml',
    '.md',
    '.mjs',
    '.n3',
    '.nt',
    '.otf',
    '.owl',
    '.pdf',
    '.rdf',
    '.rss',
    '.shex',
    '.svg',
    '.swf',
    '.ttc',
    '.ttf',
    '.ttl',
    '.vtt',
    '.wasm',
    '.woff',
    '.woff2',
    '.xht',
    '.xhtml',
    '.xml',
    '.xsl',
    '.xslt',
    '.yaml',
    '.yml',
  ]),
};
