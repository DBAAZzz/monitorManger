import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command, mode }) => {
  console.log('command', command)
  return {
    server: {
      host: '0.0.0.0',
      port: 8080,
      open: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3000',
          secure: true, // 如果是https接口，需要配置这个参数
          changeOrigin: true,
          rewrite: (path) => {
            return path.replace(/^\/api/, '')
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@types': path.resolve(__dirname, 'src/types/index.ts'),
        '@api': path.resolve(__dirname, 'src/api')
      }
    },
    base: './',
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/styles/main.scss";`
        }
      }
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: ['./index.html'],
        output: {
          chunkFileNames: (chunkInfo: any) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []
            const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
            return `assets/js/${fileName}.[hash].js`
          },
          entryFileNames: 'assets/js/[name].[hash].js',
          assetFileNames: 'assets/[ext]/[name].[hash].[ext]'
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      viteMockServe({
        mockPath: './mock',
        supportTs: true,
        localEnabled: command === 'serve',
        prodEnabled: false
      }),
    ]
  }
})
