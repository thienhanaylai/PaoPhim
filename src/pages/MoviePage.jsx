import { useEffect, useState } from "react";
import movieService from "../services/movieService";
import SekeletonLoadingLogo from "../components/layouts/SekeletonLoadingLogo";
import { Link } from "react-router";
import { Pagination } from "antd";

const MoviePage = ({ type_list = "phim-bo" }) => {
  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await movieService.getMoviebyFillter({ type_list });
        setMovieData(res.data);
      } catch (err) {
        console.error("Lỗi:", err);
      }
    };
    fetchApi();
  }, []);
  const onChange = async pageNumber => {
    const res = await movieService.getMoviebyFillter({ type_list, page: pageNumber });
    setMovieData(res.data);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  if (!movieData || movieData.length === 0) {
    return <SekeletonLoadingLogo />;
  }
  return (
    <>
      <div key={type_list} className="w-full h-full mt-[70px] p-7">
        <p className="text-2xl text-amber-50 font-medium mb-5">{movieData.titlePage}</p>
        <div className="grid grid-cols-3 sm:grid-cols-4  md:grid-cols-5 xl:grid-cols-7  gap-5 ">
          {movieData.items.map(item => {
            return (
              <Link key={item.slug} className="block text-center text-amber-50 font-medium" to={`/phim/${item.slug}`}>
                <img
                  className="object-cover w-full aspect-[2/3] rounded-2xl "
                  src={`https://phimapi.com/image.php?url=https://phimimg.com/${item.poster_url}`}
                  alt=""
                />
                {item.name}
              </Link>
            );
          })}
        </div>
        <div>
          <Pagination
            total={movieData.params.pagination.totalItems}
            showSizeChanger={false}
            align="center"
            defaultPageSize={movieData.params.pagination.totalItemsPerPage}
            current={movieData.params.pagination.currentPage}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};

export default MoviePage;
