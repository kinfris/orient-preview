import type { Metadata } from 'next/types'

import styles from './services.module.scss'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { Media } from '@/components/Media'

export const revalidate = 600

export default async function Services() {
  const payload = await getPayload({ config: configPromise })

  const servicesData = await payload.find({
    collection: 'services',
    overrideAccess: false,
  })

  const services = servicesData.docs

  return (
    <div className={styles.container}>
      <div className={styles.bgContainer}></div>
      <div className={styles.gradientContainer}></div>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h2>SERVICES</h2>
          <p>
            At Orinix, every project tells a story of innovation and impact. We deliver custom
            software, seamless IT solutions, and agile teams that drive efficiency and growth.
            <br />
            <br />
            Explore how we turn challenges into opportunities, empowering businesses worldwide.
          </p>
        </header>
        <div className={styles.servicesContainer}>
          {services.map((el) => {
            const url = `services/${el.slug}`
            return (
              <Link key={el.id} href={el.slug ? url : ''} className={styles.service}>
                <Media resource={el.serviceIcon ?? ''} />
                <h4>{el.title}</h4>
                <p>{el.shortDescription}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Services`,
  }
}
