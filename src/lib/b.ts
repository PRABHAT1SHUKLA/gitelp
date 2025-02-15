import { db } from '@/server/db';

const checkPgVectorExtension = async () => {
  const extension = await db.$queryRaw`
    SELECT * FROM pg_extension WHERE extname = 'vector';
  `;
  console.log(extension);
  return extension;
};

checkPgVectorExtension().catch(console.error);
