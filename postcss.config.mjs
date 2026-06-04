const config = process.env.VITEST
    ? { plugins: {} }
    : {
          plugins: {
              "@tailwindcss/postcss": {},
          },
      };

export default config;
