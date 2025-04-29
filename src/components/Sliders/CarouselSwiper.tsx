'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './sliders.module.scss'
import { Autoplay } from 'swiper/modules'
import { Media as MediaBlock } from '../Media'
import { Media } from '@/payload-types'

type Props = {
  displayedLogos: {
    logoImage?: (string | null) | Media
    logoTitle?: string | null
    id?: string | null
  }[]
}

export const CarouselSwiper = ({ displayedLogos }: Props) => {
  return (
    <div className={styles.carouselContainer}>
      <Swiper
        slidesPerView="auto"
        speed={3000}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        freeMode={false}
        allowTouchMove={false}
      >
        {displayedLogos.map((el, i) => (
          <SwiperSlide key={`${el.id ?? 'no-id'}-${i}`} className={styles.slide}>
            {el.logoImage ? (
              <MediaBlock resource={el.logoImage} loading="lazy" />
            ) : (
              <p>{el.logoTitle}</p>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
