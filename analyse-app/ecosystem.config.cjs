module.exports = {
  apps: [
    {
      name: 'provoid-analyse',
      script: 'server/index.js',
      cwd: '/var/www/provoid-analyse',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
        CORS_ORIGINS: 'https://provoid.de'
      },
      error_file: '/var/log/pm2/provoid-analyse-error.log',
      out_file: '/var/log/pm2/provoid-analyse-out.log',
      time: true,
      watch: false,
      max_memory_restart: '200M'
    },
    {
      name: 'provoid-website',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/provoid-website',
      instances: 1,
      exec_mode: 'fork',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/pm2/provoid-website-error.log',
      out_file: '/var/log/pm2/provoid-website-out.log',
      time: true,
      watch: false,
      max_memory_restart: '300M'
    }
  ]
};
