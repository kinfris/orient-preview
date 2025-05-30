import { Payload } from 'payload'

// Helper function to convert plain text to Lexical rich text format
function textToLexical(text: string) {
  if (!text || typeof text !== 'string') {
    return null
  }

  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: text,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

export async function convertTextToRichText(payload: Payload) {
  console.log('Starting migration: Converting text fields to rich text...')

  try {
    // Get all cases with string text fields
    const cases = await payload.find({
      collection: 'cases',
      limit: 1000,
      pagination: false,
    })

    console.log(`Found ${cases.docs.length} cases to migrate`)

    let migratedCount = 0

    for (const caseDoc of cases.docs) {
      let needsUpdate = false
      const updateData: any = {}

      // Check taskDescription
      if (
        caseDoc.taskDescription &&
        typeof caseDoc.taskDescription === 'string'
      ) {
        updateData.taskDescription = textToLexical(caseDoc.taskDescription)
        needsUpdate = true
        console.log(`Converting taskDescription for case: ${caseDoc.id}`)
      }

      // Check resultDescription
      if (
        caseDoc.resultDescription &&
        typeof caseDoc.resultDescription === 'string'
      ) {
        updateData.resultDescription = textToLexical(caseDoc.resultDescription)
        needsUpdate = true
        console.log(`Converting resultDescription for case: ${caseDoc.id}`)
      }

      // Check afterTaskResultDescription
      if (
        caseDoc.afterTaskResultDescription &&
        typeof caseDoc.afterTaskResultDescription === 'string'
      ) {
        updateData.afterTaskResultDescription = textToLexical(
          caseDoc.afterTaskResultDescription
        )
        needsUpdate = true
        console.log(`Converting afterTaskResultDescription for case: ${caseDoc.id}`)
      }

      // Update the document if any field needs conversion
      if (needsUpdate) {
        await payload.update({
          collection: 'cases',
          id: caseDoc.id,
          data: updateData,
        })
        migratedCount++
        console.log(`✓ Updated case: ${caseDoc.id}`)
      }
    }

    console.log(`✅ Migration completed! Migrated ${migratedCount} cases.`)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  }
} 