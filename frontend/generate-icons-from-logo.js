import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const outputDir = path.join(__dirname, 'public');

async function generateIcons() {
  console.log('🎨 Generando íconos PWA con texto Bravo Automóviles...\n');

  for (const size of sizes) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Fondo
    ctx.fillStyle = '#1890cf';
    ctx.fillRect(0, 0, size, size);

    // Texto
    ctx.fillStyle = 'white';
    ctx.font = `${size / 5}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Bravo Automóviles', size / 2, size / 2);

    const outputFile = path.join(outputDir, `icon-${size}.png`);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputFile, buffer);
    console.log(`✅ Generado: icon-${size}.png`);
  }

  console.log('\n🎉 ¡Íconos generados exitosamente!');
}

generateIcons().catch(console.error);
