import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Avatar, ConfigProvider, Form, Input, Button, message, Tabs } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  LogoutOutlined,
  HeartOutlined,
  EditOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import authService from "../services/authService";
import { useFavorites } from "../context/MovieContext";
import homeService from "../services/movieService";
const ProfilePage = ({ defaultTab }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  // const [editLoading, setEditLoading] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [editForm] = Form.useForm();
  const [pwForm] = Form.useForm();
  const { favoriteMovies, toggleFavorite } = useFavorites();

  if (!isAuthenticated) {
    navigate("/dang-nhap", { state: { from: "/trang-ca-nhan" } });
    return null;
  }

  const handleFavorite = async ({ slug }) => {
    try {
      const data = await homeService.getMovie({ slug });
      const movie = {
        slug: data.movie.slug,
        name: data.movie.name,
        thumb_url: data.movie.thumb_url,
        poster_url: data.movie.poster_url,
      };

      await toggleFavorite(movie);
    } catch (error) {
      console.error("Lỗi khi thêm phim yêu thích:", error);
    }
  };

  const initial = user?.username?.[0]?.toUpperCase() || "U";

  // const handleUpdateProfile = async values => {
  //   setEditLoading(true);
  //   try {
  //     const res = await authService.updateProfile(values);
  //     login(res.user, localStorage.getItem("token"));
  //     message.success("Cập nhật thông tin thành công!");
  //   } catch (err) {
  //     message.error(err?.response?.data?.message || "Cập nhật thất bại!");
  //   } finally {
  //     setEditLoading(false);
  //   }
  // };

  const handleChangePassword = async values => {
    setPwLoading(true);
    try {
      await authService.changePassword({ oldPassword: values.oldPassword, newPassword: values.newPassword });
      message.success("Đổi mật khẩu thành công!");
      pwForm.resetFields();
    } catch (err) {
      message.error(err?.response?.data?.message || "Đổi mật khẩu thất bại!");
    } finally {
      setPwLoading(false);
    }
  };

  const inputTheme = {
    colorBgContainer: "rgba(255,255,255,0.06)",
    colorBorder: "rgba(255,255,255,0.15)",
    activeBorderColor: "#f59e0b",
    hoverBorderColor: "#f59e0b",
    colorText: "#ffffff",
    colorTextPlaceholder: "#6b7280",
    colorIcon: "#6b7280",
    paddingBlock: 8,
    borderRadius: 10,
  };

  const buttonTheme = {
    primaryColor: "#ffffff",
    colorPrimary: "#f59e0b",
    colorPrimaryHover: "#d97706",
    colorPrimaryActive: "#b45309",
    borderRadius: 10,
    fontWeight: 600,
    controlHeight: 42,
  };

  const tabItems = [
    {
      key: "info",
      label: (
        <span className="flex items-center gap-2">
          <EditOutlined />
          Thông tin
        </span>
      ),
      children: (
        <ConfigProvider
          theme={{
            components: {
              Input: inputTheme,
              Button: buttonTheme,
              Form: { labelColor: "#d1d5db", colorError: "#f87171", itemMarginBottom: 18 },
            },
          }}
        >
          <Form
            form={editForm}
            layout="vertical"
            // onFinish={handleUpdateProfile}
            requiredMark={false}
            initialValues={{ username: user?.username, email: user?.email }}
          >
            <Form.Item
              label={<span className="text-gray-300 font-medium">Tên đăng nhập</span>}
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                { min: 3, message: "Tối thiểu 3 ký tự!" },
                { pattern: /^[a-zA-Z0-9_]+$/, message: "Chỉ chứa chữ cái, số và dấu gạch dưới!" },
              ]}
            >
              <Input prefix={<UserOutlined className="text-gray-500 mr-1" />} placeholder="Tên đăng nhập" />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-300 font-medium">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input prefix={<MailOutlined className="text-gray-500 mr-1" />} placeholder="Email" />
            </Form.Item>
            {/* 
            <Form.Item className="mb-0 mt-2">
              <Button type="primary" htmlType="submit" loading={editLoading}>
                Lưu thay đổi
              </Button>
            </Form.Item> */}
          </Form>
        </ConfigProvider>
      ),
    },
    {
      key: "password",
      label: (
        <span className="flex items-center gap-2">
          <LockOutlined />
          Đổi mật khẩu
        </span>
      ),
      children: (
        <ConfigProvider
          theme={{
            components: {
              Input: inputTheme,
              Button: buttonTheme,
              Form: { labelColor: "#d1d5db", colorError: "#f87171", itemMarginBottom: 18 },
            },
          }}
        >
          <Form form={pwForm} layout="vertical" onFinish={handleChangePassword} requiredMark={false}>
            <Form.Item
              label={<span className="text-gray-300 font-medium">Mật khẩu hiện tại</span>}
              name="oldPassword"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại!" }]}
            >
              <Input.Password prefix={<LockOutlined className="text-gray-500 mr-1" />} placeholder="Mật khẩu hiện tại" />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-300 font-medium">Mật khẩu mới</span>}
              name="newPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                { min: 6, message: "Tối thiểu 6 ký tự!" },
              ]}
            >
              <Input.Password prefix={<LockOutlined className="text-gray-500 mr-1" />} placeholder="Tối thiểu 6 ký tự" />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-300 font-medium">Xác nhận mật khẩu mới</span>}
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) return Promise.resolve();
                    return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined className="text-gray-500 mr-1" />} placeholder="Nhập lại mật khẩu mới" />
            </Form.Item>

            <Form.Item className="mb-0 mt-2">
              <Button type="primary" htmlType="submit" loading={pwLoading}>
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      ),
    },
    {
      key: "favorite",
      label: (
        <span className="flex items-center gap-2">
          <HeartOutlined />
          Phim yêu thích
        </span>
      ),
      children: (
        <div className="flex flex-col items-center justify-center py-2 gap-2">
          {favoriteMovies.length ? (
            <div className="p-5 grid grid-cols-3  md:grid-cols-5 gap-2  from-white to-zinc-900 to-75% z-10">
              {favoriteMovies?.map(item => {
                return (
                  <div
                    key={item.slug}
                    className={`w-full h-full relative place-items-center hover:scale-105 transition duration-300 ease-in-out`}
                  >
                    <button
                      className="absolute top-0 left-1 z-20 p-1 text-white text-2xl"
                      onClick={e => {
                        e.preventDefault();
                        handleFavorite({ slug: item.slug });
                      }}
                    >
                      <CloseOutlined className=" text-amber-50! text-[18px] md:text-2xl hover:scale-110 hover:text-amber-50" />
                    </button>
                    <a
                      className="block relative text-center text-amber-50 text-[12px] md:text-[16px] md:font-medium "
                      href={`/phim/${item.slug}`}
                    >
                      <img
                        className="object-cover w-full h-full rounded-md"
                        src={`https://phimapi.com/image.php?url=${item.poster_url}`}
                        alt=""
                        loading="lazy"
                      />
                      {item.name}
                    </a>
                  </div>
                );
              })}
              <div
                className={`w-full h-full block relative md:hidden place-items-center place-content-center hover:scale-105 transition duration-300 ease-in-out`}
              ></div>
            </div>
          ) : (
            <>
              <p className="text-gray-500 text-sm">Chưa có phim yêu thích nào.</p>
              <button
                onClick={() => navigate("/")}
                className="px-5 py-2 rounded-full bg-amber-900 hover:bg-amber-500/30 text-amber-400 text-sm font-medium transition-all cursor-pointer"
              >
                Khám phá phim
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0c10] pt-22.5 pb-16 px-4 relative">
      <Helmet>
        <title>Trang cá nhân - PaoPhim</title>
      </Helmet>
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-amber-500 rounded-full blur-[200px] opacity-5 pointer-events-none" />

      <div className="max-w-3xl mx-auto z-10 relative">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <Avatar
              size={96}
              className="bg-linear-to-br from-amber-400 to-orange-500 text-white text-3xl font-bold shadow-lg"
              icon={!initial ? <UserOutlined /> : undefined}
            >
              {initial}
            </Avatar>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-white mb-1">{user?.username}</h1>
            <p className="text-gray-400 text-sm mb-4">{user?.email}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-medium">
                Thành viên
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 hover:border-red-500/40 hover:bg-red-500/10 text-gray-400 hover:text-red-400 text-sm transition-all cursor-pointer"
          >
            <LogoutOutlined />
            Đăng xuất
          </button>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
          <ConfigProvider
            theme={{
              components: {
                Tabs: {
                  colorBorderSecondary: "rgba(255,255,255,0.08)",
                  itemColor: "#9ca3af",
                  itemHoverColor: "#f59e0b",
                  itemSelectedColor: "#f59e0b",
                  inkBarColor: "#f59e0b",
                  colorBgContainer: "transparent",
                },
              },
            }}
          >
            <Tabs items={tabItems} defaultActiveKey={defaultTab} />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
