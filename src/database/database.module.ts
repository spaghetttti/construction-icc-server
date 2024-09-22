import { config } from 'dotenv';
import { Module } from '@nestjs/common';
import { neon } from '@neondatabase/serverless';

// Load Environment Variables
config({
  path: ['.env', '.env.production', '.env.local'],
});

const sql = neon(process.env.DATABASE_URL_PRODUCTION);

console.log(process.env.DATABASE_URL_PRODUCTION);

const dbProvider = {
  provide: 'POSTGRES_POOL',
  useValue: sql,
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DatabaseModule {}
