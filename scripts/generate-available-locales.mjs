import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const extractedDir = path.join(projectRoot, 'src/i18n/extracted');
const outputFile = path.join(projectRoot, 'src/i18n/available-locales.ts');

const locales = (await readdir(extractedDir))
  .filter((file) => file.endsWith('.json'))
  .map((file) => path.basename(file, '.json'));

await writeFile(outputFile, `export default ${JSON.stringify(locales).replaceAll('"', '\'')};\n`);
