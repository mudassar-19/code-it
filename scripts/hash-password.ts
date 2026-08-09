/**
 * Generate a bcrypt hash for an admin password — a convenience helper so no
 * plaintext password is ever stored or hardcoded.
 *
 *   npm run hash-password -- "your-strong-password"
 *
 * Copy the printed hash into .env as ADMIN_PASSWORD_HASH, then run
 * `npm run seed:admin`.
 */
import bcrypt from "bcryptjs";

async function main() {
  const password = process.argv[2];
  if (!password) {
    console.error('Usage: npm run hash-password -- "your-strong-password"');
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("Choose a password of at least 8 characters.");
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 12);
  console.log(hash);
}

main();
