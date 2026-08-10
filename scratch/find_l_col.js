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
const bpp = 4; // RGBA
const stroke = width * bpp + 1;

// Let's sample a horizontal row through the middle of the logo (row 45)
// In row 45, heart icon is red/dark, then gap (white/transparent), then 'L' starts (red #C02026 / #E53E5B).
const row = 45;
let lineStart = row * stroke + 1;

let iconStart = -1, iconEnd = -1, textStart = -1;

for (let x = 0; x < width; x++) {
  const r = decompressed[lineStart + x * 4];
  const g = decompressed[lineStart + x * 4 + 1];
  const b = decompressed[lineStart + x * 4 + 2];
  const a = decompressed[lineStart + x * 4 + 3];

  const isNonWhite = a > 50 && !(r > 240 && g > 240 && b > 240);
  if (isNonWhite) {
    if (iconStart === -1) iconStart = x;
    if (iconEnd !== -1 && textStart === -1 && x - iconEnd > 10) {
      textStart = x;
    }
  } else {
    if (iconStart !== -1 && iconEnd === -1) {
      iconEnd = x;
    }
  }
}

console.log({ width, height, iconStart, iconEnd, textStart });
