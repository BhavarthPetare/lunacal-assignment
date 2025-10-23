import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

// Helper to save uploaded file
async function saveImage(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), 'public/assets', file.name);
  await writeFile(filePath, buffer);

  return `/assets/${file.name}`;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const path = await saveImage(file);

    return NextResponse.json({ success: true, path });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
