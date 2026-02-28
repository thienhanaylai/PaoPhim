import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import ReactPlayer from "react-player";
import { Server, ListVideo } from "lucide-react";
import movieService from "../services/movieService";
import SekeletonLoadingLogo from "../components/layouts/SekeletonLoadingLogo";

const WatchMoviePage = () => {
  const { movieSlug, episodeSlug } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentServerIndex, setCurrentServerIndex] = useState(0);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await movieService.getMovie({ slug: movieSlug });
        setMovieData(response);
      } catch (error) {
        console.error("Lỗi khi tải phim:", error);
      } finally {
        setLoading(false);
      }
    };

    if (movieSlug) fetchMovie();
  }, [movieSlug]);
  if (loading) {
    return <SekeletonLoadingLogo />;
  }

  if (!movieData || !movieData.movie) {
    return <div className="text-white text-center mt-20">Không tìm thấy dữ liệu phim!</div>;
  }

  const { movie, episodes } = movieData;
  const currentServer = episodes[currentServerIndex];

  let currentEpisode = currentServer.server_data.find(ep => ep.slug === episodeSlug);

  if (!currentEpisode && currentServer.server_data.length > 0) {
    currentEpisode = currentServer.server_data[0];
  }
  console.log(currentEpisode);
  return (
    <div className="min-h-screen bg-[#111114] text-gray-200 pb-20 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-6">
        <div className="flex-1">
          <div className="player-wrapper relative w-full min-w-[240px] aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-gray-800">
            {currentEpisode ? (
              <iframe
                src={currentEpisode.link_embed}
                width="100%"
                height="100%"
                allowFullScreen
                title={currentEpisode.name}
                className="w-full h-full absolute top-0 left-0"
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">Lỗi tải tập phim này</div>
            )}
          </div>

          <div className="mt-6">
            <Link
              to={`/phim/${movieSlug}`}
              className="hover:text-amber-500! text-[16px] sm:text-[24px] font-bold text-white mb-2"
            >
              {movie.name} - {currentEpisode?.name}
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              {movie.origin_name} ({movie.year}) • {movie.quality} • {movie.lang}
            </p>

            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 text-sm text-gray-300">
              <span className="font-semibold text-yellow-500">Nội dung: </span>
              {movie.content}
            </div>
          </div>
          <div className="mt-6 shrink-0">
            <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-4 top-24">
              <h3 className="text-white font-semibold flex items-center gap-2 mb-3">
                <Server size={18} className="text-yellow-500" /> Chọn Máy Chủ
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {episodes.map((server, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentServerIndex(index)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      currentServerIndex === index
                        ? "bg-yellow-500 text-amber-500"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {server.server_name.replace("#", "")}
                  </button>
                ))}
              </div>
              <h3 className="text-white font-semibold flex items-center gap-2 mb-3 border-t border-gray-800 pt-4">
                <ListVideo size={18} className="text-yellow-500" /> Danh Sách Tập
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 xl:grid-cols-8 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {currentServer.server_data.map((ep, index) => {
                  const isActive = ep.slug === episodeSlug;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        navigate(`/xem-phim/${movie.slug}/${ep.slug}`);
                      }}
                      className={`col-span-1 py-2 text-center rounded-md text-sm font-medium transition-colors border ${
                        isActive
                          ? "bg-yellow-500 text-amber-500 border-yellow-500"
                          : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                      }`}
                    >
                      {ep.name.replace("Tập ", "")}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchMoviePage;
