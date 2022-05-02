const withTM = require('next-transpile-modules')([
  '@stripe/firestore-stripe-payments',
]) // pass the modules you want to transpile

// /** @type {import('next').NextConfig} */

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['images.tmdb.org', 'image.tmdb.org', 'rb.gy'],
  },
})
