import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      include: [
        /\.vue\??/, // .vue
        /\.ts\??/, // .vue
      ],
      resolvers: [
        IconsResolver({
          customCollections: ['my-icons'],
          prefix: 'i',
        }),
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    Icons({
      autoInstall: true,
      customCollections: {
        'my-icons': FileSystemIconLoader('./src/assets'),
      },
    }),
    WindiCSS({
      config: {
        plugins: [require('@windicss/plugin-scrollbar')],
      },
    }),
  ],
  build: {
    rollupOptions: {
      external: ['vue', 'coya-core', 'coya-util', '@vueuse/core'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          'vue': 'Vue',
          'coya-core': 'coya-core',
        },
        format: 'es',
      },
    },
    sourcemap: true,
    lib: {
      entry: path.join(__dirname, '/src/libMain.ts'),
      name: 'coya-editor',
      fileName: format => `coya-editor.${format}.js`,
      formats: ['es'],
    },
  },
})
