import 'dotenv/config'; 
import pgPromise from 'pg-promise';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL environment variable is not set.");
  process.exit(1);
}

const pgp = pgPromise();

const db = pgp({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

const testConnection = async () => {
  try {
    await db.one('SELECT current_timestamp'); 
    console.log('✅ Database connection established (Remota)');
    return db;
  } catch (error) {
    console.error('❌ Supabase database connection failed:', error.message);
    throw error; 
  }
};

export { db, pgp, testConnection };