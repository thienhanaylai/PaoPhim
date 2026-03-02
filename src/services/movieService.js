import axiosClient from "../api/axiosConfig";

const movieService = {
  getNewMovies: () => {
    const url = "/danh-sach/phim-moi-cap-nhat-v3?page=1";
    return axiosClient.get(url);
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
  getCategory: () => {
    const url = `/the-loai`;
    return axiosClient.get(url);
  },
  getMovieBySearch: ({ keyword, limit = 10 }) => {
    const url = `/v1/api/tim-kiem?keyword=${keyword}&limit=${limit}`;
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
  getCountry: () => {
    const url = `/quoc-gia`;
    return axiosClient.get(url);
  },
};

export default movieService;
