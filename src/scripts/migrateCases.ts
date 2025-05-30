import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { convertTextToRichText } from '../migrations/convertTextToRichText'

async function runMigration() {
  console.log('🚀 Starting case data migration...')
  
  // Check if required environment variables are loaded
  if (!process.env.PAYLOAD_SECRET) {
    console.error('❌ PAYLOAD_SECRET environment variable is not set')
    process.exit(1)
  }
  
  if (!process.env.DATABASE_URI) {
    console.error('❌ DATABASE_URI environment variable is not set')
    process.exit(1)
  }
  
  console.log('✓ Environment variables loaded')
  
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