import { Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import homeService from "../../services/movieService";
import { IoPlayCircle, IoInformationCircleSharp } from "react-icons/io5";
import SekeletonLoadingLogo from "./SekeletonLoadingLogo";
import { Link } from "react-router";

const HeroSection = ({ MovieData }) => {
  const [isMovie, setIsMovie] = useState(0);
  const [moviesWithDetails, setMoviesWithDetails] = useState([]);

  useEffect(() => {
    const fetchAllMoviesDetails = async () => {
      try {
        const top5Movies = MovieData.slice(0, 5);
        const promises = top5Movies.map(async item => {
          const res = await homeService.getMovie({ slug: item.slug });
          console.log(res);
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
  console.log(moviesWithDetails);
  return (
    <div className="relative w-full h-[95vh] md:h-[90vh] md:mt-16 overflow-hidden">
      <div
        key={isMovie}
        className={`w-full h-full absolute top-0 left-0 right-0 bg-cover bg-center mask-b-from-20% animate-fade-left animate-duration-300 animate-ease-in`}
        style={{ backgroundImage: `url(https://phimapi.com/image.php?url=${moviesWithDetails[isMovie]?.thumb_url})` }}
      ></div>

      <div className=" px-4 md:px-8 w-full h-full grid grid-cols-4 grid-rows-4 md:grid-cols-5 md:grid-rows-5 items-center gap-3 absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 p-4">
        <div
          key={"name" + isMovie}
          className="animate-fade-right animate-duration-300 animate-ease-in col-span-3 row-start-3 md:row-start-3 "
        >
          <Link
            to={`/phim/${moviesWithDetails[isMovie].slug}`}
            className="text-3xl md:text-4xl font-bold py-2 hover:text-amber-500! text-amber-50 "
          >
            {moviesWithDetails[isMovie].name}
          </Link>
          <p className="text-2xl font-light text-amber-500">{moviesWithDetails[isMovie].origin_name}</p>
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
        <div className="col-span-4 row-start-4  col-start-1 md:col-span-2 md:col-start-4 md:row-start-4 flex gap-1 items-center">
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
