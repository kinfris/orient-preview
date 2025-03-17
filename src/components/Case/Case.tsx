import { Case } from '@/payload-types'
import styles from './case.module.scss'
import Link from 'next/link'
import { ButtonLink } from '../ButtonLink/ButtonLink'

type Props = {
  caseData: Case
  reverse?: boolean
  vertical?: boolean
  index: number
}

export const CaseComponent = ({ caseData, reverse, vertical, index }: Props) => {
  return (
    <div
      className={`${styles.container} ${reverse && styles.reverseFlex} ${vertical && styles.verticalFlex}`}
    >
      <div className={styles.leftContent}>
        <h4>Case #{index + 1}</h4>
        <p>{caseData.taskDescription}</p>
        <ButtonLink href={`/cases/${caseData.slug}`} title="Read More" />
      </div>
      <div className={styles.right}>
        <h4>{caseData.title}</h4>
        <p>{caseData.previewDescription}</p>
        <div className={styles.rightBg}></div>
        <div className={styles.rightBgImage}></div>
      </div>
    </div>
  )
}
