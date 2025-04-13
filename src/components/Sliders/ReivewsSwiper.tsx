'use client'

import styles from './sliders.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

type Props = {
  reviews: {
    stars: number
    description: string
    reviewerName: string
    reviewerPosition: string
    reviewerCompany: string
    projectDescription: string
    fullCaseLink?: string | null
    id?: string | null
  }[]
  isMobile: boolean
}

export const ReviewsSwiper = ({ reviews, isMobile }: Props) => {
  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.reviewsTop}>
        <h2>Reviews</h2>
        <div className={styles.swiperNav}>
          <div className={styles.reviewsSwiperButtonPrev}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z" />
            </svg>
          </div>

          <div className={styles.reviewsSwiperButtonNext}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z" />
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.reviewsSwiperContainer}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={isMobile ? 1 : 2}
          navigation={{
            nextEl: `.${styles.reviewsSwiperButtonNext}`,
            prevEl: `.${styles.reviewsSwiperButtonPrev}`,
          }}
          className="swiper"
        >
          {reviews.map((review, i) => (
            <SwiperSlide
              key={review.id}
              className={`${styles.reviewSlide} ${i % 2 === 0 && styles.reviewSlideBg}`}
            >
              <div>
                <p className={styles.reviewDescription}>{review.description}</p>
                <div className={styles.dividedIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="556"
                    height="2"
                    viewBox="0 0 556 2"
                    fill="none"
                  >
                    <path d="M0 1H556" stroke="url(#paint0_linear_6269_2264)" />
                    <defs>
                      <linearGradient
                        id="paint0_linear_6269_2264"
                        x1="0"
                        y1="1.5"
                        x2="556"
                        y2="1.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#1C1A29" />
                        <stop offset="0.34" stopColor="#454251" />
                        <stop offset="0.66" stopColor="#454251" />
                        <stop offset="1" stopColor="#1C1A29" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className={styles.score}>
                  <div className={styles.reviewer}>
                    <p className={styles.name}>{review.reviewerName}</p>
                    <div className={styles.company}>
                      <div>
                        {review.reviewerPosition}, <span>{review.reviewerCompany}</span>
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="6"
                          height="6"
                          viewBox="0 0 6 6"
                          fill="none"
                        >
                          <circle cx="3" cy="3" r="3" fill="white" />
                        </svg>
                      </div>
                      <div className={styles.stars}>
                        <div className={styles.star}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="20"
                            viewBox="0 0 22 20"
                            fill="none"
                          >
                            <path
                              d="M10.1033 0.816987C10.4701 0.0737414 11.5299 0.0737401 11.8967 0.816986L14.294 5.67446C14.4397 5.9696 14.7213 6.17417 15.047 6.2215L20.4075 7.00043C21.2277 7.11961 21.5552 8.12759 20.9617 8.70612L17.0828 12.4871C16.8471 12.7169 16.7396 13.0479 16.7952 13.3723L17.7109 18.7111C17.851 19.528 16.9936 20.151 16.26 19.7653L11.4653 17.2446C11.174 17.0915 10.826 17.0915 10.5347 17.2446L5.74005 19.7653C5.00642 20.151 4.14899 19.528 4.2891 18.7111L5.20479 13.3723C5.26043 13.0479 5.15288 12.7169 4.91719 12.4871L1.03827 8.70612C0.444756 8.12759 0.772265 7.11961 1.59249 7.00043L6.95302 6.2215C7.27873 6.17417 7.5603 5.9696 7.70596 5.67446L10.1033 0.816987Z"
                              fill="#AC69FD"
                            />
                          </svg>
                        </div>
                        <p>{review.stars}.0</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
