'use client'

import Image from 'next/image'

import { Title } from '@/components/Title/Title'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import styles from './home.module.scss'

import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import Link from 'next/link'
import { Case, Home } from '@/payload-types'
import { Media } from '../Media'
import { CaseComponent } from '../Case/Case'

type Props = {
  homeData: Home[]
  casesData: Case[]
}

export const HomeClient = ({ homeData, casesData }: Props) => {
  const data = homeData[0]

  if (!data) return <div>Something went wrong...</div>

  const { logos, reviews, team } = data

  return (
    <div className={styles.container}>
      <div className={styles.topContentContainer}>
        <Image src="/logo_circles_anim.webp" width={748} height={726} alt="Home banner" />
        <div className={styles.content}>
          <Title>
            <h1>Orinix</h1>
          </Title>
          <p>
            At Orinix, we simplify complexity.
            <br />
            Our tailored software solutions, smart team augmentation, and cutting-edge IT consulting
            help businesses operate faster, smarter, and more efficiently.
          </p>

          <Link href={'/contact'}>Get a Quote</Link>
        </div>
      </div>
      <div className={styles.carouselContainer}>
        <div className={styles.gradientBorder}></div>
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
          {[...logos, ...logos].map((el, i) => {
            return (
              <SwiperSlide key={`${el.id}${i}`} className={styles.slide}>
                {el.logoImage ? <Media resource={el.logoImage} /> : <p>{el.logoTitle}</p>}
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div className={styles.gradientBorder}></div>
      </div>
      <div className={styles.reviewsContainer}>
        <h2>Reviews</h2>
        <div className={styles.reviewsSwiperContainer}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={{
              nextEl: `.${styles.reviewsSwiperButtonNext}`,
              prevEl: `.${styles.reviewsSwiperButtonPrev}`,
            }}
            pagination={{
              el: `.${styles.swiperPagination}`,
              type: 'fraction',
            }}
            className="swiper"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className={styles.reviewSlide}>
                <div>
                  <div className={styles.score}>
                    <p>{review.stars}.0</p>
                    <div className={styles.stars}>
                      {Array.from({ length: review.stars }, (_, i) => i + 1).map((star) => {
                        return (
                          <div key={star} className={styles.star}>
                            <img src="/star.svg" alt="" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className={styles.reviewDescription}>{review.description}</div>
                  <div className={styles.reviewer}>
                    <p className={styles.name}>{review.reviewerName}</p>
                    <p className={styles.company}>
                      {review.reviewerPosition}, <span>{review.reviewerCompany}</span>
                    </p>
                  </div>
                </div>
                <div className={styles.projectDescriptionContainer}>
                  <h2>Project</h2>
                  <p className={styles.projectDescription}>{review.projectDescription}</p>
                  <Link href={review.fullCaseLink ?? ''} className={styles.buttonLink}>
                    Full case
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Arrows and Slide Counter */}
          <div className={styles.swiperNav}>
            <div className={styles.reviewsSwiperButtonPrev}>
              <img alt="" src="/right-arrow.svg" />
            </div>
            <div className={styles.swiperPagination}></div>
            <div className={styles.reviewsSwiperButtonNext}>
              <img alt="" src="/right-arrow.svg" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.gradientBorder}></div>
      <div className={styles.casesContainer}>
        <h2>Cases</h2>
        <div className={styles.caseCarouselContainer}>
          <Swiper
            spaceBetween={24}
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
            autoHeight={false}
            className={styles.caseSlider}
          >
            {casesData &&
              casesData.length > 0 &&
              [...casesData, ...casesData, ...casesData].map((el, i) => {
                return (
                  <SwiperSlide key={`${el.id}${i}`} className={styles.caseSlide}>
                    <CaseComponent caseData={el} />
                  </SwiperSlide>
                )
              })}
          </Swiper>
        </div>
      </div>
      {data.showTeamSection && (
        <>
          <div className={styles.gradientBorder}></div>
          <div className={styles.teamContainer}>
            <h2>Meet our team</h2>
            <div className={styles.teamList}>
              {team.map((el) => {
                return (
                  <div key={el.id} className={styles.person}>
                    <Media resource={el.image} />
                    <div className={styles.personContent}>
                      <div>
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
          </div>
        </>
      )}

      <div className={styles.backgroundContainer}>
        <div className={styles.backgroundContainerBlur}></div>
      </div>
    </div>
  )
}
