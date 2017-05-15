const { Parser } = require("binary-parser");

function translateHz(value) {
  return 64 - value;
}

const hzOptions = { formatter: translateHz };

var presetParser = new Parser()
  .string("name", { zeroTerminated: true })
  .skip(function() {
    // TODO: In the .q1 files, there is more data here. Not sure what it means.
    return 256 - this.name.length;
  })
  .uint8("hz60", hzOptions)
  .uint8("hz170", hzOptions)
  .uint8("hz310", hzOptions)
  .uint8("hz600", hzOptions)
  .uint8("hz1000", hzOptions)
  .uint8("hz3000", hzOptions)
  .uint8("hz6000", hzOptions)
  .uint8("hz12000", hzOptions)
  .uint8("hz14000", hzOptions)
  .uint8("hz16000", hzOptions)
  .uint8("preamp", hzOptions);

var parser = new Parser()
  .string("type", {
    length: 27,
    assert: header => header === "Winamp EQ library file v1.1"
  })
  .skip(4) // "<ctrl-z>!--"
  .array("presets", { type: presetParser, readUntil: "eof" });

module.exports = parser.parse.bind(parser);
