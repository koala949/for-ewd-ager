export default {
  define: {
    'process.env.BUILD_TIME': new Date().getTime(),
    'process.env.API_HOST': '',
    'process.env.CLIENT_ID': 'localhost',
    'process.env.CLIENT_SECRET': 'localhost',
  },
};
