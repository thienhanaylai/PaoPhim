import logoPao from "../../assets/logoPaophim.png";

const SekeletonLoadingLogo = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen animate-pulse ">
        <img className="object-contain w-[40vh] opacity-90 " src={logoPao} alt="Logo" />
        <p className="text-[18px] md:text-2xl mt-[-45px] text-amber-50 font-medium tracking-wider text-center ">
          Phim gì cũng có. Cập nhật liên tục!
        </p>
      </div>
    </>
  );
};
export default SekeletonLoadingLogo;
