/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com", protocol: "https" },
      {hostname: "picsum.photos", protocol: "https"},
      {hostname: "utfs.io", protocol: "https"}
    ],
  },
};

export default nextConfig;
