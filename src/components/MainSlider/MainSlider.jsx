import React from 'react'

import fixed1 from "../../assets/fixed-1.jpeg";
import fixed2 from "../../assets/fixed-2.png";
import slider1 from "../../assets/slider-1.jpeg";
import slider2 from "../../assets/slider-2.jpeg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import Slider from "react-slick";


export default function MainSlider() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12 gap-1 mb-7">
      {/* Main Slider - Occupies Full Width on Mobile, 8 Columns on Larger Screens */}
      <div className=" md:col-span-8 ">
        <Slider autoplay={true} arrows={false} dots={true}>
          <img className="object-cover w-full h-[155px] md:h-[350px] lg:h-[400px]" src={slider1} alt="" />
          <img className=" object-cover w-full  h-[155px] md:h-[350px] lg:h-[400px]" src={slider2} alt="" />
        </Slider>
      </div>

      {/* Side Images - Stack on Mobile, Show in 4-Column Layout on Larger Screens */}
      <div className=" md:col-span-4 flex flex-col gap-1">
        <img className="object-cover w-full h-[77px] md:h-[175px] lg:h-[200px]" src={fixed1} alt="" />
        <img className="object-cover w-full h-[77px] md:h-[170px] lg:h-[200px]" src={fixed2} alt="" />
      </div>
    </div>
  );
}
