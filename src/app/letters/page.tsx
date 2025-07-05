import FilterOptions from "./_components/filter-options";
import SortOptions from "./_components/sort-options";
import PostList from "./_components/post-list";

const page = () => {
  return (
    <div className="flex h-full flex-col">
      <header className="text-title-1 header py-[0.66rem]">소식함</header>

      <div className="overflow-auto-hide-scroll px-4">
        <FilterOptions />
        <SortOptions />
        <PostList />
      </div>
    </div>
  );
};

export default page;
