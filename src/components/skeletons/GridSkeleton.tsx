export default function GridSkeleton() {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="tablet:w-[212px] tablet:h-[306px] mobile:w-[93px] mobile:h-[134px] bg-gray03 rounded-[10px] animate-pulse" />
    </div>
  );
} 