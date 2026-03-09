import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Form, Input, Button, ConfigProvider, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import authService from "../services/authService";
import logoPao from "../assets/logoPaoNgang.png";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const onFinish = async values => {
    setLoading(true);
    try {
      const res = await authService.login(values);
      login(res.user, res.token);
      message.success("Đăng nhập thành công!");
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.message || "Sai email hoặc mật khẩu!";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center p-4 relative overflow-hidden">
      <Helmet>
        <title>Đăng nhập - PaoPhim</title>
      </Helmet>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-amber-500 rounded-full blur-[180px] opacity-5 pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="flex justify-center mb-3">
          <Link to="/">
            <img src={logoPao} alt="PaoPhim" className="h-24 w-auto object-contain" />
          </Link>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
          <p className="text-3xl font-bold text-white text-center mb-2">Đăng nhập</p>
          <p className="text-gray-400 text-center text-sm mb-8">Chào mừng trở lại! Hãy đăng nhập để tiếp tục.</p>

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
                  paddingBlock: 10,
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
                },
              },
            }}
          >
            <Form layout="vertical" onFinish={onFinish} size="large" requiredMark={false}>
              <Form.Item
                label={<span className="text-gray-300 font-medium">Email</span>}
                name="login"
                rules={[{ required: true, message: "Vui lòng nhập username hoặc email!" }]}
              >
                <Input prefix={<MailOutlined className="text-gray-500 mr-1" />} placeholder="Username hoặc email" />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-300 font-medium">Mật khẩu</span>}
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password prefix={<LockOutlined className="text-gray-500 mr-1" />} placeholder="Nhập mật khẩu" />
              </Form.Item>

              {/* <div className="flex justify-end mb-4 -mt-2">
                <a className="text-amber-400 text-sm hover:text-amber-300 transition-colors">Quên mật khẩu?</a>
              </div> */}

              <Form.Item className="mb-0">
                <Button type="primary" htmlType="submit" block loading={loading}>
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </ConfigProvider>

          <p className="text-center text-gray-500 text-sm mt-6">
            Chưa có tài khoản?{" "}
            <Link to="/dang-ky" className="text-amber-400 font-medium hover:text-amber-300 transition-colors">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
