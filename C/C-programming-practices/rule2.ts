import * as fs from 'fs';
import * as path from 'path';

const requiredRules = [
    'depfiles = $(objects:.o=.d)',
    '%.dep.mk: %.c',
    '$(CC) -M -MP -MT \'$(<:.c=.o) $@\' $(CPPFLAGS) $< > $@',
    '-include $(depfiles)'
];

function checkMakefileForDependencyRule(makefilePath: string): void {
    if (!fs.existsSync(makefilePath)) {
        console.error(`Rule 2: Makefile not found at path: ${makefilePath}`);
        return;
    }

    const makefileContent = fs.readFileSync(makefilePath, 'utf-8');
    const missingRules = requiredRules.filter(rule => !makefileContent.includes(rule));

    if (missingRules.length > 0) {
        console.error(`Rule 2: Makefile is missing the following required rules for automatic dependency generation: ${missingRules.join(', ')}`);
    } else {
        console.log('Rule 2: Makefile complies with the required rules for automatic dependency generation.');
    }
}

// Example usage:
const makefilePath = path.join(__dirname, 'Makefile');
checkMakefileForDependencyRule(makefilePath);