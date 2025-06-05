const Design = () => {
  return (
    <div className="overflow-y-auto">
      <div>
        <h1 className="text-headline-0">design system</h1>
        <h2 className="text-headline-1">grayscale</h2>
        <div className="flex">
          <div className="h-20 w-20 bg-gray-900"></div>
          <div className="h-20 w-20 bg-gray-800"></div>
          <div className="h-20 w-20 bg-gray-700"></div>
          <div className="h-20 w-20 bg-gray-600"></div>
          <div className="h-20 w-20 bg-gray-500"></div>
          <div className="h-20 w-20 bg-gray-400"></div>
          <div className="h-20 w-20 bg-gray-300"></div>
          <div className="h-20 w-20 bg-gray-200"></div>
          <div className="h-20 w-20 bg-gray-100"></div>
          <div className="h-20 w-20 bg-gray-50"></div>
          <div className="bg-gray-0 h-20 w-20"></div>
        </div>
        <h2 className="text-headline-1">main/sub color</h2>
        <div className="flex">
          <div className="bg-sub-blue-300 h-20 w-20"></div>
          <div className="bg-main-red-300 h-20 w-20"></div>
          <div className="bg-main-red-200 h-20 w-20"></div>
          <div className="bg-main-red-100 h-20 w-20"></div>
          <div className="bg-main-red-50 h-20 w-20"></div>
          <div className="shadow-default h-20 w-20"></div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-headline-0">headline-0</p>
        <p className="text-headline-1">headline-1</p>
        <p className="text-headline-2">headline-2</p>
        <p className="text-headline-3">headline-3</p>

        <p className="text-title-1">title-1</p>
        <p className="text-title-2">title-2</p>
        <p className="text-title-3">title-3</p>

        <p className="text-label-1">label-1</p>
        <p className="text-label-2">label-2</p>

        <p className="text-body-1">body-1</p>
        <p className="text-body-2">body-2</p>

        <p className="text-caption-1">caption-1</p>
        <p className="text-caption-2">caption-2</p>
      </div>
    </div>
  );
};

export default Design;
