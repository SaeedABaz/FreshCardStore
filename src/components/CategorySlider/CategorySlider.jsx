import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Slider from 'react-slick'
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

    const settings ={
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2,
        autoplay: true,
    };
  return (<>
    <div>
      <Slider  {...settings}>
        {
            categories.map((c)=> <div key={c._id}>
                <img className='h-56 w-full object-cover' src={c.image} alt="" />
                <h2 className='text-center text-lg font-normal'>{c.name}</h2>
            </div>)
        }

      </Slider>
    </div>
    </>
  )
}
