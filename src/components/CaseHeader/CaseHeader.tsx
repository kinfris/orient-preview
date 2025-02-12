import { Title } from '@/components/Title/Title'
import Image from 'next/image'

import styles from './caseHeader.module.scss'

export const CaseHeader = () => {
  return (
    <div className={styles.container}>
      <Image src="/cases_bg.png" alt="" width={748} height={726} />
      <div>
        <Title>
          <h1>Cases</h1>
        </Title>
        <p>
          At Orinix, every project tells a story of innovation and impact. We deliver custom
          software, seamless IT solutions, and agile teams that drive efficiency and growth. Explore
          how we turn challenges into opportunities, empowering businesses worldwide.
        </p>
      </div>
    </div>
  )
}
