'use client';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.global.css';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ProductsComponent() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const products = [
    {
      srcImg: "https://darkside.vteximg.com.br/arquivos/ids/174509/alice-baby-capa.png?v=637606839658300000",
      productName: "Alice no País das Maravilhas (Baby Edition)",
      link: "/alice-no-pais-das-maravilhas--baby-edition--drk-x/p"
    },
    {
      srcImg: "https://darkside.vteximg.com.br/arquivos/ids/196767/alice_pesadelo_mini_capa.png?v=638626924104470000",
      productName: "Alice no País das Maravilhas e Através do Espelho - Edição P...",
      link: "/alice-no-pais-das-maravilhas-e-atraves-do-espelho---edicao-pesadelo--brindes-exclusivos/p"
    },
    {
      srcImg: "https://darkside.vteximg.com.br/arquivos/ids/198443/4AD166C81262F4B750CDCAA7F1BB5C9B_67011289-b6c8-4de4-ba5c-9907bbc4e45e_239-alice-classic-edition.png?v=638742941929700000",
      productName: "Alice no País das Maravilhas (Classic Edition)",
      link: "/alice-no-pais-das-maravilhas--classic-edition--drk-x/p"
    },
    {
      srcImg: "https://darkside.vteximg.com.br/arquivos/ids/173323/alice-atraves-do-espelho_33745a1cb8104a18a2e2f8973ff50dba.jpg?v=637504607189100000",
      productName: "Alice Através do Espelho (Classic Edition)",
      link: "/alice-atraves-do-espelho-classic-edition--brinde-exclusivo/p"
    },
    {
      srcImg: "https://darkside.vteximg.com.br/arquivos/ids/173379/alice-atraves-do-espelho-limited_7d3ed654a53443d293e376b5a5d341e9.jpg?v=637508927497400000",
      productName: "Alice Através do Espelho (Limited Edition)",
      link: "/alice-atraves-do-espelho-limited-edition--brinde-exclusivo/p"
    },
    {
      srcImg: "https://darkside.vteximg.com.br/arquivos/ids/169706/361-alice-limited-edition.png?v=637025214161530000",
      productName: "Alice no País das Maravilhas (Limited Edition)",
      link: "/Alice-no-Pais-das-Maravilhas--Limited-Edition--DRK-X/p"
    }
  ];

  return (
    <div className="product py-8 relative group">
      <button
        ref={prevRef}
        className="absolute top-1/2 -left-10 z-10 -translate-y-1/2 text-gray-400 shadow cursor-pointer w"
        aria-label="Anterior"
      >
        <ChevronLeft 
            width={45}
            height={45}
        />
      </button>
      <button
        ref={nextRef}
        className="absolute top-1/2 -right-10 z-10 -translate-y-1/2 text-gray-400 shadow cursor-pointer"
        aria-label="Próximo"
      >
        <ChevronRight 
            width={45}
            height={45}
        />
      </button>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={4}
        loop
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current!,
          nextEl: nextRef.current!
        }}
        onBeforeInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== 'boolean'
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        className="custom-swiper px-8"
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 }
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <Link href={`https://www.darksidebooks.com.br/${product.link}`}>
              <div>
                <Image
                  src={product.srcImg}
                  alt={product.productName}
                  width={215}
                  height={322}
                  className="mx-auto"
                />
              </div>
              <h2 className="text-white hover:text-[#b31111] text-lg font-bold pt-4 pb-12 text-center line-clamp-3">
                {product.productName}
              </h2>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
