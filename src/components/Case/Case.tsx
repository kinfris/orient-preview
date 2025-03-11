import { Case } from '@/payload-types'
import { Media } from '../Media'
import styles from './case.module.scss'
import Link from 'next/link'

type Props = {
  caseData: Case
}

export const CaseComponent = ({ caseData }: Props) => {
  // console.log('caseData - ', caseData)
  return (
    <div className={styles.container}>
      <div className={styles.leftContent}>
        <h4>Case #1</h4>
        <p>
          EduConnect is a platform connecting educators and students globally, offering tools for
          virtual classrooms, resource sharing, and collaborative learning. Orinix’s expertise
          helped us launch a scalable, user-friendly solution that has transformed the way educators
          and students interact online.
        </p>
        <Link href={'/contact'}>
          <span>Read More</span>
          <img src="/arrow-icon.svg" alt="" />
        </Link>
      </div>
      <div className={styles.right}>
        <h4>Orinix Project Title Here</h4>
        <p>This field is a small description of our project.</p>
        <div className={styles.rightBg}></div>
        <div className={styles.rightBgImage}></div>
      </div>
    </div>
  )
}
