import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Case } from '../../../payload-types'

export const revalidateCase: CollectionAfterChangeHook<Case> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/cases/${doc.slug}`

      payload.logger.info(`Revalidating case at path: ${path}`)

      revalidatePath(path)
      revalidateTag('cases-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/cases/${previousDoc.slug}`

      payload.logger.info(`Revalidating old blog at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('cases-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Case> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/cases/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('cases-sitemap')
  }

  return doc
}
