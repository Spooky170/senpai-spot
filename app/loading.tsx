import { PostGridSkeleton, FeaturedPostSkeleton } from '@/components/ui/SkeletonLoader';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
      {/* Hero skeleton */}
      <FeaturedPostSkeleton />

      {/* Grid skeleton */}
      <div>
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-3 bg-white/5 rounded shimmer" />
          <div className="w-40 h-6 bg-white/5 rounded shimmer" />
        </div>
        <PostGridSkeleton count={6} />
      </div>
    </div>
  );
}
