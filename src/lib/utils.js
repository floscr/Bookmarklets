const R = require('ramda');

const hostNameIs = R.curry((val, host) => R.pipe(
    R.replace(/^www\./, ''),
    R.equals(val),
)(host))

const locationPathParts = R.pipe(
    R.split('/'),
    R.drop(1), // Remove first slash
)

module.exports = {
    hostNameIs,
    locationPathParts,
}
