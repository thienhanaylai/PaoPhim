import React from "react";

const ScrollToElement = ({ targetId, children, className = "" }) => {
  const handleScroll = () => {
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      console.warn(`Không tìm thấy phần tử nào có id là: "${targetId}"`);
    }
  };

  return (
    <button
      onClick={handleScroll}
      className={`bg-blue-600 text-white px-4 py-2 rounded-none hover:bg-blue-700 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default ScrollToElement;
