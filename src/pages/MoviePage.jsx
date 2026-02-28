import { useEffect, useState } from "react";
import movieService from "../services/movieService";
import SekeletonLoadingLogo from "../components/layouts/SekeletonLoadingLogo";
import { Link } from "react-router";
import { Pagination } from "antd";

let CategoryList = await movieService.getCategory();
CategoryList = CategoryList.filter(item => !item.slug.includes("phim-18"));
const MoviePage = ({ type_list = "phim-bo" }) => {
  const [movieData, setMovieData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    sort_field: "modified.time",
    sort_type: "desc",
    category: "",
    sort_lang: "",
    country: "",
    year: "",
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await movieService.getMoviebyFillter({
          type_list,
          page: currentPage,
          ...filters,
        });
        setMovieData(res.data);
      } catch (err) {
        console.error("Lỗi:", err);
      }
    };
    fetchApi();
  }, [type_list, currentPage, filters]);

  const onPageChange = pageNumber => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  if (!movieData || movieData.length === 0) {
    return <SekeletonLoadingLogo />;
  }

  return (
    <div key={type_list} className="w-full h-full mt-[70px] p-4 sm:p-7">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 gap-4">
        <p className="text-2xl text-amber-50 font-medium whitespace-nowrap">{movieData.titlePage}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full xl:w-auto">
          <select
            name="sort_field"
            value={filters.sort_field}
            onChange={handleFilterChange}
            className="bg-gray-800 text-gray-300 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2 border border-gray-700 outline-none"
          >
            <option value="modified.time">Thời gian cập nhật</option>
            <option value="_id">Ngày đăng</option>
            <option value="year">Năm sản xuất</option>
          </select>

          <select
            name="sort_type"
            value={filters.sort_type}
            onChange={handleFilterChange}
            className="bg-gray-800 text-gray-300 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2 border border-gray-700 outline-none"
          >
            <option value="desc">Mới nhất</option>
            <option value="asc">Cũ nhất</option>
          </select>

          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="bg-gray-800 text-gray-300 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2 border border-gray-700 outline-none"
          >
            <option value="">Tất cả thể loại</option>
            {CategoryList.map(cat => (
              <option key={cat._id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            name="sort_lang"
            value={filters.sort_lang}
            onChange={handleFilterChange}
            className="bg-gray-800 text-gray-300 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2 border border-gray-700 outline-none"
          >
            <option value="">Tất cả ngôn ngữ</option>
            <option value="vietsub">Vietsub</option>
            <option value="thuyet-minh">Thuyết minh</option>
            <option value="long-tieng">Lồng tiếng</option>
          </select>

          <select
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
            className="bg-gray-800 text-gray-300 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2 border border-gray-700 outline-none"
          >
            <option value="">Tất cả quốc gia</option>
            <option value="han-quoc">Hàn Quốc</option>
            <option value="trung-quoc">Trung Quốc</option>
            <option value="au-my">Âu Mỹ</option>
            <option value="viet-nam">Việt Nam</option>
            <option value="nhat-ban">Nhật Bản</option>
            <option value="thai-lan">Thái Lan</option>
          </select>

          <select
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            className="bg-gray-800 text-gray-300 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2 border border-gray-700 outline-none"
          >
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
        {movieData.items.map(item => (
          <Link
            key={item.slug}
            className="block text-center text-amber-50 font-medium group hover:text-yellow-500 transition-colors"
            to={`/phim/${item.slug}`}
          >
            <div className="relative overflow-hidden rounded-2xl mb-2">
              <img
                className="object-cover w-full aspect-[2/3] group-hover:scale-105 transition-transform duration-300"
                src={`https://phimapi.com/image.php?url=https://phimimg.com/${item.poster_url}`}
                alt={item.name}
              />
            </div>
            <span className="line-clamp-2 text-sm">{item.name}</span>
          </Link>
        ))}
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

export default MoviePage;
