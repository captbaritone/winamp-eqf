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

const HEADER = "Winamp EQ library file v1.1";
function parser(arrayBuffer) {
  const data = {};
  let i = 0;
  const arr = new Int8Array(arrayBuffer);
  // Parse header
  data.type = String.fromCharCode.apply(null, arr.slice(i, HEADER.length));
  if (data.type !== HEADER) {
    throw new Error("Invalid .eqf file.");
  }
  i += HEADER.length;
  // Skip "<ctrl-z>!--"
  i += 4;
  // Get the presets
  data.presets = [];
  while (i < arr.length) {
    const preset = {};
    // Get the name
    const nameStart = i;
    const nameEnd = nameStart + 257; // Str is fixed length
    // Str is null terminated
    while (arr[i] !== 0 && i <= nameEnd) {
      i++;
    }
    preset.name = String.fromCharCode.apply(null, arr.slice(nameStart, i));
    i = nameEnd; // Skip over any unused bytes

    // Get the levels
    PRESET_VALUES.forEach(function(valueName) {
      preset[valueName] = 64 - arr[i++]; // Adjust for inverse values
    });
    data.presets.push(preset);
  }
  return data;
}

module.exports = parser;
