import { getPayload } from 'payload'
import config from '../payload.config'
import { convertTextToRichText } from '../migrations/convertTextToRichText'

async function runMigration() {
  console.log('🚀 Starting case data migration...')
  
  try {
    // Initialize Payload
    const payload = await getPayload({ config })
    
    // Run the migration
    await convertTextToRichText(payload)
    
    console.log('🎉 Migration completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run the migration
runMigration() 