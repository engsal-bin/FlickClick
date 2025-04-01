import GridSkeleton from "./GridSkeleton";

export default function GridSkeletonList() {
  return (
    <div className="flex flex-wrap tablet:gap-[30px] mobile:gap-[10px]">
      {[...Array(20)].map((_, index) => (
        <GridSkeleton key={index} />
      ))}
    </div>
  );
} 