import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Categories from '../Categories/Categories';
import axios from 'axios';

export default function CategorySlider() {

    const [categories, setCategories] = useState([]);
    async function getCategories(){
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        setCategories(data.data);
    }

    useEffect(()=> {
        getCategories();
    },[])

    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 7, 
      slidesToScroll: 2,
      autoplay: true,
      responsive: [
        {
          breakpoint: 1024, 
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 768, 
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 480, 
          settings: {
            slidesToShow: 3,
          },
        },
      ],
    };
  return (<>
    <div className='py-3'>
      <Slider {...settings}>
        {
            categories.map((c)=> <div key={c._id}>
                <img className='h-52 w-full object-cover' src={c.image} alt="" />
                <h2 className='text-center text-lg font-normal'>{c.name}</h2>
            </div>)
        }

      </Slider>
    </div>
    </>
  )
}
