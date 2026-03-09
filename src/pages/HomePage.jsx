import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "../components/layouts/HeroSection";
import movieService from "../services/movieService";
import ListMovie from "../components/layouts/ListMovie";
import { useFavorites } from "../context/MovieContext";
import FarvoriteListMovie from "../components/layouts/FarvoriteListMovie";
const HomePage = () => {
  const { favoriteMovies } = useFavorites();
  const [moviesData, setMoviesData] = useState({
    newMovie: [],
    newMovieBo: [],
    newMovieLe: [],
    newMovieUK: [],
    newMovieHan: [],
    newMovieTrung: [],
  });
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const [newMovie, newMovieBo, newMovieLe, newMovieUK, newMovieHan, newMovieTrung] = await Promise.all([
          movieService.getMovieTop5(),
          movieService.getNewMovieBo(),
          movieService.getNewMovieLe(),
          movieService.getMovieByCountry({ type_list: "au-my", page: 1, limit: "7" }),
          movieService.getMovieByCountry({ type_list: "han-quoc", page: 1, limit: "7" }),
          movieService.getMovieByCountry({ type_list: "trung-quoc", page: 1, limit: "7" }),
        ]);
        setMoviesData({
          newMovie: newMovie || [],
          newMovieBo: newMovieBo?.data?.items || [],
          newMovieLe: newMovieLe?.data?.items || [],
          newMovieUK: newMovieUK?.data || [],
          newMovieHan: newMovieHan?.data || [],
          newMovieTrung: newMovieTrung?.data || [],
        });
      } catch (err) {
        console.error("Lỗi:", err);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      <Helmet>
        <title>PaoPhim - Xem phim trực tuyến miễn phí chất lượng cao</title>
        <meta
          name="description"
          content="PaoPhim - Nền tảng xem phim trực tuyến miễn phí chất lượng cao. Cập nhật liên tục các bộ phim mới nhất, phim bộ, phim lẻ chiếu rạp với tốc độ load nhanh."
        />
      </Helmet>
      <HeroSection MovieData={moviesData.newMovie} />
      <FarvoriteListMovie ListMovie={favoriteMovies} TitleList={"Phim Yêu Thích"} slug={"phim-yeu-thich"} />
      <ListMovie id="section1" ListMovie={moviesData.newMovieBo} TitleList={"Phim Bộ"} slug={"phim-bo"} />
      <ListMovie ListMovie={moviesData.newMovieLe} TitleList={"Phim Lẻ"} slug={"phim-le"} />
      <ListMovie
        ListMovie={moviesData.newMovieUK?.items}
        TitleList={"Phim US-UK"}
        slug={`/quoc-gia/${moviesData.newMovieUK?.type_list}`}
      />
      <ListMovie
        ListMovie={moviesData.newMovieHan?.items}
        TitleList={"Phim Hàn Xẻng"}
        slug={`/quoc-gia/${moviesData.newMovieHan?.type_list}`}
      />
      <ListMovie
        ListMovie={moviesData.newMovieTrung?.items}
        TitleList={"Phim Trung Quốc"}
        slug={`/quoc-gia/${moviesData.newMovieTrung?.type_list}`}
      />
    </>
  );
};

export default HomePage;
