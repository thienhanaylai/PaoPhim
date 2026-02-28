import logoPao from "../../assets/logoPaoNgang.png";
import { Input, Button, Col, Row, Dropdown, Space } from "antd";
import { CloseOutlined, DownOutlined, MenuOutlined, SearchOutlined, SmileOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
const { Search } = Input;
import { NavLink, useNavigate } from "react-router";
import CategoryMenu from "./CategoryMenu";
import movieService from "../../services/movieService";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isCategory, setIsCategory] = useState([]);
  const [isListMovie, setIsListMovie] = useState([]);
  const [isKeyword, setIsKeyWord] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await movieService.getCategory();
        setIsCategory(res);
      } catch (err) {
        console.error("Lỗi:", err);
      }
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await movieService.getMovieBySearch({ keyword: isKeyword });
        setIsListMovie(res.data?.items);
      } catch (err) {
        console.error("Lỗi:", err);
      }
    };
    fetchApi();
  }, [isKeyword]);

  const menuItems = [
    { label: "Phim mới", link: "" },
    {
      label: (
        <Dropdown popupRender={() => <CategoryMenu CategoryList={isCategory} />}>
          <span
            onClick={e => {
              e.preventDefault();
              navigate("/");
            }}
            className="cursor-pointer"
          >
            <Space>Thể Loại ▾</Space>
          </span>
        </Dropdown>
      ),
      link: "/phim-le$",
    },
    { label: "Phim bộ", link: "/phim-bo" },
    { label: "Phim Lẻ", link: "/phim-le" },
    { label: "Đăng nhập", link: "/dang-nhap" },
  ];

  return (
    <>
      <div className="navbar animate-fade-down animate-once animate-duration-[500ms] animate-delay-200 animate-ease-in w-full h-[70px] bg-[#0d071f] left-0 top-0 fixed pl-4 pr-4 flex items-center justify-between md:justify-around lg:justify-around z-50">
        <div className="w-fit h-full flex items-center">
          <a onClick={() => setIsOpen(!isOpen)} className="text-white md:hidden block m-4">
            <MenuOutlined />
          </a>
          <div
            className={`${isOpen ? "block" : "hidden"} block md:hidden w-fit h-auto p-2 m-2 rounded-lg flex flex-col bg-[#0d071f] fixed left-0 top-[70px]`}
          >
            {menuItems.map(item => {
              return (
                <div key={item.label}>
                  <NavLink className="p-[15px] text-amber-50 font-medium" to={item.link}>
                    {item.label}
                  </NavLink>
                </div>
              );
            })}
          </div>

          <a href="/" className={`${isSearch ? "hidden" : "block"} w-fit h-full`}>
            <img src={logoPao} className="w-auto h-full object-contain" alt="" />
          </a>
        </div>
        <div className="flex items-center">
          <a onClick={() => setIsSearch(!isSearch)} className={`text-white md:hidden block m-2`}>
            {isSearch ? <CloseOutlined /> : <SearchOutlined />}
          </a>

          <div className={`${isSearch ? "block" : "hidden"} relative md:block`}>
            <Search
              className=" border-none! placeholder:text-amber-50!  w-328 md:w-40! lg:w-96!"
              size="large"
              placeholder="Tìm kiếm"
              onChange={e => {
                setIsKeyWord(e.target.value);
              }}
              allowClear
            />
            {isKeyword && isListMovie && isListMovie.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-1 bg-[#10112c] rounded-md shadow-lg z-50 max-h-[400px] overflow-y-auto">
                <div className="flex flex-col py-2">
                  {isListMovie.map(movie => (
                    <div
                      key={movie._id || movie.slug}
                      onClick={() => {
                        navigate(`/phim/${movie.slug}`);
                        setIsKeyWord("");
                        setIsListMovie([]);
                      }}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <img
                        src={`https://phimapi.com/image.php?url=https://phimimg.com/${movie.poster_url} `}
                        alt={movie.name}
                        className="w-12 h-16 object-cover rounded-sm"
                      />
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-semibold text-amber-50 truncate">{movie.name}</span>
                        <span className="text-xs text-gray-500 truncate">{movie.origin_name || movie.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={`hidden md:block `}>
          {menuItems.map(item => {
            return (
              <NavLink key={item.link} className="p-[15px] text-amber-50 font-medium" to={item.link}>
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
