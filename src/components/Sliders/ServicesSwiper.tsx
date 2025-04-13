'use client'

import { Service } from '@/payload-types'
import styles from './sliders.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { ServiceComponent } from '../Service/Service'
import { ButtonLink } from '../ButtonLink/ButtonLink'

type Props = {
  servicesData: Service[]
  isMobile: boolean
}

export const ServicesSwiper = ({ servicesData, isMobile }: Props) => {
  return (
    <>
      {isMobile ? (
        <div className={styles.servicesMobileContainer}>
          <h2>WHAT WE DO</h2>
          <div className={styles.servicesList}>
            {servicesData.map((service, i) => (
              <ServiceComponent key={service.id ?? `service-${i}`} service={service} />
            ))}
          </div>
          <ButtonLink href={'/services'} title="See More" />
        </div>
      ) : (
        <div className={styles.servicesContainer}>
          <div className={styles.servicesTop}>
            <h2>WHAT WE DO</h2>
            <div className={styles.swiperNav}>
              <div className={styles.servicesSwiperButtonPrev}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z" />
                </svg>
              </div>

              <div className={styles.servicesSwiperButtonNext}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z" />
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.servicesSwiperContainer}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={50}
              slidesPerView={4}
              slidesPerGroup={4}
              navigation={{
                nextEl: `.${styles.servicesSwiperButtonNext}`,
                prevEl: `.${styles.servicesSwiperButtonPrev}`,
              }}
            >
              {servicesData.map((service, i) => (
                <SwiperSlide key={service.id ?? `service-${i}`} className={styles.serviceSlide}>
                  <ServiceComponent service={service} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  )
}
