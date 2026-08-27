import heroBg from "@assets/hero-bg.jpg";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section
      className="w-full min-h-[716px] bg-cover bg-center bg-no-repeat flex justify-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="relative w-full max-w-[1183px] flex items-center justify-end px-5 lg:px-0">
        <div className="bg-[#FFF3E3] rounded-[10px] pt-[62px] pb-[37px] pr-[43px] pl-[39px] max-w-[643px] w-full mt-[150px] md:mt-0">
          <span className="block font-poppins font-semibold text-[16px] tracking-[3px] text-[#333333] mb-1">
            New Arrival
          </span>

          <h1 className="font-poppins font-bold text-[40px] md:text-[52px] leading-[1.2] md:leading-[65px] text-[#B88E2F] mb-4">
            Discover Our <br /> New Collection
          </h1>

          <p className="font-poppins font-medium text-[16px] md:text-[18px] leading-[24px] text-[#333333] mb-[46px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
          <Link to="/shop">
            <button className="bg-[#B88E2F] text-white font-bold text-[16px] py-[20px] md:py-[25px] px-[50px] md:px-[72px] uppercase transition-colors hover:bg-[#9d7725]">
              BUY NOW
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
