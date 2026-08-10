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

// Scan horizontal line Y = 40
const row = 40;
// Line start including 1 filter byte per row
// Note: PNG rows have a filter byte at index 0 of each row
// But inflateSync returns un-filtered rows if filter is 0, let's just inspect raw bytes
let lineStart = row * (width * 4 + 1) + 1;

let textStart = -1;
let iconStart = -1;
let iconEnd = -1;

for (let x = 0; x < width; x++) {
  const r = decompressed[lineStart + x * 4];
  const g = decompressed[lineStart + x * 4 + 1];
  const b = decompressed[lineStart + x * 4 + 2];
  const a = decompressed[lineStart + x * 4 + 3];

  if (a > 100) {
    if (iconStart === -1) {
      iconStart = x;
    }
    if (iconEnd !== -1 && textStart === -1 && x > 200) {
      textStart = x;
    }
  } else {
    if (iconStart !== -1 && iconEnd === -1 && x > 100) {
      iconEnd = x;
    }
  }
}

console.log('Result:', { width, height, iconStart, iconEnd, textStart });
