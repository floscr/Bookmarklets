const R = require('ramda');

const main = R.pipe(
  doc => `url=${encodeURIComponent(doc.location.href)}&title=${encodeURIComponent(doc.title)}`,
  query => `${process.env.DOMAIN}?${query}`,
  R.tap(console.log),
  R.tap(url => window.location.href = url),
);

main(document);
