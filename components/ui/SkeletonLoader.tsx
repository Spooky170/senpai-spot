import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-md shimmer bg-white/5',
        className
      )}
    />
  );
}

export function PostCardSkeleton() {
  return (
    <div className="post-card p-0 overflow-hidden">
      {/* Image */}
      <Skeleton className="w-full aspect-[16/9]" />
      <div className="p-5 space-y-3">
        {/* Category badge */}
        <Skeleton className="w-20 h-5 rounded-full" />
        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </div>
        {/* Excerpt */}
        <div className="space-y-2">
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-1/2 h-3" />
        </div>
        {/* Meta */}
        <div className="flex items-center gap-3 pt-2">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-20 h-3" />
          <Skeleton className="w-16 h-3 ml-auto" />
        </div>
      </div>
    </div>
  );
}

export function FeaturedPostSkeleton() {
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[16/7]">
      <Skeleton className="w-full h-full" />
      <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
        <Skeleton className="w-24 h-6 rounded-full" />
        <Skeleton className="w-3/4 h-8" />
        <Skeleton className="w-1/2 h-5" />
        <div className="flex gap-3">
          <Skeleton className="w-24 h-3" />
          <Skeleton className="w-24 h-3" />
        </div>
      </div>
    </div>
  );
}

export function PostGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="space-y-6">
      <div className="sidebar-widget">
        <Skeleton className="w-full h-10" />
        <div className="p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="w-7 h-7 rounded-md flex-shrink-0" />
              <Skeleton className="w-16 h-12 rounded-md flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-2/3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
