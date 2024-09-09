import * as fs from 'fs';
import * as path from 'path';

const requiredFlags = [
    '-Wall', '-Wextra', '-Wpedantic', '-Wformat=2', '-Wno-unused-parameter',
    '-Wshadow', '-Wwrite-strings', '-Wstrict-prototypes', '-Wold-style-definition',
    '-Wredundant-decls', '-Wnested-externs', '-Wmissing-include-dirs', '-O2'
];

const gccSpecificFlags = ['-Wjump-misses-init', '-Wlogical-op'];

function checkMakefileCompliance(makefilePath: string): void {
    if (!fs.existsSync(makefilePath)) {
        console.error(`Rule 1: Makefile not found at path: ${makefilePath}`);
        return;
    }

    const makefileContent = fs.readFileSync(makefilePath, 'utf-8');
    const missingFlags = requiredFlags.filter(flag => !makefileContent.includes(flag));

    if (makefileContent.includes('$(CC),gcc')) {
        missingFlags.push(...gccSpecificFlags.filter(flag => !makefileContent.includes(flag)));
    }

    if (missingFlags.length > 0) {
        console.error(`Rule 1: Makefile is missing the following required flags: ${missingFlags.join(', ')}`);
    } else {
        console.log('Rule 1: Makefile complies with all required flags.');
    }
}

// Example usage:
const makefilePath = path.join(__dirname, 'Makefile');
checkMakefileCompliance(makefilePath);