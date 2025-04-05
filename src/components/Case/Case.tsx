import { Case } from '@/payload-types'
import styles from './case.module.scss'
import Link from 'next/link'
import { ButtonLink } from '../ButtonLink/ButtonLink'
import { Inter } from 'next/font/google'

type Props = {
  caseData: Case
  reverse?: boolean
  vertical?: boolean
  index: number
}

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const CaseComponent = ({ caseData, reverse, vertical, index }: Props) => {
  return (
    <div
      className={`${styles.container} ${reverse && styles.reverseFlex} ${vertical && styles.verticalFlex}`}
    >
      <div className={styles.leftContent}>
        <div className={styles.contentContainer}>
          <h4 className={styles.desktopTitle}>Case #{index + 1}</h4>
          <p>{caseData.taskDescription}</p>
        </div>

        <div className={styles.btnWrapper}>
          <ButtonLink href={`/cases/${caseData.slug}`} title="Read More" />
        </div>
      </div>
      <div className={`${styles.right} ${inter.variable}`}>
        <h4>{caseData.title}</h4>
        <p>{caseData.previewDescription}</p>
        <div className={styles.rightBg}></div>
        <div className={styles.rightBgImage}></div>
      </div>
      <h4 className={styles.mobileTitle}>Case #{index + 1}</h4>
    </div>
  )
}
