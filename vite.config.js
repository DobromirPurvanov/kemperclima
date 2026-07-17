import { readdirSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { defineConfig } from 'vite';

const htmlEntries = Object.fromEntries(
    readdirSync(import.meta.dirname)
        .filter((file) => file.endsWith('.html'))
        .sort()
        .map((file) => [
            basename(file, '.html'),
            resolve(import.meta.dirname, file)
        ])
);

export default defineConfig({
    appType: 'mpa',
    base: './',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        emptyOutDir: true,
        rolldownOptions: {
            input: htmlEntries
        }
    }
});
