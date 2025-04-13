'use client'

import { Media as MediaType } from '@/payload-types'
import styles from './sliders.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Media } from '../Media'
import Link from 'next/link'

type Props = {
  team: {
    image: string | MediaType
    name: string
    position: string
    gmail?: string | null
    linkedin?: string | null
    id?: string | null
  }[]
  isMobile: boolean
}

export const TeamSwiper = ({ team, isMobile }: Props) => {
  return (
    <>
      <div className={styles.gradientBorder}></div>
      <div className={styles.teamContainer}>
        <div className={styles.teamTopContainer}>
          <h2>{isMobile ? 'Our team' : 'Meet our team'}</h2>
          {isMobile && (
            <div className={styles.swiperNav}>
              <div className={styles.teamSwiperButtonPrev}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z" />
                </svg>
              </div>

              <div className={styles.teamSwiperButtonNext}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {isMobile ? (
          <Swiper
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={{
              nextEl: `.${styles.teamSwiperButtonNext}`,
              prevEl: `.${styles.teamSwiperButtonPrev}`,
            }}
          >
            {team.map((el) => (
              <SwiperSlide key={el.id} className={styles.serviceSlide}>
                <div key={el.id} className={styles.person}>
                  <Media resource={el.image} loading="lazy" />
                  <div className={styles.personContent}>
                    <div className={styles.name}>
                      <h4>{el.name}</h4>
                      <p>{el.position}</p>
                    </div>
                    <div className={styles.personLinks}>
                      <Link href={el.gmail ?? ''}>
                        <img src="/Google_Icon.svg" alt="" />
                      </Link>
                      <Link href={el.linkedin ?? ''}>
                        <img src="/LinkedIn_Icon.svg" alt="" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.teamList}>
            {team.map((el) => {
              return (
                <div key={el.id} className={styles.person}>
                  <Media resource={el.image} />
                  <div className={styles.personContent}>
                    <div className={styles.name}>
                      <h4>{el.name}</h4>
                      <p>{el.position}</p>
                    </div>
                    <div className={styles.personLinks}>
                      <Link href={el.gmail ?? ''}>
                        <img src="/Google_Icon.svg" alt="" />
                      </Link>
                      <Link href={el.linkedin ?? ''}>
                        <img src="/LinkedIn_Icon.svg" alt="" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
