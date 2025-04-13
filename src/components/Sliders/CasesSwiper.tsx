'use client'

import { Case } from '@/payload-types'
import styles from './sliders.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { CaseComponent } from '../Case/Case'

type Props = {
  casesData: Case[]
}

export const CasesSwiper = ({ casesData }: Props) => {
  if (!casesData?.length) return null

  return (
    <div className={styles.casesContainer}>
      <div className={styles.casesTop}>
        <h2>Cases</h2>
        <div className={styles.swiperNav}>
          <div className={styles.casesSwiperButtonPrev}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z" />
            </svg>
          </div>

          <div className={styles.casesSwiperButtonNext}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z" />
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.caseCarouselContainer}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            nextEl: `.${styles.casesSwiperButtonNext}`,
            prevEl: `.${styles.casesSwiperButtonPrev}`,
          }}
          className={styles.caseSlider}
        >
          {casesData &&
            casesData.length > 0 &&
            casesData.map((el, i) => {
              return (
                <SwiperSlide key={el.id ?? `case-${i}`} className={styles.caseSlide}>
                  <CaseComponent caseData={el} index={i} />
                </SwiperSlide>
              )
            })}
        </Swiper>
      </div>
    </div>
  )
}
