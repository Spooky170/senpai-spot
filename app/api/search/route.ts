import { NextRequest, NextResponse } from 'next/server';
import { searchPosts } from '@/lib/blogger';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query      = (searchParams.get('q') ?? '').trim();
  const maxResults = Math.min(50, parseInt(searchParams.get('max') ?? '20', 10));

  if (!query) {
    return NextResponse.json({ posts: [], query: '', total: 0 }, { status: 200 });
  }

  try {
    const posts = await searchPosts(query, maxResults);
    return NextResponse.json({ posts, query, total: posts.length }, { status: 200 });
  } catch (error) {
    console.error('[API/search]', error);
    return NextResponse.json(
      { error: 'Search failed', posts: [], query, total: 0 },
      { status: 500 }
    );
  }
}
