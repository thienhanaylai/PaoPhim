import axiosClient from "../api/axiosConfig";

const movieService = {
  getNewMovies: async () => {
    try {
      const url = "/danh-sach/phim-moi-cap-nhat-v3?page=1";
      let res = await axiosClient.get(url);
      if (res) {
        res.items = res.items.filter(item => !item.country[0].slug.includes("viet-nam"));
      }
      return res;
    } catch (error) {
      console.error("Lỗi:", error);
      return [];
    }
  },
  getMovie: ({ slug }) => {
    const url = `/phim/${slug}`;
    return axiosClient.get(url);
  },
  getNewMovieBo: () => {
    const url = `/v1/api/danh-sach/phim-bo?page=1&sort_field=year&sort_type=desc&limit=7`;
    return axiosClient.get(url);
  },
  getNewMovieLe: () => {
    const url = `/v1/api/danh-sach/phim-le?page=1&sort_field=year&sort_type=desc&limit=7`;
    return axiosClient.get(url);
  },
  getMoviebyFillter: ({
    type_list = "",
    page = "",
    sort_field = "",
    sort_type = "",
    sort_lang = "",
    category = "",
    country = "",
    year = "",
    limit = "28",
  }) => {
    const url = `/v1/api/danh-sach/${type_list}?page=${page}&sort_field=${sort_field}&sort_type=${sort_type}&sort_lang=${sort_lang}&category=${category}&country=${country}&year=${year}&limit=${limit}`;
    return axiosClient.get(url);
  },
  getCategory: async () => {
    const url = `/the-loai`;
    try {
      let res = await axiosClient.get(url);
      if (res && Array.isArray(res)) {
        res = res.filter(item => !item.slug.includes("phim-18"));
      }
      return res;
    } catch (error) {
      console.error("Lỗi:", error);
      return [];
    }
  },
  getMovieBySearch: ({
    keyword,
    page = "",
    sort_field = "",
    sort_type = "",
    sort_lang = "",
    category = "",
    country = "",
    year = "",
    limit = 10,
  }) => {
    const url = `/v1/api/tim-kiem?keyword=${keyword}&page=${page}&sort_field=${sort_field}&sort_type=${sort_type}&sort_lang=${sort_lang}&category=${category}&country=${country}&year=${year}&limit=${limit}`;
    return axiosClient.get(url);
  },
  getMovieByCategory: ({
    type_list = "",
    page = "",
    sort_field = "",
    sort_type = "",
    sort_lang = "",
    country = "",
    year = "",
    limit = "28",
  }) => {
    const url = `/v1/api/the-loai/${type_list}?page=${page}&sort_field=${sort_field}&sort_type=${sort_type}&sort_lang=${sort_lang}&country=${country}&year=${year}&limit=${limit}`;
    return axiosClient.get(url);
  },
  getMovieByCountry: ({
    type_list = "",
    page = "",
    sort_field = "",
    sort_type = "",
    sort_lang = "",
    category = "",
    year = "",
    limit = "28",
  }) => {
    const url = `/v1/api/quoc-gia/${type_list}?page=${page}&sort_field=${sort_field}&sort_type=${sort_type}&sort_lang=${sort_lang}&category=${category}&year=${year}&limit=${limit}`;
    return axiosClient.get(url);
  },
  getCountry: async () => {
    const url = `/quoc-gia`;
    try {
      let res = await axiosClient.get(url);
      if (res && Array.isArray(res)) {
        res = res.filter(item => !item.slug.includes("viet-nam"));
      }
      return res;
    } catch (error) {
      console.error("Lỗi khi lấy quốc gia:", error);
      return [];
    }
  },
  getMovieTop5: async () => {
    const hq = `/v1/api/quoc-gia/han-quoc?limit=2`;
    const tq = `/v1/api/quoc-gia/trung-quoc?limit=2`;
    const uk = `/v1/api/quoc-gia/au-my?limit=1`;
    try {
      let res = await Promise.all([axiosClient.get(hq), axiosClient.get(tq), axiosClient.get(uk)]);
      let mergedArray = res.flatMap(item => item.data?.items || []);
      const domainImage = "https://phimimg.com/";
      let finalArray = mergedArray.map(movie => {
        return {
          ...movie,
          thumb_url: `${domainImage}${movie.thumb_url}`,
          poster_url: `${domainImage}${movie.poster_url}`,
        };
      });
      return finalArray;
    } catch (error) {
      console.error("Lỗi khi lấy quốc gia:", error);
      return [];
    }
  },
};

export default movieService;
