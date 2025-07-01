import FilterOptions from "./_components/filter-options";
import SortOptions from "./_components/sort-options";
import PostList from "./_components/post-list";

const page = () => {
  return (
    <div className="flex-1 px-4">
      <FilterOptions />
      <SortOptions />
      <PostList />
    </div>
  );
};

export default page;
