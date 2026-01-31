import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Seeding Started ---');

  const password = "1234";
  const hash = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.upsert({
    where: { email: 'test@gmail.com' },
    update: {},
    create: {
      email: 'test@gmail.com',
      password_hash: hash,
      name: 'Super Admin',
      role: 'admin',
    },
  });

  console.log(`✅ Admin created: ${admin.email}`);
  console.log('--- Seeding Finished ---');
}

// THIS PART IS CRITICAL:
main()
  .catch((e) => {
    console.error('❌ Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });