import fs from 'fs';
import path from 'path';

export function getSiteConfig() {

  const site = process.env.SITE || 'foxhome';

  const filePath = path.join(
    __dirname,
    `../sites/${site}.json`
  );

  return JSON.parse(
    fs.readFileSync(filePath, 'utf-8')
  );
}