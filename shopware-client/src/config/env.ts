import dotenv from "dotenv";
dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  url: requireEnv("SHOPWARE_URL"),
  swAccessKey: requireEnv("SHOPWARE_SW_ACCESS_KEY"),
};
