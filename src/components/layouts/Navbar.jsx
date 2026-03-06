import logoPao from "../../assets/logoPaoNgang.png";
import { Input, Dropdown, Space, ConfigProvider } from "antd";
import { CloseOutlined, MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
const { Search } = Input;
import { NavLink, useNavigate } from "react-router";
import CategoryMenu from "./CategoryMenu";
import movieService from "../../services/movieService";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isCategory, setIsCategory] = useState([]);
  const [isCountry, setIsCountry] = useState([]);
  const [isListMovie, setIsListMovie] = useState([]);
  const [isKeyword, setIsKeyWord] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await movieService.getCategory();
        const res1 = await movieService.getCountry();
        setIsCategory(res);
        setIsCountry(res1);
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
        <Dropdown popupRender={() => <CategoryMenu CategoryList={isCategory} type={"the-loai"} />}>
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
      link: "dropdown1",
    },
    {
      label: (
        <Dropdown popupRender={() => <CategoryMenu CategoryList={isCountry} type={"quoc-gia"} />}>
          <span
            onClick={e => {
              e.preventDefault();
              navigate("/");
            }}
            className="cursor-pointer"
          >
            <Space>Quốc gia ▾</Space>
          </span>
        </Dropdown>
      ),
      link: "dropdown2",
    },
    { label: "Phim bộ", link: "/phim-bo" },
    { label: "Phim Lẻ", link: "/phim-le" },
    // { label: "Đăng nhập", link: "/dang-nhap" },
  ];
  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 10) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", updateScrollDirection);

    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, []);
  return (
    <>
      <div
        className={`${isScroll ? "bg-linear-to-t from-blue-950/15  to-[#0d071f] backdrop-blur-md fixed " : "absolute bg-transparent "}transition duration-300 ease-in-out navbar animate-fade-down animate-once animate-duration-[500ms] animate-delay-200 animate-ease-in w-full h-[70px]  left-0 top-0 pl-4 pr-4 flex items-center justify-between md:justify-around lg:justify-around z-50`}
      >
        <div className="w-fit h-full flex items-center">
          <a onClick={() => setIsOpen(!isOpen)} className="text-white md:hidden block m-4">
            <MenuOutlined />
          </a>
          <div
            className={`${isOpen ? "block" : "hidden"} block md:hidden w-fit h-auto p-2 ml-1 rounded-lg flex flex-col bg-[#0d071f] fixed left-0 top-[70px]`}
          >
            {menuItems?.map(item => {
              return (
                <div className="my-2" key={item.link}>
                  {item.link.includes("dropdown") ? (
                    <div className="px-[25px] text-amber-50 font-medium hover:text-[#535bf2]!">{item.label}</div>
                  ) : (
                    <NavLink className="p-[25px] text-amber-50 font-medium" to={item.link}>
                      {item.label}
                    </NavLink>
                  )}
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
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    colorBgContainer: "transparent",
                    activeBg: "#ffffff6c",
                    hoverBg: "#ffffff6c",
                    colorBorder: "#ffffff",
                    activeBorderColor: "#fff",
                    hoverBorderColor: "#fff",
                    colorText: "#ffffff",
                    colorTextPlaceholder: "#fffbeb",
                  },
                  Button: {
                    defaultHoverBorderColor: "#fff",
                    defaultBg: "transparent",
                    defaultColor: "#fff",
                    defaultHoverColor: "#000",
                  },
                },
              }}
            >
              <Search
                className=" placeholder:text-amber-50!   w-328 md:w-40! lg:w-96!"
                size="large"
                placeholder="Tìm kiếm"
                value={isKeyword}
                onChange={e => {
                  setIsKeyWord(e.target.value);
                }}
                onSearch={value => {
                  navigate(`tim-kiem/${value}`);
                  setIsKeyWord("");
                }}
                allowClear
              />
            </ConfigProvider>
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
        <div className={`hidden md:flex flex-wrap`}>
          {menuItems?.map(item => {
            return (
              <div key={item.link}>
                {item.link.includes("dropdown") ? (
                  <span className="px-[15px]  text-amber-50 font-medium hover:text-[#535bf2]!">{item.label}</span>
                ) : (
                  <NavLink className="px-[15px] text-amber-50 font-medium" to={item.link}>
                    {item.label}
                  </NavLink>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
