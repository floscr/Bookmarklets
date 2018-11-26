const R = require('ramda');

const getUnreadNodes = R.cond([
  [R.equals   ('discordapp.com'), () => document.querySelector('[class^="nameUnreadText"]')],
  [R.contains ('slack.com'),      () => document.querySelector('.p-channel_sidebar__channel--unread')],
  [R.T,                           () => 'No such page']
]);

const main = pipe(
  getUnreadNodes(document.location.host),
  R.ifElse(
    x => typeof x === 'object',
    R.tap(x => x.click()),
    R.tap(x => console.log('No new items found')),
  ),
)
