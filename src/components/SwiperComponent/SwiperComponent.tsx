'use client';
import React, { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './swiper.global.css'

import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

export default function SwiperComponent() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1080);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const slides = [
    {
      desktopSrc: 'https://darkside.vtexassets.com/assets/vtex.file-manager-graphql/images/2bf20496-9397-45c7-9ae9-cbdd5de782f2___75c469472e34670ed2ad7964dc05f406.jpg',
      mobileSrc: 'https://darkside.vtexassets.com/assets/vtex.file-manager-graphql/images/33666dbd-bf60-49ee-a328-654fa1b7e018___8affdb28f09ee673e7584e178be0f178.jpg',
    },
    {
      desktopSrc: 'https://darkside.vtexassets.com/assets/vtex.file-manager-graphql/images/33666dbd-bf60-49ee-a328-654fa1b7e018___8affdb28f09ee673e7584e178be0f178.jpg',
      mobileSrc: 'https://darkside.vtexassets.com/assets/vtex.file-manager-graphql/images/444cca66-c6b1-434b-a82e-52c4b3024daa___0c2a939805f07d3afdfd8c4e23eb429e.jpg',
    },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={true}
      navigation
      loop={true}
      pagination={{ clickable: true }}
      className="custom-swiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-[300px] md:h-[658px]">
            <Image
              src={isMobile ? slide.mobileSrc : slide.desktopSrc}
              alt="Exposição Alice no País das Maravilhas"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
