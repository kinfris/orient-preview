'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './sliders.module.scss'
import { Autoplay } from 'swiper/modules'
import { Media as MediaBlock } from '../Media'
import { Media } from '@/payload-types'
import { v4 as uuidv4 } from 'uuid'
import { useMemo } from 'react'

type Props = {
  logos: {
    logoImage?: (string | null) | Media
    logoTitle?: string | null
    id?: string | null
  }[]
  isMobile: boolean
}

export const CarouselSwiper = ({ logos, isMobile }: Props) => {
  const displayedLogos = useMemo(() => {
    const baseLogos = isMobile ? logos : [...Array(10)].flatMap(() => logos)

    return baseLogos.map((logo) => ({
      ...logo,
      uuid: uuidv4(),
    }))
  }, [logos, isMobile])
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
          <SwiperSlide key={el.uuid} className={styles.slide}>
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
