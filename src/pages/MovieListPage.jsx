import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import movieService from "../services/movieService";
import SekeletonLoadingLogo from "../components/layouts/SekeletonLoadingLogo";
import { Link, useParams, useNavigate } from "react-router";
import { Pagination } from "antd";
import { useFavorites } from "../context/MovieContext";
import homeService from "../services/movieService";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
const SELECT_CLASS =
  "bg-gray-800 text-gray-300 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2 border border-gray-700 outline-none";

const getInitialFilters = pageType => {
  if (pageType === "danh-sach") {
    return { sort_field: "modified.time", sort_type: "desc", category: "", sort_lang: "", country: "", year: "" };
  }
  if (pageType === "quoc-gia") {
    return { sort_field: "", sort_type: "", sort_lang: "", category: "", year: "", limit: "28" };
  }
  // the-loai
  return { sort_field: "", sort_type: "", sort_lang: "", country: "", year: "", limit: "28" };
};

// pageType: "danh-sach" | "quoc-gia" | "the-loai"
const MovieListPage = ({ pageType = "danh-sach", type_list: typeListProp }) => {
  const { type_list: typeListParam } = useParams();
  const type_list = pageType === "danh-sach" ? typeListProp : typeListParam;

  const navigate = useNavigate();

  const [movieData, setMovieData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filterData, setFilterData] = useState({ countryList: [], categoryList: [] });
  const [filters, setFilters] = useState(() => getInitialFilters(pageType));

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i);

  const { favoriteIds, toggleFavorite } = useFavorites();

  useEffect(() => {
    setFilters(getInitialFilters(pageType));
    setCurrentPage(1);
  }, [type_list, pageType]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setIsLoading(true);
        let res;
        if (pageType === "danh-sach") {
          res = await movieService.getMoviebyFillter({ type_list, page: currentPage, ...filters });
        } else if (pageType === "quoc-gia") {
          res = await movieService.getMovieByCountry({ type_list, page: currentPage, ...filters });
          if (res.status === "error") return navigate("/404");
        } else {
          res = await movieService.getMovieByCategory({ type_list, page: currentPage, ...filters });
          if (!res.status) return navigate("/404");
        }
        const [countryList, categoryList] = await Promise.all([movieService.getCountry(), movieService.getCategory()]);
        setFilterData({ countryList, categoryList });
        setMovieData(res.data);
      } catch (err) {
        console.error("Lỗi:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApi();
  }, [type_list, currentPage, filters, pageType, navigate]);

  const onPageChange = pageNumber => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = e => {
    const { name, value } = e.target;
    if (pageType === "quoc-gia" && name === "country") {
      navigate(value ? `/quoc-gia/${value}` : "/");
      return;
    }
    if (pageType === "the-loai" && name === "category") {
      navigate(value ? `/the-loai/${value}` : "/");
      return;
    }
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

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

  if (isLoading || !movieData || movieData.length === 0) {
    return <SekeletonLoadingLogo />;
  }

  const categorySelectValue = pageType === "the-loai" ? type_list : filters.category;
  const countrySelectValue = pageType === "quoc-gia" ? type_list : filters.country;

  const pageTitle = movieData.titlePage ? `${movieData.titlePage} - PaoPhim` : "PaoPhim - Xem phim trực tuyến miễn phí";

  return (
    <div key={type_list} className="w-full h-full pt-[70px] p-4">
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={`${movieData.titlePage || "Danh sách phim"} - Xem phim online miễn phí chất lượng cao tại PaoPhim.`}
        />
      </Helmet>
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 gap-4">
        <p className="text-2xl text-amber-50 font-medium whitespace-nowrap">{movieData.titlePage}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full xl:w-auto">
          <select name="sort_field" value={filters.sort_field} onChange={handleFilterChange} className={SELECT_CLASS}>
            <option value="modified.time">Thời gian cập nhật</option>
            <option value="_id">Ngày đăng</option>
            <option value="year">Năm sản xuất</option>
          </select>

          <select name="sort_type" value={filters.sort_type} onChange={handleFilterChange} className={SELECT_CLASS}>
            <option value="desc">Mới nhất</option>
            <option value="asc">Cũ nhất</option>
          </select>

          <select name="category" value={categorySelectValue} onChange={handleFilterChange} className={SELECT_CLASS}>
            <option value="">Tất cả thể loại</option>
            {filterData.categoryList?.map(cat => (
              <option key={cat._id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          <select name="sort_lang" value={filters.sort_lang} onChange={handleFilterChange} className={SELECT_CLASS}>
            <option value="">Tất cả ngôn ngữ</option>
            <option value="vietsub">Vietsub</option>
            <option value="thuyet-minh">Thuyết minh</option>
            <option value="long-tieng">Lồng tiếng</option>
          </select>

          <select name="country" value={countrySelectValue} onChange={handleFilterChange} className={SELECT_CLASS}>
            <option value="">Tất cả quốc gia</option>
            {filterData.countryList?.map(item => (
              <option key={item._id} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>

          <select name="year" value={filters.year} onChange={handleFilterChange} className={SELECT_CLASS}>
            <option value="">Tất cả năm</option>
            {years.map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-7 gap-5 mb-8">
        {!movieData.items ? (
          <p className="text-[18px] col-span-2 font-medium text-amber-50">Không có kết quả cần tìm!</p>
        ) : (
          movieData.items.map(item => {
            const isFavorite = favoriteIds?.has(item?.slug) || false;
            return (
              <Link
                key={item.slug}
                className="block text-center text-amber-50 font-medium group hover:text-yellow-500 transition-colors"
                to={`/phim/${item.slug}`}
              >
                <div className="relative overflow-hidden rounded-lg mb-2">
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
                  <div className="absolute top-0 flex items-center h-6 w-fit bg-gray-800 text-orange-400 mt-1 ml-1 px-1 py-1 font-medium rounded-md">
                    <span className="leading-none font-medium">
                      {item.episode_current.includes("Hoàn Tất")
                        ? item.episode_current.match(/\(([^)]+)\)/)?.[1] || "Full"
                        : item.episode_current}
                    </span>
                  </div>
                  <img
                    className="object-cover w-full aspect-[2/3] group-hover:scale-105 transition-transform duration-300"
                    src={`https://phimapi.com/image.php?url=https://phimimg.com/${item.poster_url}`}
                    alt={item.name}
                    loading="lazy"
                  />
                </div>
                <span className="line-clamp-2 text-sm">{item.name}</span>
              </Link>
            );
          })
        )}
      </div>

      <div>
        <Pagination
          total={movieData.params.pagination.totalItems}
          showSizeChanger={false}
          align="center"
          defaultPageSize={movieData.params.pagination.totalItemsPerPage}
          current={currentPage}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default MovieListPage;
