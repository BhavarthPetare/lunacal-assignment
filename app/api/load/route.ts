import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const assetsDir = path.join(process.cwd(), 'public', 'assets');
  const files = fs.readdirSync(assetsDir).filter(file =>
    /\.(png|jpe?g|jpg|webp)$/i.test(file)
  );
  const paths = files.map(file => `/assets/${file}`);
  return NextResponse.json({ images: paths });
}
