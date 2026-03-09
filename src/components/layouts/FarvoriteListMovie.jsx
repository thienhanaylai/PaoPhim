import { CaretRightOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { useFavorites } from "../../context/MovieContext";
import { useAuth } from "../../context/AuthContext";
import homeService from "../../services/movieService";
const FarvoriteListMovie = ({ ListMovie, TitleList, slug, id = "" }) => {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const handleFavorite = async ({ slug }) => {
    try {
      const data = await homeService.getMovie({ slug });
      const movie = {
        slug: data.movie.slug,
        name: data.movie.name,
        thumb_url: data.movie.thumb_url,
        poster_url: data.movie.poster_url,
      };

      await toggleFavorite(movie);
    } catch (error) {
      console.error("Lỗi khi thêm phim yêu thích:", error);
    }
  };

  return (
    <div id={id} className="relative w-full h-full pb-7 scroll-mt-[70px]">
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
      {ListMovie.length ? (
        <div className="p-5 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7  gap-3  from-white to-zinc-900 to-75% z-10">
          {ListMovie?.slice(0, 7).map(item => {
            const isFavorite = favoriteIds?.has(item?.slug) || false;
            return (
              <div
                key={item.slug}
                className={`w-full h-full relative place-items-center hover:scale-105 transition duration-300 ease-in-out`}
              >
                <button
                  className="absolute right-2 z-20 p-1 text-white text-2xl"
                  onClick={e => {
                    e.preventDefault();
                    handleFavorite({ slug: item.slug });
                  }}
                >
                  {isFavorite ? (
                    <HeartFilled className=" text-amber-500! pt-1 text-2xl hover:scale-110 hover:text-amber-50" />
                  ) : (
                    <HeartOutlined className="text-white text-2xl hover:scale-110 hover:text-red-500 transition" />
                  )}
                </button>
                <a
                  className="block relative text-center text-amber-50 text-[12px] md:text-[16px] md:font-medium "
                  href={`/phim/${item.slug}`}
                >
                  <div className="absolute top-0 flex items-center h-6 w-fit bg-gray-800 text-orange-400 mt-1 ml-1 px-1 py-1 font-medium rounded-md">
                    <span className="leading-none font-medium">
                      {item?.episode_current?.includes("Hoàn Tất")
                        ? item.episode_current.match(/\(([^)]+)\)/)?.[1] || "Full"
                        : item.episode_current}
                    </span>
                  </div>
                  <img className="object-cover w-full h-full rounded-md" src={`${item.poster_url}`} alt="" loading="lazy" />
                  {item.name}
                </a>
              </div>
            );
          })}
          <div
            className={`w-full h-full block relative md:hidden place-items-center place-content-center hover:scale-105 transition duration-300 ease-in-out`}
          >
            <Link
              className="block w-full h-full top-[50%] absolute text-center text-amber-50 text-[12px] font-bold "
              to={`${slug}`}
            >
              Xem thêm
              <CaretRightOutlined />
            </Link>
          </div>
        </div>
      ) : (
        <>
          {!isAuthenticated ? (
            <p className="text-gray-500 text-sm text-center py-6">Đăng nhập để lưu nhưng bộ phim yêu thích !</p>
          ) : (
            <p className="text-gray-500 text-sm text-center py-6">Tym để lưu nhưng bộ phim yêu thích !</p>
          )}
        </>
      )}
    </div>
  );
};

export default FarvoriteListMovie;
