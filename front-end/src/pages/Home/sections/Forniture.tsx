import setup1 from "@assets/forniture-1.png";
import setup3 from "@assets/forniture-2.png";
import setup2 from "@assets/forniture-3.png";
import setup4 from "@assets/forniture-4.png";
import setup5 from "@assets/forniture-5.png";
import setup6 from "@assets/forniture-6.png";
import setup8 from "@assets/forniture-7.png";
import setup7 from "@assets/forniture-8.png";
import setup9 from "@assets/forniture-9.png";

export function Forniture() {
  return (
    <section className="w-full bg-white pt-16 pb-12 overflow-hidden flex flex-col items-center">
      <div className="text-center mb-10">
        <span className="font-poppins font-semibold text-[20px] text-[#616161]">
          Share your setup with
        </span>
        <h2 className="font-poppins font-bold text-[40px] text-[#3A3A3A]">
          #FuniroFurniture
        </h2>
      </div>

      <div className="relative w-full">
        <div className="relative left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 w-max">
          <div className="flex flex-col gap-4 items-end justify-center w-[811px]">
            <div className="flex items-end gap-4">
              <img
                src={setup1}
                alt="Setup"
                className="w-[274px] h-[382px] object-cover hover:scale-105 transition-transform"
              />
              <img
                src={setup3}
                alt="Setup"
                className="w-[451px] h-[312px] object-cover hover:scale-105 transition-transform"
              />
            </div>

            <div className="flex items-start gap-4">
              <img
                src={setup2}
                alt="Setup"
                className="w-[381px] h-[323px] object-cover hover:scale-105 transition-transform"
              />
              <img
                src={setup4}
                alt="Setup"
                className="w-[344px] h-[242px] object-cover hover:scale-105 transition-transform"
              />
            </div>
          </div>

          <div className="flex justify-center items-center shrink-0">
            <img
              src={setup5}
              alt="Setup"
              className="w-[295px] h-[392px] object-cover hover:scale-105 transition-transform"
            />
          </div>

          <div className="flex flex-col gap-4 items-start justify-center w-[811px]">
            <div className="flex items-end gap-4">
              <img
                src={setup6}
                alt="Setup"
                className="w-[290px] h-[348px] object-cover hover:scale-105 transition-transform"
              />
              <img
                src={setup8}
                alt="Setup"
                className="w-[425px] h-[433px] object-cover hover:scale-105 transition-transform"
              />
            </div>

            <div className="flex items-start gap-4">
              <img
                src={setup7}
                alt="Setup"
                className="w-[178px] h-[242px] object-cover hover:scale-105 transition-transform"
              />
              <img
                src={setup9}
                alt="Setup"
                className="w-[258px] h-[196px] object-cover hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
