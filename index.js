const PRESET_VALUES = [
  "hz60",
  "hz170",
  "hz310",
  "hz600",
  "hz1000",
  "hz3000",
  "hz6000",
  "hz12000",
  "hz14000",
  "hz16000",
  "preamp"
];

const HEADER_LENGTH = 27;
function parser(arrayBuffer) {
  const data = {};
  let i = 0;
  const arr = new Int8Array(arrayBuffer);
  // Parse header
  data.type = String.fromCharCode.apply(null, arr.slice(i, HEADER_LENGTH));
  i += HEADER_LENGTH;
  // Skip "<ctrl-z>!--"
  i += 4;
  // Get the presets
  data.presets = [];
  while (i < arr.length) {
    const preset = {};
    // Get the name
    const start = i;
    const strEnd = start + 257; // Str is fixed length
    // Str is null terminated
    while (arr[i] !== 0 && i < strEnd) {
      i++;
    }
    preset.name = String.fromCharCode.apply(null, arr.slice(start, i));
    i = strEnd; // Skip over any unused bytes

    // Get the levels
    PRESET_VALUES.forEach(function(valueName) {
      preset[valueName] = 64 - arr[i++]; // Adjust for inverse values
    });
    data.presets.push(preset);
  }
  return data;
}

module.exports = parser;
