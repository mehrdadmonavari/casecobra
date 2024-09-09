/** @type {import('next').NextConfig} */
const nextConfig = {
   async headers() {
      return [
         {
            // Routes this applies to
            source: "/api/(.*)",
            // Headers
            headers: [
               // Allow for specific domains to have access or * for all
               {
                  key: "Access-Control-Allow-Origin",
                  value: "*",
                  // DOES NOT WORK
                  // value: process.env.ALLOWED_ORIGIN,
               },
               {
                  key: "Access-Control-Allow-Methods",
                  value: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
               },
               // Allows for specific headers accepted (These are a few standard ones)
               {
                  key: "Access-Control-Allow-Headers",
                  value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
               },
            ],
         },
      ];
   },
   images: {
      domains: ["utfs.io"],
   },
};

export default nextConfig;
