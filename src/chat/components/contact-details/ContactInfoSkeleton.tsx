import { Skeleton } from "@/components/ui/skeleton"

export const ContactInfoSkeleton = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col items-center pb-6 border-b">
        <Skeleton className="h-20 w-20 rounded-full mb-3" />
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-24 mb-1" />
        <Skeleton className="h-4 w-16" />
      </div>

      <div className="py-4 space-y-4">
        <div>
          <Skeleton className="h-5 w-40 mb-2" />
          <div className="space-y-2">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <Skeleton className="h-5 w-32 mb-2" />
          <div className="space-y-2">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  )
}