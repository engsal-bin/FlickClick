export default function GridSkeletonList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <div className="relative w-[200px] h-[265px]  rounded-lg overflow-hidden">
          <div
            key={index}
            className="w-full h-full rounded-lg bg-gray-300 animate-pulse"
          ></div>
        </div>
      ))}
    </div>
  );
}
