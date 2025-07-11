import { Link } from "react-router-dom";
import { BigStar } from "../icons";

const HeroSection = () => {
  return (
    <section className="relative min-h-[700px] w-full bg-[#F2F0F1]">
      <div className="container mx-auto px-4 pt-10 md:pt-0">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-4">
            <h1 className="font-anton max-w-[16ch] text-4xl leading-tight font-bold text-black md:text-7xl">
              Find products That match your needs
            </h1>
            <p className="mb-8 max-w-xl text-base text-[#00000060] md:text-lg">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <div>
              <Link
                to="#"
                className="inline-block rounded-full bg-black px-12 py-3 text-lg font-semibold text-white transition-colors hover:bg-gray-800"
              >
                Shop Now
              </Link>
            </div>
          </div>

          <div className="relative">
            <BigStar className="absolute top-10 right-0 z-50 size-14 text-black md:top-20 md:right-10 md:size-20" />
            <div className="relative aspect-square lg:h-[700px]">
              <img
                src="/hero.png"
                alt="Shopping"
                className="h-full w-full object-cover object-right"
              />
            </div>
            <BigStar className="absolute bottom-30 left-0 z-50 size-10 text-black md:bottom-70 md:size-14" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
