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
    <>
    <div className="grid grid-cols-12 mb-7">
        <div className="col-span-12 sm:col-span-8 bg-blue-300">
            <Slider autoplay={true} arrows={false} dots={true}>
            <img className='object-cover h-[400px]'  src={slider1} alt="" />
            <img className='object-cover h-[400px]' src={slider2} alt="" />
            </Slider>
        </div>
        <div className="col-span-4 bg-green-300">
            <img className='object-cover w-full h-[200px]' src={fixed1} alt="" />
            <img className='object-cover w-full h-[200px]' src={fixed2} alt="" />
        </div>
    </div>
    </>
  )
}
