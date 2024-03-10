import { resolve } from 'path'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

export default {
    root: 'src/',
    publicDir: '../static/',
    base: './',
    server:
    {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    build: 
    {
        outDir, //build output should stay the dist folder
        emptyOutDir: true, //since it's outside project root, have to tell vite it's ok to clear this folder
        rollupOptions: {
          input: {
            main: resolve(root, './index.html'),
            home_2: resolve(root, 'home_2', './index_11.html'),
            lesson_12: resolve(root, 'lesson_12', './index_12.html'),
            lesson_14: resolve(root, 'lesson_14', './index_14.html'),
            lesson_15: resolve(root, 'lesson_15', './index_15.html'),
            lesson_16: resolve(root, 'lesson_16', './index_16.html'),
            lesson_17: resolve(root, 'lesson_17', './index_17.html'),
            lesson_18: resolve(root, 'lesson_18', './index_18.html'),
            lesson_19: resolve(root, 'lesson_19', './index_19.html')
            // ...
            // List all files you want in your build
          }
        }
    },
    // build:
    // {
    //     outDir: '../dist', // Output in the dist/ folder
    //     emptyOutDir: true, // Empty the folder first
    //     sourcemap: true // Add sourcemap
    // },
}