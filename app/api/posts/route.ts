import { NextRequest, NextResponse } from 'next/server';
import { getPosts, getPostsByCategory, getFeaturedPosts } from '@/lib/blogger';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const page     = Math.max(1, parseInt(searchParams.get('page')     ?? '1',  10));
  const perPage  = Math.min(20, parseInt(searchParams.get('perPage') ?? '9',  10));
  const category = searchParams.get('category') ?? undefined;
  const featured = searchParams.get('featured') === 'true';
  const count    = parseInt(searchParams.get('count') ?? '6', 10);

  try {
    if (featured) {
      const posts = await getFeaturedPosts(count);
      return NextResponse.json({ posts }, { status: 200 });
    }

    if (category) {
      const result = await getPostsByCategory(category, page, perPage);
      return NextResponse.json(result, { status: 200 });
    }

    const result = await getPosts(page, perPage);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('[API/posts]', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts', posts: [] },
      { status: 500 }
    );
  }
}
