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
  basePath: '/demo-getcomms',
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  swcMinify: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  output: "export",
  reactStrictMode: false,
};

module.exports = nextConfig;
