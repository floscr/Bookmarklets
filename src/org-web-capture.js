const R = require('ramda');

const main = R.pipe(
  doc => `[[${doc.location.href}][${doc.title}]]`,
  link => `captureTemplateName=Inbox&captureContent=${link}&captureFile=/org/inbox.org`,
  query => `${process.env.DOMAIN}?${query}`,
  R.tap(console.log),
  R.tap(url => window.location.href = url),
);

main(document);
