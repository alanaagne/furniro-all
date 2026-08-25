import diningImg from "@assets/dining-range.png";
import livingImg from "@assets/living-range.png";
import bedroomImg from "@assets/bedroom-range.png";
import { Link } from "react-router-dom";

export function BrowseRange() {
  return (
    <section className="w-full bg-white pt-[56px] pb-[56px] flex justify-center">
      <div className="w-full max-w-[1440px] flex flex-col items-center">
        <div className="text-center mb-[62px]">
          <h2 className="font-poppins font-bold text-[32px] text-[#333333] mb-1">
            Browse The Range
          </h2>
          <p className="font-poppins text-[20px] text-[#666666]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-[1183px] px-5 lg:px-0">
          <div className="flex flex-col items-center gap-[30px]">
            <Link to="/shop/dining" className="w-full">
              <img
                src={diningImg}
                alt="Dining Room Setup"
                className="w-full rounded-[10px] object-cover transition-transform hover:scale-105 cursor-pointer"
              />
            </Link>
            <h3 className="font-poppins font-semibold text-[24px] text-[#333333]">
              Dining
            </h3>
          </div>

          <div className="flex flex-col items-center gap-[30px]">
            <Link to="/shop/living" className="w-full">
              <img
                src={livingImg}
                alt="Living Room Setup"
                className="w-full rounded-[10px] object-cover transition-transform hover:scale-105 cursor-pointer"
              />
            </Link>

            <h3 className="font-poppins font-semibold text-[24px] text-[#333333]">
              Living
            </h3>
          </div>

          <div className="flex flex-col items-center gap-[30px]">
            <Link to="/shop/bedroom" className="w-full">
              <img
                src={bedroomImg}
                alt="Bedroom Setup"
                className="w-full rounded-[10px] object-cover transition-transform hover:scale-105 cursor-pointer"
              />
            </Link>
            <h3 className="font-poppins font-semibold text-[24px] text-[#333333]">
              Bedroom
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
