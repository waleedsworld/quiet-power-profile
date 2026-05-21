import { useState, type ImgHTMLAttributes } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageWithSkeletonProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** extra classes for the wrapper element */
  wrapperClassName?: string;
};

/**
 * ImageWithSkeleton — renders a shimmering placeholder while a remote image
 * loads, fades the image in on success, and shows a graceful empty state if
 * the image fails. Purely additive: forwards every native <img> prop through.
 */
export const ImageWithSkeleton = ({
  className,
  wrapperClassName,
  alt = "",
  onLoad,
  onError,
  ...props
}: ImageWithSkeletonProps) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      {!loaded && !failed && (
        <div className="absolute inset-0 shimmer-skeleton" aria-hidden="true" />
      )}

      {failed ? (
        <div className="flex min-h-[8rem] w-full flex-col items-center justify-center gap-2 bg-card/60 py-10 text-secondary-text">
          <ImageOff className="h-5 w-5 opacity-60" />
          <span className="text-xs font-medium">Image unavailable</span>
        </div>
      ) : (
        <img
          {...props}
          alt={alt}
          className={cn(
            "transition-opacity duration-700 ease-out",
            loaded ? "opacity-100" : "opacity-0",
            className
          )}
          onLoad={(e) => {
            setLoaded(true);
            onLoad?.(e);
          }}
          onError={(e) => {
            setFailed(true);
            onError?.(e);
          }}
        />
      )}
    </div>
  );
};
