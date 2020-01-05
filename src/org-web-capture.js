const R = require('ramda');

const main = R.pipe(
  doc => `url=${encodeURIComponent(doc.location.href)}&title=${encodeURIComponent(doc.title)}&action=go_back`,
  query => `${process.env.CAPTURE_DOMAIN}?${query}`,
  R.tap(console.log),
  R.tap(url => window.location.href = url),
);

main(document);
