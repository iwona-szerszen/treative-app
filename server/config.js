const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/treative-app',
  port: process.env.PORT || 8000,
};

export default config;
