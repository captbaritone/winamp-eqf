const { join } = require("path");
const { readFileSync } = require("fs");
const parser = require("./");
var bufferToArrayBuffer = require("buffer-to-arraybuffer");

const fixtures = [
  // All bands max, preamp mid
  "max.EQF",
  // All bands min, preamp mid
  "min.EQF",
  // All bands mid, preamp mid
  "midline.EQF",
  // All bands mid, preamp max
  "preampMax.EQF",
  // All bands mid, preamp min
  "preampMin.EQF",
  "random.EQF",
  "winamp_sample.q1",
  "winamp.q1"
];

describe("parser", () => {
  fixtures.forEach(fileName => {
    const data = readFileSync(join("sample_data", fileName));
    const arrayBuffer = bufferToArrayBuffer(data);
    it(`can parse ${fileName}`, () => {
      const foo = parser(arrayBuffer);
      expect(foo).toMatchSnapshot();
    });
  });
});
