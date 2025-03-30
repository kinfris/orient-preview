import { Service } from '@/payload-types'
import styles from './service.module.scss'
import Link from 'next/link'
import { Media } from '../Media'

type Props = {
  service: Service
}

export const ServiceComponent = ({ service }: Props) => {
  return (
    <Link href={`/services/${service.slug}`} className={styles.container}>
      <Media resource={service.serviceIcon ?? ''} />
      <h4>{service.title}</h4>
      <p>{service.shortDescription}</p>
    </Link>
  )
}
