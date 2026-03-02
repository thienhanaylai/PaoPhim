import { Link } from "react-router";

const CategoryMenu = ({ CategoryList, type }) => {
  CategoryList = CategoryList.filter(item => !item.slug.includes("phim-18"));
  return (
    <>
      <div className="bg-[#10112c] p-4 rounded-lg grid grid-rows-auto grid-cols-3 md:grid-rows-3 gap-5">
        {CategoryList.map(item => {
          return (
            <Link key={item.slug} className="text-amber-50! font-medium hover:text-amber-500!" to={`/${type}/${item.slug}`}>
              {item.name}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default CategoryMenu;
