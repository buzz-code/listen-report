module.exports = {
  apps: [
    {
      name: 'listen-report',
      script: './index.js',
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
