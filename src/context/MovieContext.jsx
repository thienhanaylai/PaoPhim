import React, { createContext, useState, useEffect, useMemo, useContext } from "react";
import userService from "../services/userService";
import { useAuth } from "./AuthContext";
import { notification } from "antd";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  const showNotice = (type, message) => {
    notification[type]({
      message: message,
      description: (
        <span>
          <a href="/dang-nhap" style={{ marginLeft: "10px", color: "#1890ff" }}>
            Đăng nhập{" "}
          </a>
          vào để lưu phim yêu thích !
        </span>
      ),
      placement: "top",
    });
  };
  const fetchFavorites = async () => {
    try {
      const res = await userService.getFavoriteMovie({ userId: user?.id });
      setFavoriteMovies(res?.favoriteMovie || []);
    } catch (error) {
      console.error("Lỗi tải phim yêu thích:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchFavorites();
  }, []);

  const favoriteIds = useMemo(() => {
    if (favoriteMovies && Array.isArray(favoriteMovies)) return new Set(favoriteMovies?.map(movie => movie.slug));
  }, [favoriteMovies]);

  const toggleFavorite = async movie => {
    try {
      if (!isAuthenticated) {
        showNotice("warning", "Đăng nhập tài khoản đi má !", "Bạn cần đăng nhập để thêm phim vào danh sách yêu thích!");
        return;
      }
      const isExist = favoriteIds?.has(movie.slug);
      if (isExist) {
        const res = await userService.deleteFavoriteMovie({ userId: user?.id, slug: movie.slug });
        setFavoriteMovies(res);
      } else {
        const res = await userService.addFavoriteMovie({ userId: user?.id, movieData: movie });
        setFavoriteMovies(res.favorites);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật yêu thích:", error);
      fetchFavorites();
    }
  };

  return (
    <FavoriteContext.Provider value={{ favoriteMovies, favoriteIds, toggleFavorite, loading }}>
      {children}
    </FavoriteContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => useContext(FavoriteContext);
