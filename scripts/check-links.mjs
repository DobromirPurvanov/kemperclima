import {
    existsSync,
    readFileSync,
    readdirSync,
    statSync
} from 'node:fs';
import {
    dirname,
    join,
    relative,
    resolve,
    sep
} from 'node:path';

const projectRoot = process.cwd();
const root = resolve(projectRoot, process.argv[2] ?? '.');

if (!existsSync(root) || !statSync(root).isDirectory()) {
    console.error(`Site directory does not exist: ${relative(projectRoot, root) || '.'}`);
    process.exit(1);
}

const htmlFiles = readdirSync(root)
    .filter((file) => file.endsWith('.html'))
    .sort();

if (htmlFiles.length === 0) {
    console.error(`No HTML files found in: ${relative(projectRoot, root) || '.'}`);
    process.exit(1);
}

if (root !== projectRoot) {
    const sourceHtmlFiles = readdirSync(projectRoot)
        .filter((file) => file.endsWith('.html'))
        .sort();
    const missingPages = sourceHtmlFiles.filter((file) => !htmlFiles.includes(file));

    if (missingPages.length > 0) {
        console.error('HTML entry points missing from production output:');
        missingPages.forEach((file) => console.error(`- ${file}`));
        process.exit(1);
    }
}

const failures = [];
const attributePattern = /\b(?:href|src)\s*=\s*(["'])(.*?)\1/gi;

for (const htmlFile of htmlFiles) {
    const sourcePath = join(root, htmlFile);
    const source = readFileSync(sourcePath, 'utf8');

    for (const match of source.matchAll(attributePattern)) {
        const rawTarget = match[2].trim();

        if (
            !rawTarget ||
            rawTarget.startsWith('#') ||
            rawTarget.startsWith('//') ||
            /^[a-z][a-z\d+.-]*:/i.test(rawTarget)
        ) {
            continue;
        }

        const targetWithoutQuery = rawTarget.replace(/[?#].*$/, '');
        if (!targetWithoutQuery) {
            continue;
        }

        const line = source.slice(0, match.index).split('\n').length;
        let decodedTarget;

        try {
            decodedTarget = decodeURIComponent(targetWithoutQuery);
        } catch {
            failures.push(`${htmlFile}:${line} has malformed URL encoding: ${rawTarget}`);
            continue;
        }

        let targetPath = decodedTarget.startsWith('/')
            ? resolve(root, `.${decodedTarget}`)
            : resolve(dirname(sourcePath), decodedTarget);

        if (targetPath !== root && !targetPath.startsWith(`${root}${sep}`)) {
            failures.push(`${htmlFile}:${line} points outside the site root: ${rawTarget}`);
            continue;
        }

        if (existsSync(targetPath) && statSync(targetPath).isDirectory()) {
            targetPath = join(targetPath, 'index.html');
        }

        if (!existsSync(targetPath)) {
            // Vite serves files from public/ at the site root and copies them into dist/,
            // so a source-mode check must also look there.
            const publicCandidate = resolve(projectRoot, 'public', relative(root, targetPath));
            if (root === projectRoot && existsSync(publicCandidate)) {
                continue;
            }
            failures.push(
                `${htmlFile}:${line} -> ${relative(root, targetPath)} (from ${rawTarget})`
            );
        }
    }
}

if (failures.length > 0) {
    console.error('Broken internal links found:');
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
}

console.log(
    `Checked ${htmlFiles.length} HTML files in ${relative(projectRoot, root) || '.'}: all internal links exist.`
);
