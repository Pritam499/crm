module.exports = {
  apps: [
    {
      name: 'qicpic-api',
      script: 'server.js',
      instances: 1, // Run only one instance of the app
      exec_mode: 'fork', // You can use "cluster" if you want to enable clustering
      env: {
        NODE_ENV: 'production',
      },
      watch: false, // Set to true if you want PM2 to watch files and restart on changes
      autorestart: true, // Automatically restart the app if it crashes
      max_memory_restart: '2G', // Restart the app if it exceeds 2 GB memory usage
      exp_backoff_restart_delay: 100,
      log_date_format: 'YYYY-MM-DD HH:mm Z', // Date format for log entries
      listen_timeout: 7200000,  // 2 hours
      kill_timeout: 7200000,     // 2 hours
      max_restarts: 10, // Maximum number of restarts within a 1 hour window
      restart_delay: 1000, // Restart delay in milliseconds
    },
  ],
};
