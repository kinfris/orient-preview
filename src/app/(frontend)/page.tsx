import { generateMetadata } from './[slug]/page'
import Image from 'next/image'
import styles from './home.module.scss'
import { Title } from '@/components/Title/Title'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundContainer}></div>
      <div className={styles.contentContainer}>
        <Image src="/home_hero.png" width={748} height={726} alt="Home banner" />
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
        </div>
      </div>
    </div>
  )
}

export { generateMetadata }
