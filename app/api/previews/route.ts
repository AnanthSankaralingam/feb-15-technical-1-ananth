import { NextResponse } from 'next/server';
import type { Component } from '@/types/components';
import { createPreview, listPreviews } from '@/lib/previews';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const components = body.components as Component[] | undefined;
    const name = typeof body.name === 'string' ? body.name : undefined;

    if (!Array.isArray(components)) {
      return NextResponse.json(
        { error: 'Invalid payload: "components" must be an array.' },
        { status: 400 }
      );
    }

    const preview = createPreview(components, name);

    return NextResponse.json({ id: preview.id, name: preview.name }, { status: 201 });
  } catch (error) {
    console.error('Error creating preview', error);
    return NextResponse.json(
      { error: 'Failed to create preview.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const previews = listPreviews();
    return NextResponse.json({ previews });
  } catch (error) {
    console.error('Error listing previews', error);
    return NextResponse.json(
      { error: 'Failed to list previews.' },
      { status: 500 }
    );
  }
}

