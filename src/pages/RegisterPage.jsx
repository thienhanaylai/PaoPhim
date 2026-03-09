import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Form, Input, Button, ConfigProvider, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import authService from "../services/authService";
import logoPao from "../assets/logoPaoNgang.png";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async values => {
    setLoading(true);
    try {
      const res = await authService.register({
        username: values.username,
        email: values.email,
        password: values.password,
      });
      login(res.user, res.token);
      message.success("Đăng ký thành công! Chào mừng bạn đến với PaoPhim.");
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại!";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center p-4 relative overflow-hidden">
      <Helmet>
        <title>Đăng ký tài khoản - PaoPhim</title>
      </Helmet>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-amber-500 rounded-full blur-[180px] opacity-5 pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="flex justify-center mb-3">
          <Link to="/">
            <img src={logoPao} alt="PaoPhim" className="h-24 w-auto object-contain" />
          </Link>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
          <p className="text-3xl font-bold text-white text-center mb-2">Tạo tài khoản</p>
          <p className="text-gray-400 text-center text-sm mb-3">Đăng ký để lưu danh sách phim yêu thích của bạn.</p>

          <ConfigProvider
            theme={{
              components: {
                Input: {
                  colorBgContainer: "rgba(255,255,255,0.06)",
                  colorBorder: "rgba(255,255,255,0.15)",
                  activeBorderColor: "#f59e0b",
                  hoverBorderColor: "#f59e0b",
                  colorText: "#ffffff",
                  colorTextPlaceholder: "#6b7280",
                  colorIcon: "#6b7280",
                  paddingBlock: 6,
                  borderRadius: 10,
                },
                Button: {
                  primaryColor: "#ffffff",
                  colorPrimary: "#f59e0b",
                  colorPrimaryHover: "#d97706",
                  colorPrimaryActive: "#b45309",
                  borderRadius: 10,
                  fontWeight: 600,
                  controlHeight: 44,
                },
                Form: {
                  labelColor: "#d1d5db",
                  colorError: "#f87171",
                  itemMarginBottom: 20,
                },
              },
            }}
          >
            <Form layout="vertical" onFinish={onFinish} size="middle" requiredMark={false}>
              <Form.Item
                label={<span className="text-gray-300 font-medium">Tên đăng nhập</span>}
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                  { min: 3, message: "Tên đăng nhập tối thiểu 3 ký tự!" },
                  { max: 30, message: "Tên đăng nhập tối đa 30 ký tự!" },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: "Chỉ chứa chữ cái, số và dấu gạch dưới!",
                  },
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
                <Input prefix={<MailOutlined className="text-gray-500 mr-1" />} placeholder="example@email.com" />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-300 font-medium">Mật khẩu</span>}
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                  { min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" },
                ]}
              >
                <Input.Password prefix={<LockOutlined className="text-gray-500 mr-1" />} placeholder="Tối thiểu 6 ký tự" />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-300 font-medium">Xác nhận mật khẩu</span>}
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined className="text-gray-500 mr-1" />} placeholder="Nhập lại mật khẩu" />
              </Form.Item>

              <Form.Item className="mb-0 mt-2">
                <Button type="primary" htmlType="submit" block loading={loading}>
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </ConfigProvider>

          <p className="text-center text-gray-500 text-sm mt-6">
            Đã có tài khoản?{" "}
            <Link to="/dang-nhap" className="text-amber-400 font-medium hover:text-amber-300 transition-colors">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
