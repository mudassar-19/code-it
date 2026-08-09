/**
 * Seed the first admin user from environment variables.
 *
 *   npm run seed:admin
 *
 * Reads ADMIN_EMAIL and ADMIN_PASSWORD_HASH from .env — credentials are
 * NEVER hardcoded here. ADMIN_PASSWORD_HASH must be a bcrypt hash, not a
 * plaintext password; generate one with:
 *
 *   npm run hash-password -- "your-strong-password"
 *
 * Running this repeatedly is safe: it upserts on email, so re-running just
 * updates the existing admin's name/hash.
 */
import { PrismaClient } from "@prisma/client";

// Load .env so DATABASE_URL and the ADMIN_* vars are available when this
// runs outside the Next.js runtime (which loads .env automatically).
try {
  process.loadEnvFile();
} catch {
  // No .env file — fall back to whatever is already in the environment.
}

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim();
  const name = process.env.ADMIN_NAME?.trim() || "Admin";

  if (!email || !passwordHash) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD_HASH must be set in .env. " +
        'Generate a hash with: npm run hash-password -- "your-password"',
    );
  }

  if (!passwordHash.startsWith("$2")) {
    throw new Error(
      "ADMIN_PASSWORD_HASH does not look like a bcrypt hash (should start " +
        'with "$2a$"/"$2b$"). Did you set a plaintext password by mistake? ' +
        'Generate one with: npm run hash-password -- "your-password"',
    );
  }

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, passwordHash, name, role: "admin" },
    select: { id: true, email: true, name: true, role: true },
  });

  console.log(`✔ Admin user ready: ${admin.email} (${admin.name})`);
}

main()
  .catch((error) => {
    console.error("✖ Failed to seed admin user:");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
