import { NextResponse } from 'next/server';
import type { Component } from '@/types/components';
import { getPreview, updatePreview } from '@/lib/previews';

interface RouteContext {
  params: { id: string };
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = context.params;

  try {
    const body = await request.json();
    const components = body.components as Component[] | undefined;

    if (!Array.isArray(components)) {
      return NextResponse.json(
        { error: 'Invalid payload: "components" must be an array.' },
        { status: 400 }
      );
    }

    const preview = updatePreview(id, components);
    return NextResponse.json({ id: preview.id, name: preview.name }, { status: 200 });
  } catch (error) {
    console.error('Error updating preview', error);
    return NextResponse.json(
      { error: 'Failed to update preview.' },
      { status: 500 }
    );
  }
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = context.params;

  try {
    const preview = getPreview(id);

    if (!preview) {
      return NextResponse.json({ error: 'Preview not found.' }, { status: 404 });
    }

    return NextResponse.json(
      {
        id: preview.id,
        components: preview.components,
        createdAt: preview.createdAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching preview', error);
    return NextResponse.json(
      { error: 'Failed to fetch preview.' },
      { status: 500 }
    );
  }
}

