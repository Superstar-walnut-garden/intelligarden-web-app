import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return{
    plugins: [React()],
    server: {
      proxy: mode === 'development' ? {
        '/api/': {
          target: 'http://192.168.1.185/', // esp32 hotspot server ip
          changeOrigin: true,
          secure: false,
        },
      } : undefined,
    },
  };
});
