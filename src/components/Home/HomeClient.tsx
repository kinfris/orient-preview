'use client'

import { Title } from '@/components/Title/Title'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import styles from './home.module.scss'

import { Autoplay, Navigation } from 'swiper/modules'
import Link from 'next/link'
import { Case, Home, Service } from '@/payload-types'
import { Media } from '../Media'
import { CaseComponent } from '../Case/Case'
import { ServiceComponent } from '../Service/Service'
import ContactForm from '../ContactForm/ContactForm'
import { ButtonLink } from '../ButtonLink/ButtonLink'
import { useEffect, useState } from 'react'

type Props = {
  homeData: Home[]
  casesData: Case[]
  servicesData: Service[]
}

export const HomeClient = ({ homeData, casesData, servicesData }: Props) => {
  const [isMobile, setIsMobile] = useState(false)
  const data = homeData[0]

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!data) return <div>Something went wrong...</div>

  const { logos, reviews, team } = data

  return (
    <div className={styles.container}>
      <div className={styles.topBgContainer}>
        <div className={styles.topBg}></div>
        <div className={styles.topBgGradient}></div>
        <div className={styles.topContentContainer}>
          <div className={styles.topContentWrapper}>
            <div className={styles.content}>
              <Title>
                <h1>Orinix</h1>
              </Title>
              <p>At Orinix, we simplify complexity.</p>
              <p>
                Our tailored software solutions, smart team augmentation, and cutting-edge IT
                consulting help businesses operate faster, smarter, and more efficiently.
              </p>

              <ButtonLink href={'/contact'} title="Get A Quote" />
            </div>
          </div>
        </div>
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
            {(isMobile ? logos : [...Array(10)].flatMap(() => logos)).map((el, i) => (
              <SwiperSlide key={`${el.id}${i}`} className={styles.slide}>
                {el.logoImage ? <Media resource={el.logoImage} /> : <p>{el.logoTitle}</p>}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={styles.overflowContainer}>
        <div className={styles.casesReviewsWrapper}>
          <div className={styles.casesReviewsBg}></div>
          <div className={styles.casesReviewsBgGradient}></div>
          <div className={styles.casesReviewsContainer}>
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
                        <SwiperSlide key={`${el.id}${i}`} className={styles.caseSlide}>
                          <CaseComponent caseData={el} index={i} />
                        </SwiperSlide>
                      )
                    })}
                </Swiper>
              </div>
            </div>

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

            {data.showTeamSection && (
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
            )}

            {isMobile ? (
              <div className={styles.servicesMobileContainer}>
                <h2>WHAT WE DO</h2>
                <div className={styles.servicesList}>
                  {servicesData.slice(0, 4).map((service) => (
                    <ServiceComponent key={service.id} service={service} />
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
                    {servicesData.map((service) => (
                      <SwiperSlide key={service.id} className={styles.serviceSlide}>
                        <ServiceComponent service={service} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.contactWrapper}>
          <div className={styles.contactBg}></div>
          <div className={styles.contactBgGradient}></div>
          <div className={styles.contactContainer}>
            {!isMobile && <h2>CONTACT US</h2>}
            <ContactForm showTitle={isMobile} />
          </div>
        </div>
      </div>
    </div>
  )
}
