const path = require("path");
const dotenv = require("dotenv");

const envFilePath = path.join(
  __dirname,
  "config",
  `.env.${process.env.NODE_ENV}`
);
console.log(envFilePath);
dotenv.config({ path: envFilePath });

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
