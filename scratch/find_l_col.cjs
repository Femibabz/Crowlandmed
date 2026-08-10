const fs = require('fs');
const zlib = require('zlib');

const buf = fs.readFileSync('public/logo.png');
let pos = 8;
const idatChunks = [];

while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IDAT') {
    idatChunks.push(buf.slice(pos + 8, pos + 8 + len));
  }
  pos += 12 + len;
}

const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
const width = 709;
const height = 135;

// Find row Y = 40 (through LUNDY'S LANE)
const row = 40;
let lineStart = row * (width * 4 + 1) + 1;

let textStart = -1;
let textEnd = -1;
let textR = 0, textG = 0, textB = 0, samples = 0;

for (let x = 0; x < width; x++) {
  const r = decompressed[lineStart + x * 4];
  const g = decompressed[lineStart + x * 4 + 1];
  const b = decompressed[lineStart + x * 4 + 2];
  const a = decompressed[lineStart + x * 4 + 3];

  if (a > 200 && r > 120 && g < 50 && b < 50) { // Red pixel of LUNDY'S LANE
    if (textStart === -1) textStart = x;
    textEnd = x;
    textR += r;
    textG += g;
    textB += b;
    samples++;
  }
}

// Find heart start row Y = 50
let heartStart = -1;
const heartRow = 50;
let heartLineStart = heartRow * (width * 4 + 1) + 1;
for (let x = 0; x < width; x++) {
  const a = decompressed[heartLineStart + x * 4 + 3];
  if (a > 100) {
    heartStart = x;
    break;
  }
}

const avgR = Math.round(textR / samples);
const avgG = Math.round(textG / samples);
const avgB = Math.round(textB / samples);

const hex = '#' + [avgR, avgG, avgB].map(v => v.toString(16).padStart(2, '0')).join('');

console.log({
  width,
  height,
  heartStart, // Start of heart icon
  textStart,  // Start of L in LUNDY'S
  textEnd,    // End of E in LANE
  hexColor: hex
});
