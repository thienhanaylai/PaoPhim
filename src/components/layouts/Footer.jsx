import React from "react";
import { Link } from "react-router";
import logo from "../../assets/logoPaoNgang.png";

const Footer = () => {
  return (
    <footer className="bg-[#0b0b10] text-gray-400 border-t border-gray-800 mt-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="PaoPhim Logo" className="h-25 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed pr-0 md:pr-10">
              PaoPhim - Nền tảng xem phim trực tuyến miễn phí chất lượng cao. Cập nhật liên tục các bộ phim mới nhất, đa dạng thể
              loại từ phim bộ, phim lẻ đến phim chiếu rạp. Trải nghiệm giải trí tuyệt vời với phụ đề Vietsub và lồng tiếng chuẩn.
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Danh Mục</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-[#f39c12] transition-colors duration-300">
                  Phim Mới
                </Link>
              </li>
              <li>
                <Link to="/phim-bo" className="hover:text-[#f39c12] transition-colors duration-300">
                  Phim Bộ
                </Link>
              </li>
              <li>
                <Link to="/phim-le" className="hover:text-[#f39c12] transition-colors duration-300">
                  Phim Lẻ
                </Link>
              </li>
              {/* <li>
                <Link to="/the-loai" className="hover:text-[#f39c12] transition-colors duration-300">
                  Thể Loại
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Hỗ Trợ</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dieu-khoan" className="hover:text-[#f39c12] transition-colors duration-300">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link to="/bao-mat" className="hover:text-[#f39c12] transition-colors duration-300">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link to="/ban-quyen" className="hover:text-[#f39c12] transition-colors duration-300">
                  Khiếu nại bản quyền
                </Link>
              </li>
              <li>
                <Link to="/lien-he" className="hover:text-[#f39c12] transition-colors duration-300">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} PaoPhim. All rights reserved. API phim được cung cấp bởi KKPHIM.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
