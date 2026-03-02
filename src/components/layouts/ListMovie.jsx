import { Link } from "react-router";

const ListMovie = ({ ListMovie, TitleList, slug }) => {
  return (
    <div className="relative w-full h-full pb-7 ">
      <div className="flex items-center justify-between mx-3">
        <Link className="row-start-1 col-start-1 col-span-3 text-2xl font-medium text-amber-50 h-fit" to={slug}>
          {TitleList}
        </Link>
        <Link
          className="row-start-1 col-start-7 justify-self-end col-span-2 text-[18px] font-medium block text-amber-50 h-fit"
          to={slug}
        >
          Xem thêm {">"}
        </Link>
      </div>
      <div className="p-5 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7  gap-3  from-white to-zinc-900 to-75% z-10">
        {ListMovie?.slice(0, 7).map(item => {
          return (
            <div
              key={item.slug}
              className={`w-full h-full place-items-center hover:scale-105 transition duration-300 ease-in-out`}
            >
              <a
                className="block text-center text-amber-50 text-[12px] md:text-[18px] md:font-medium "
                href={`/phim/${item.slug}`}
              >
                <img
                  className="object-cover w-full h-full rounded-md"
                  src={`https://phimapi.com/image.php?url=https://phimimg.com/${item.poster_url}`}
                  alt=""
                />
                {item.name}
              </a>
            </div>
          );
        })}
        <div
          className={`w-full h-full block md:hidden place-items-center place-content-center hover:scale-105 transition duration-300 ease-in-out`}
        >
          <Link className="block text-center text-amber-50 text-[12px] font-bold " to={`${slug}`}>
            Xem thêm {`>`}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListMovie;
