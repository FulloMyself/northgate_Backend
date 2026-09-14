import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "./modules/users/user.model.js";

const seedUsers = [
  { name: "Northgate Administrator", idNumber: "8001015009086", email: "admin@northgate.local", role: "ADMIN", password: "AdminPass!2026" },
  { name: "Thandi Security", idNumber: "8202025009085", email: "security.one@northgate.local", role: "SECURITY", password: "SecurityPass!2026" },
  { name: "Sipho Security", idNumber: "8303035009084", email: "security.two@northgate.local", role: "SECURITY", password: "SecurityPass!2026" },
  { name: "Lerato Mokoena", idNumber: "9004045009083", email: "resident.one@northgate.local", role: "RESIDENT", password: "ResidentPass!2026" },
  { name: "Johan Botha", idNumber: "9105055009082", email: "resident.two@northgate.local", role: "RESIDENT", password: "ResidentPass!2026" },
  { name: "Anele Visitor", idNumber: "9206065009081", email: "visitor.one@northgate.local", role: "VISITOR", password: "VisitorPass!2026" },
  { name: "Mia Visitor", idNumber: "9307075009080", email: "visitor.two@northgate.local", role: "VISITOR", password: "VisitorPass!2026" },
  { name: "David Visitor", idNumber: "9408085009079", email: "visitor.three@northgate.local", role: "VISITOR", password: "VisitorPass!2026" },
  { name: "Naledi Visitor", idNumber: "9509095009078", email: "visitor.four@northgate.local", role: "VISITOR", password: "VisitorPass!2026" }
];

async function seed() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not configured.");
  await mongoose.connect(process.env.MONGODB_URI);

  for (const seedUser of seedUsers) {
    const { password, ...profile } = seedUser;
    await User.findOneAndUpdate(
      { email: profile.email },
      { ...profile, passwordHash: await bcrypt.hash(password, 12), active: true },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
    );
  }

  console.log(`Seeded ${seedUsers.length} users: 1 Admin, 2 Security, 2 Residents, 4 Visitors.`);
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error("User seed failed:", error.message);
  await mongoose.disconnect();
  process.exitCode = 1;
});
