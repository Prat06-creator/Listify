import React, { useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './imageSlider.css'

import { EffectCoverflow, Pagination } from 'swiper/modules';

export default function CardCarousel() {
  return (

    <>
    <div className='page-2'>
    
    <div className='subheading '>
        <h1>The A-Z of Listify — All You Need!</h1></div>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className='relative group'>
          <img className="w-full h-full rounded-[20px] object-cover transition-transform duration-500 group-hover:scale-125" src="/1.png" />
          <div className="content1 absolute bottom-0 p-5 translate-y-[200px] opacity-0 transition duration-500 group-hover:opacity-100 group-hover:translate-y-0 text-[5px] text-black font-bold backdrop-blur-[10px] bg-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex items-center justify-center mt-0.5" >
            <p > Too many tabs open in your brain? Listify is your one place to plan, think, and thrive.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className='relative group'>
          <img className="w-full h-full rounded-[20px] object-cover transition-transform duration-500 group-hover:scale-125" src="/2.png" />
          <div className="content1 absolute bottom-0 p-5 translate-y-[200px] opacity-0 transition duration-500 group-hover:opacity-100 group-hover:translate-y-0 text-[5px] text-black font-bold backdrop-blur-[10px] bg-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex items-center justify-center">
            <p> Zap through your tasks like a productivity ninja! Watch that list shrink and your confidence grow.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className='relative group'>
          <img className="w-full h-full rounded-[20px] object-cover transition-transform duration-500 group-hover:scale-125"  src="/3.png" />
          <div className="content1 absolute bottom-0 p-5 translate-y-[200px] opacity-0 transition duration-500 group-hover:opacity-100 group-hover:translate-y-0 text-[5px] text-black font-bold backdrop-blur-[10px] bg-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex items-center justify-center"><p>Stick it, click it, never forget it! Your colorful brain snapshots ready. </p></div>
        </SwiperSlide>
        <SwiperSlide className='relative group'>
          <img className="w-full h-full rounded-[20px] object-cover transition-transform duration-500 group-hover:scale-125"  src="/4.png" />
          <div className="content1 absolute bottom-0 p-5 translate-y-[200px] opacity-0 transition duration-500 group-hover:opacity-100 group-hover:translate-y-0 text-[5px] text-black font-bold backdrop-blur-[10px] bg-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex items-center justify-center"><p>Pin your wildest dreams and watch them come alive! It’s your personal hype squad. </p></div>
        </SwiperSlide>
        <SwiperSlide className='relative group'>
          <img className="w-full h-full rounded-[20px] object-cover transition-transform duration-500 group-hover:scale-125"   src="/5.png" />
          <div className="content1 absolute bottom-0 p-5 translate-y-[200px] opacity-0 transition duration-500 group-hover:opacity-100 group-hover:translate-y-0 text-[3px] text-black font-bold backdrop-blur-[10px] bg-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex items-center justify-center ">
            <p>Brain feeling like a messy desk? Dump it all here and find your spark again!</p></div>
        </SwiperSlide>
        <SwiperSlide className='relative group'>
          <img className="w-full h-full rounded-[20px] object-cover transition-transform duration-500 group-hover:scale-125"  src="/6.png" />
          <div className="content1 absolute bottom-0 p-5 translate-y-[200px] opacity-0 transition duration-500 group-hover:opacity-100 group-hover:translate-y-0 text-[5px] text-black font-bold backdrop-blur-[10px] bg-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex items-center justify-center">
        <p>Your money, your rules — finally a simple way to track expenses without feeling overwhelmed.</p></div>
        </SwiperSlide>
         <SwiperSlide className='relative group'>
          <img className="w-full h-full rounded-[20px] object-cover transition-transform duration-500 group-hover:scale-125"  src="/7.png" />
          <div className="content1 absolute bottom-0 p-5 translate-y-[200px] opacity-0 transition duration-500 group-hover:opacity-100 group-hover:translate-y-0 text-[5px] text-black font-bold backdrop-blur-[10px] bg-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex items-center justify-center">
        <p>Overthinking again? Say everything here and watch your thoughts turn into organized, doable actions.</p></div>
        </SwiperSlide>
       
      </Swiper>
      </div>
    </>
  );
}
