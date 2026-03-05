import { Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import homeService from "../../services/movieService";
import { IoPlayCircle, IoInformationCircleSharp } from "react-icons/io5";
import SekeletonLoadingLogo from "./SekeletonLoadingLogo";
import { Link } from "react-router";
import { useSwipeable } from "react-swipeable";
import tmdb from "../../assets/tmdb.svg";
const HeroSection = ({ MovieData }) => {
  const [isMovie, setIsMovie] = useState(0);
  const [moviesWithDetails, setMoviesWithDetails] = useState([]);
  const handlePrev = () => {
    setIsMovie(prev => (prev === 0 ? moviesWithDetails.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsMovie(prev => (prev === moviesWithDetails.length - 1 ? 0 : prev + 1));
  };
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
  useEffect(() => {
    const fetchAllMoviesDetails = async () => {
      try {
        const top5Movies = MovieData.slice(0, 7);
        const promises = top5Movies.map(async item => {
          const res = await homeService.getMovie({ slug: item.slug });

          return {
            ...item,
            content: res.movie.content,
          };
        });
        const enrichedMovies = await Promise.all(promises);
        setMoviesWithDetails(enrichedMovies);
      } catch (error) {
        console.error("Lỗi khi fetch chi tiết phim:", error);
      }
    };

    fetchAllMoviesDetails();
  }, [MovieData]);

  if (!moviesWithDetails || moviesWithDetails.length === 0) {
    return <SekeletonLoadingLogo />;
  }
  return (
    <div {...handlers} className="relative w-full h-[95vh] md:h-[90vh] md:mt-16 overflow-hidden">
      <div
        key={isMovie}
        className={`w-full h-full absolute top-0 left-0 right-0 bg-cover bg-center mask-b-from-20% mask-x-from-45%  animate-fade-left animate-duration-300 animate-ease-in`}
        style={{ backgroundImage: `url(https://phimapi.com/image.php?url=${moviesWithDetails[isMovie]?.thumb_url})` }}
      ></div>

      <div className=" px-4 md:px-8 w-full h-full grid grid-cols-4 grid-rows-4 md:grid-cols-5 md:grid-rows-5 items-center gap-3 absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 p-4">
        <div
          key={"name" + isMovie}
          className="animate-fade-right animate-duration-300 animate-ease-in col-span-3 row-start-3 md:row-start-2 md:row-span-2 "
        >
          <Link
            to={`/phim/${moviesWithDetails[isMovie].slug}`}
            className="text-3xl md:text-4xl font-bold py-2 hover:text-amber-500! text-amber-50 "
          >
            {moviesWithDetails[isMovie].name}
          </Link>
          <p className="text-2xl font-light text-amber-500 mb-2">{moviesWithDetails[isMovie].origin_name}</p>
          <div className="flex flex-wrap items-center gap-2 mb-2 text-sm">
            <div className="flex items-center h-7 w-fit bg-gray-800 text-cyan-500 px-3 py-1 font-medium rounded-md">
              <img src={tmdb} alt="tmdb" className="mr-2 h-4 w-auto" />
              <span className="leading-none font-bold">{moviesWithDetails[isMovie].tmdb.vote_average.toFixed(1)}</span>
            </div>
            <span className="flex items-center h-7 w-fit bg-gray-800 text-amber-500 font-bold px-3 py-1 rounded-md">
              {moviesWithDetails[isMovie].quality}
            </span>
            <span className="flex items-center h-7 w-fit bg-gray-800 border border-gray-700 px-3 py-1 rounded-md text-amber-50">
              {moviesWithDetails[isMovie].lang}
            </span>
            <span className="flex items-center h-7 w-fit bg-gray-800 border border-gray-700 px-3 py-1 rounded-md text-amber-50">
              {moviesWithDetails[isMovie].episode_current}
            </span>
          </div>
          {moviesWithDetails[isMovie].category.map(item => {
            return (
              <Tag key={item.slug} color={"#ffffff"} variant="outlined" className="m-1! w-fit! bg-[#39405e90]!">
                <a href={`/the-loai/${item.slug}`} className="text-amber-50! font-light!">
                  {item.name}
                </a>
              </Tag>
            );
          })}
        </div>
        <div
          key={"content" + isMovie}
          className="animate-fade-right animate-duration-300 animate-ease-in hidden md:block md:col-span-2 col-span-4 col-start-1 row-start-3 md:row-start-4"
        >
          <Typography.Paragraph
            ellipsis={{
              rows: 4,
              expanded: false,
            }}
            strong
            className="text-amber-50!"
          >
            {moviesWithDetails[isMovie].content}
          </Typography.Paragraph>
        </div>
        <div
          key={"playbtn" + isMovie}
          className="animate-fade-right animate-duration-300 animate-ease-in col-start-4 md:col-start-1 row-start-3 md:row-start-5 md:p-3 md:flex md:items-center"
        >
          <a href={`/phim/${moviesWithDetails[isMovie].slug}`}>
            <IoPlayCircle className="text-amber-600 mask-b-from-50% mask-radial-[50%_90%] mask-radial-from-80% text-8xl hover:scale-110 hover:text-amber-500" />
          </a>
          <a href={`/phim/${moviesWithDetails[isMovie].slug}`}>
            <IoInformationCircleSharp className="hidden md:block ml-4 text-amber-50 text-3xl hover:scale-110 hover:text-amber-500" />
          </a>
        </div>
        <div className="col-span-4 row-start-4  col-start-1 md:col-span-2 md:col-start-4 md:row-start-4 flex gap-1 items-center ">
          {moviesWithDetails.map((item, index) => {
            return (
              <div key={index} className="w-full h-fit">
                <img
                  onClick={() => setIsMovie(index)}
                  className={`${isMovie === index ? "border-cyan-50 scale-110 transition duration-300 ease-in-out" : "border-cyan-950"} object-contain rounded-[10px] border-2`}
                  src={`https://phimapi.com/image.php?url=${item.thumb_url}`}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
