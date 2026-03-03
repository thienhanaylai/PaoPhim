import React from "react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0c10] flex flex-col items-center justify-center text-white p-4 font-sans">
      <div className="text-center max-w-2xl">
        <h1 className="text-[150px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#f59e0b] to-[#ea580c] drop-shadow-xl mb-4">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide text-gray-100">Lạc đường rồi!</h2>

        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          Nội dung bạn đang tìm kiếm không tồn tại, đã bị xóa hoặc đường dẫn không chính xác. Hãy quay lại để tiếp tục thưởng thức
          các bộ phim hấp dẫn nhé.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-white font-bold py-3 px-8 rounded-md transition-all duration-300 shadow-[0_4px_14px_0_rgba(245,158,11,0.39)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.23)] hover:-translate-y-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          VỀ TRANG CHỦ
        </a>
      </div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f59e0b] rounded-full blur-[150px] opacity-5 pointer-events-none"></div>
    </div>
  );
};

export default NotFoundPage;
