import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";

// @ts-expect-error - O Splide não exporta os tipos de CSS corretamente
import "@splidejs/react-splide/css";

import room1 from "@assets/room1.jpg";
import room2 from "@assets/room2.jpg";
import room3 from "@assets/room3.jpg";

const roomsData = [
  { id: 1, title: "Inner Peace", category: "01 —— Bed Room", image: room1 },
  { id: 2, title: "Modern Setup", category: "02 —— Living Room", image: room2 },
  { id: 3, title: "Cozy Corner", category: "03 —— Guest Room", image: room3 },
];

export function Rooms() {
  return (
    <section className="w-full bg-[#FCF8F3] py-11 overflow-hidden relative flex justify-center">
      <style>
        {`
          .splide__pagination {
            bottom: -10px !important;
          }
          .splide__pagination__page {
            background: #D8D8D8 !important;
            width: 11px !important;
            height: 11px !important;
            margin: 0 6px !important;
            transition: all 0.3s ease;
          }
          .splide__pagination__page.is-active {
            background: #B88E2F !important;
            position: relative;
          }
        `}
      </style>

      <div className="w-full max-w-[1183px] px-5 lg:px-0 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex flex-col items-start w-full lg:w-1/3 max-w-[422px]">
          <h2 className="font-poppins font-bold text-[32px] md:text-[40px] leading-[1.2] md:leading-[48px] text-[#3A3A3A] mb-2">
            50+ Beautiful rooms inspiration
          </h2>
          <p className="font-poppins font-medium text-[16px] text-[#616161] mb-6">
            Our designer already made a lot of beautiful prototipe of rooms that
            inspire you
          </p>
          <Link to="/shop">
            <button className="bg-[#B88E2F] text-white font-semibold text-[16px] py-3 px-9 hover:bg-[#9d7725] transition-colors">
              Explore More
            </button>
          </Link>
        </div>

        <div className="w-full lg:w-2/3 ml-auto">
          <Splide
            options={{
              type: "loop",
              focus: 0,
              perPage: 2,
              perMove: 1,
              gap: "24px",
              pagination: true,
              arrows: true,
              updateOnMove: true,
              breakpoints: {
                1024: { perPage: 2 },
                768: { perPage: 1, gap: "16px" },
              },
            }}
            className="pb-12"
          >
            {roomsData.map((room) => (
              <SplideSlide key={room.id}>
                <div className="relative group w-full h-[400px] md:h-[582px]">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover rounded-[4px]"
                  />

                  <div className="absolute bottom-6 left-4 md:left-6 bg-white/70 backdrop-blur-sm p-4 md:p-6 flex flex-col gap-2 min-w-[217px] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-poppins font-medium text-[16px] text-[#616161]">
                      {room.category}
                    </span>
                    <h3 className="font-poppins font-semibold text-[24px] md:text-[28px] text-[#3A3A3A]">
                      {room.title}
                    </h3>

                    <button className="absolute bottom-0 -right-12 w-12 h-12 bg-[#B88E2F] text-white flex items-center justify-center hover:bg-[#9d7725] transition-colors">
                      ➔
                    </button>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </section>
  );
}
