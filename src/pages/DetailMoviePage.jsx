import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";

import { Play, Calendar, Clock, Globe, Film, Info } from "lucide-react";
import movieService from "../services/movieService";
import SekeletonLoadingLogo from "../components/layouts/SekeletonLoadingLogo";
import tmdb from "../assets/tmdb.svg";
const MovieDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const response = await movieService.getMovie({ slug });
        if (response.status) {
          setMovieData(response);
        }
      } catch (error) {
        console.error("Lỗi khi tải chi tiết phim:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [slug]);

  if (loading) {
    return <SekeletonLoadingLogo />;
  }

  if (!movieData || !movieData.movie) {
    return <div className="text-white text-center mt-20">Không tìm thấy phim!</div>;
  }

  const { movie, episodes } = movieData;

  const firstEpisodeSlug = episodes?.[0]?.server_data?.[0]?.slug || "";
  console.log(movie);
  return (
    <div className="min-h-screen bg-[#111114] text-gray-200 pb-20">
      <div className="relative w-full">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
          style={{
            backgroundImage: `url(https://phimapi.com/image.php?url=${movie.thumb_url})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/80 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 mx-auto md:mx-0 w-[240px] md:w-[300px]">
            <img
              src={`https://phimapi.com/image.php?url=${movie.poster_url}`}
              alt={movie.name}
              className="w-full rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] object-cover border border-gray-800"
            />
            <a
              onClick={() => {
                movie.episode_current?.includes("Trailer") ? "Trailer" : navigate(`/xem-phim/${movie.slug}/${firstEpisodeSlug}`);
              }}
              className="cursor-pointer w-full mt-6 flex items-center justify-center gap-2 bg-amber-500 text-white py-3 px-6 rounded-lg font-bold text-lg hover:scale-105 hover:text-amber-800! transition-transform shadow-lg"
            >
              {movie.episode_current?.includes("Trailer") ? (
                "Trailer"
              ) : (
                <>
                  <Play fill="currentColor" size={24} />
                  XEM PHIM
                </>
              )}
            </a>
          </div>

          <div className="flex flex-col flex-1">
            <p className="text-2xl md:text-3xl font-bold text-white mb-2">{movie.name}</p>
            <h2 className="text-xl text-gray-400 mb-4">
              {movie.origin_name} ({movie.year})
            </h2>
            <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
              <div className="flex items-center h-7 w-fit bg-gray-800 text-cyan-500 px-3 py-1 font-medium rounded-md">
                <img src={tmdb} alt="tmdb" className="mr-2 h-4 w-auto" />
                <span className="leading-none font-bold">{movie.tmdb.vote_average.toFixed(1)}</span>
              </div>
              <span className="bg-yellow-500 text-black font-bold px-3 py-1 rounded-md">{movie.quality}</span>
              <span className="bg-gray-800 border border-gray-700 px-3 py-1 rounded-md">{movie.lang}</span>
              <span className="bg-gray-800 border border-gray-700 px-3 py-1 rounded-md text-orange-400">
                {movie.episode_current}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.category.map(cat => (
                <Link
                  key={cat.id}
                  to={`/the-loai/${cat.slug}`}
                  className="px-3 py-1 bg-gray-700 md:bg-white/10 hover:bg-white/20 rounded-full text-sm transition"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <div className="mb-6 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <h3 className="text-white font-semibold flex items-center gap-2 mb-2">
                <Info size={18} className="text-yellow-500" /> Nội Dung Phim
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">{movie.content}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <p>
                <strong className="text-gray-400">Đạo diễn:</strong> {movie.director.join(", ")}
              </p>
              <p>
                <strong className="text-gray-400">Thời lượng:</strong> {movie.time}
              </p>
              <p>
                <strong className="text-gray-400">Quốc gia:</strong> {movie.country.map(c => c.name).join(", ")}
              </p>
              <p>
                <strong className="text-gray-400">Phát hành:</strong> {movie.year}
              </p>
              <p className="sm:col-span-2">
                <strong className="text-gray-400">Diễn viên:</strong> {movie.actor.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-yellow-500 pl-3">Danh Sách Tập Phim</h2>

        {episodes.map((server, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-lg text-yellow-500 mb-3 flex items-center gap-2">
              <Film size={20} /> {server.server_name}
            </h3>
            <div className="flex flex-wrap gap-3">
              {server.server_data.map((ep, idx) => (
                <a
                  key={idx}
                  onClick={() => navigate(`/xem-phim/${movie.slug}/${ep.slug}`)}
                  className="cursor-pointer bg-gray-800 hover:bg-yellow-500 hover:text-amber-500 border border-gray-700 px-5 py-2 rounded-md font-medium transition-colors"
                >
                  {ep.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetailPage;
