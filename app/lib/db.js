import postgres from "postgres";
require('dotenv').config()
const sql = postgres(process.env.SUPABASE_SQL)
export default sql 