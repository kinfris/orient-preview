'use client'

import { Title } from '@/components/Title/Title'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import styles from './home.module.scss'

import { Case, Home, Service } from '@/payload-types'
import ContactForm from '../ContactForm/ContactForm'
import { ButtonLink } from '../ButtonLink/ButtonLink'
import { useEffect, useState } from 'react'
import { CarouselSwiper } from '../Sliders/CarouselSwiper'
import { CasesSwiper } from '../Sliders/CasesSwiper'
import { ReviewsSwiper } from '../Sliders/ReivewsSwiper'
import { TeamSwiper } from '../Sliders/TeamSwiper'
import { ServicesSwiper } from '../Sliders/ServicesSwiper'

type Props = {
  homeData: Home[]
  casesData: Case[]
  servicesData: Service[]
}

export const HomeClient = ({ homeData, casesData, servicesData }: Props) => {
  const [isMobile, setIsMobile] = useState(true)
  const data = homeData[0]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobile(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!data) return <div>Something went wrong...</div>

  const { logos, reviews, team } = data

  const displayedLogos = isMobile
    ? logos.map((logo) => ({ ...logo }))
    : [...Array(3)].flatMap(() => logos.map((logo) => ({ ...logo })))

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
        <CarouselSwiper displayedLogos={displayedLogos} />
      </div>
      <div className={styles.overflowContainer}>
        <div className={styles.casesReviewsWrapper}>
          <div className={styles.casesReviewsBg}></div>
          <div className={styles.casesReviewsBgGradient}></div>
          <div className={styles.casesReviewsContainer}>
            <CasesSwiper casesData={casesData} />
            <ReviewsSwiper reviews={reviews} isMobile={isMobile} />

            {data.showTeamSection && <TeamSwiper team={team} isMobile={isMobile} />}

            <ServicesSwiper
              servicesData={isMobile ? servicesData.slice(0, 4) : servicesData}
              isMobile={isMobile}
            />
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
