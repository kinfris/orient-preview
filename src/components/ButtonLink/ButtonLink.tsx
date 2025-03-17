import Link from 'next/link'
import styles from './buttonLink.module.scss'

type Props = {
  href: string
  title: string
}

export const ButtonLink = ({ href, title }: Props) => {
  return (
    <Link href={href} className={styles.link}>
      <span>{title}</span>
      <div className={styles.imageContainer}>
        <img src="/arrow-icon.svg" alt="" />
      </div>
    </Link>
  )
}
