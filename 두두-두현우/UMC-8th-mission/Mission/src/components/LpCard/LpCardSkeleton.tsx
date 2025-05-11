const LpCardSkeleton = () => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className={"bg-gray-300 w-full h-48"}></div>
      <div className="absolute bottom-0 left-0 right-0 bg-green-300 bg-opacity-75 p-2"></div>
      <div className="bg-amber-700 h04 w-3/4 rounded-sm"></div>
    </div>
  );
};

export default LpCardSkeleton;
