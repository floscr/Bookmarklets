const R = require('ramda');
const {
    hostNameIs,
    locationPathParts,
} = require('./lib/utils')

/** Youtube **/

const isYoutubeHost = hostNameIs('youtube.com');

const isYoutubeChannelUrl = R.allPass([
    R.propSatisfies(isYoutubeHost, 'host'),
    R.propSatisfies(R.test(/^\/c(hannel)?\//), 'pathname'),
])

const youtubeChannelFeed = R.pipe(
    () => document.querySelector('meta[itemprop^="channelId"]').content,
    id => `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`
)

/** Twitter **/

const isTwitterUrl = hostNameIs('twitter.com');

let twitterUserFeed = R.pipe(
    locationPathParts,
    R.nth(0),
    id => `https://nitter.net/${id}/rss`
)

/** Site feeds **/

const findDomHref = R.pipe(
    x => document.querySelector(x),
    R.prop('href'),
);

/** Main **/

const main = () => {
    const maybeFeed = R.cond([
        [
            () => isYoutubeChannelUrl(window.location),
            youtubeChannelFeed,
        ],
        [
            () => isTwitterUrl(window.location.host),
            () => twitterUserFeed(window.location.pathname)
        ],
        [R.T, R.find(fn => !!fn(), [
            () => findDomHref('link[type^="application/rss+xml"]'),
            () => findDomHref('link[type^="application/atom+xml"]'),
            () => findDomHref('a[href$="rss.xml"]'),
        ])],
    ])()
    if (maybeFeed) {
        navigator.clipboard.writeText(maybeFeed)
        return;
    }
    alert('No feed found!');
}

main();
