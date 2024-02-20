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