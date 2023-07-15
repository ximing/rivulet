import path from 'path';
import { fileURLToPath } from 'url';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { defineConfig } from 'rollup';
// import terser from '@rollup/plugin-terser';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const input = path.join(__dirname, '/src/index.ts');

const esmConfig = defineConfig({
  input,
  output: {
    format: 'es',
    file: 'dist/index.mjs',
    minifyInternalExports: true,
  },
  // plugins 需要注意引用顺序
  plugins: [
    // 使得 rollup 支持 commonjs 规范，识别 commonjs 规范的依赖
    commonjs(),
    resolve(),
    typescript({
      tsconfig: path.resolve(__dirname, './tsconfig.json'),
      target: 'ESNEXT',
    }),
    // terser(),
  ],
});

const cjsConfig = defineConfig({
  input,
  output: {
    format: 'cjs',
    file: 'dist/index.cjs',
  },
  // plugins 需要注意引用顺序
  plugins: [
    // 使得 rollup 支持 commonjs 规范，识别 commonjs 规范的依赖
    commonjs(),
    resolve(),
    typescript({
      tsconfig: path.resolve(__dirname, './tsconfig.json'),
    }),
    // terser(),
  ],
});

export default defineConfig([esmConfig, cjsConfig]);
