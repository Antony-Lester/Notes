import * as fs from 'fs';
import * as path from 'path';

const allowedStandards = ['c11', 'c99', 'c89'];

function checkMakefileForStandard(makefilePath: string): void {
    if (!fs.existsSync(makefilePath)) {
        console.error(`Rule 3: Makefile not found at path: ${makefilePath}`);
        return;
    }

    const makefileContent = fs.readFileSync(makefilePath, 'utf-8');
    const stdFlagMatch = makefileContent.match(/-std=([a-zA-Z0-9]+)/);

    if (!stdFlagMatch) {
        console.error('Rule 3: Makefile is missing the -std flag.');
        return;
    }

    const stdValue = stdFlagMatch[1];
    if (!allowedStandards.includes(stdValue)) {
        console.error(`Rule 3: Makefile is using a non-standard dialect: -std=${stdValue}. Please use one of the following standards: ${allowedStandards.join(', ')}.`);
    } else {
        console.log('Rule 3: Makefile complies with the standard requirement.');
    }
}

// Example usage:
const makefilePath = path.join(__dirname, 'Makefile');
checkMakefileForStandard(makefilePath);