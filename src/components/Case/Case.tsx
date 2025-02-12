import { Case } from '@/payload-types'
import { Media } from '../Media'
import styles from './case.module.scss'

type Props = {
  caseData: Case
}

export const CaseComponent = ({ caseData }: Props) => {
  return (
    <div className={styles.container}>
      {/* @ts-ignore */}
      <Media resource={caseData.previewImage} />
      <h4>{caseData.projectName}</h4>
      <p>{caseData.previewDescription}</p>
    </div>
  )
}
