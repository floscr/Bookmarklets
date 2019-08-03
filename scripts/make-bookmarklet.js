const R = require('ramda')
const path = require('path')
const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { convert } = require('bookmarklet');

const main = function() {
  const dst = path.join(process.cwd(), 'dist');

  return R.pipe(
    readdirSync,
    R.map(R.pipe(
      f => path.join(dst, f),
      fileName => ({
        fileName,
        data: readFileSync(fileName, 'utf8'),
      }),
      R.over(R.lensProp('data'), x => convert(x, {})),
      R.tap(({ fileName, data }) => writeFileSync(fileName, data)),
    ))
  )(dst);
};

main();
