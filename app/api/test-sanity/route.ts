import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ttm6ob66',
  dataset:   'production',
  apiVersion: '2024-01-01',
  useCdn:    false,
});

export async function GET() {
  try {
    const posts = await client.fetch(`*[_type == "post"] { _id, title, slug, publishedAt, categories }`);
    return NextResponse.json({ success: true, count: posts.length, posts });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
