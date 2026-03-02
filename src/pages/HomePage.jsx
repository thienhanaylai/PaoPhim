import { useEffect, useState } from "react";
import HeroSection from "../components/layouts/HeroSection";
import movieService from "../services/movieService";
import ListMovie from "../components/layouts/ListMovie";

const HomePage = () => {
  const [newMovie, setnewMovie] = useState([]);
  const [newMovieBo, setNewMovieBo] = useState([]);
  const [newMovieLe, setNewMovieLe] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await movieService.getNewMovies();
        const res1 = await movieService.getNewMovieBo();
        const res2 = await movieService.getNewMovieLe();
        setnewMovie(res.items);
        setNewMovieBo(res1.data.items);
        setNewMovieLe(res2.data.items);
      } catch (err) {
        console.error("Lỗi:", err);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      <HeroSection MovieData={newMovie} />
      <ListMovie ListMovie={newMovieBo} TitleList={"Phim Bộ"} slug={"phim-bo"} />
      <ListMovie ListMovie={newMovieLe} TitleList={"Phim Lẻ"} slug={"phim-le"} />
    </>
  );
};

export default HomePage;
