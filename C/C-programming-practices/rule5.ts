import * as fs from 'fs';
import * as path from 'path';

const MAX_LINE_LENGTH = 79;

function breakLine(line: string): string[] {
    const breakPoints = [' ', ',', '&&', '||', '+', '-', '*', '/', '%', '=', '(', ')', '[', ']', '{', '}', ';'];
    let breakIndex = -1;

    for (let i = MAX_LINE_LENGTH; i > 0; i--) {
        if (breakPoints.includes(line[i])) {
            breakIndex = i;
            break;
        }
    }

    if (breakIndex === -1) {
        return [line]; // Can't break the line
    }

    const firstPart = line.substring(0, breakIndex + 1).trim();
    const secondPart = line.substring(breakIndex + 1).trim();

    return [firstPart, secondPart];
}

function checkAndFixLineLength(filePath: string): void {
    if (!fs.existsSync(filePath)) {
        console.error(`Rule 5: File not found: ${filePath}`);
        return;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');
    let fixedLines: string[] = [];
    let fixed = true;

    lines.forEach(line => {
        if (line.length > MAX_LINE_LENGTH) {
            const brokenLines = breakLine(line);
            if (brokenLines.length === 1) {
                console.error(`Rule 5: Cannot fix line in file: ${filePath}. Line: ${line}`);
                fixed = false;
                return;
            }
            fixedLines.push(...brokenLines);
        } else {
            fixedLines.push(line);
        }
    });

    if (fixed) {
        fs.writeFileSync(filePath, fixedLines.join('\n'), 'utf-8');
        console.log(`Rule 5: Fixed long lines in file: ${filePath}`);
    }
}

function checkAndFixLineLengthsInProject(directoryPath: string): void {
    if (!fs.existsSync(directoryPath)) {
        console.error(`Rule 5: Directory not found: ${directoryPath}`);
        return;
    }

    const files = fs.readdirSync(directoryPath);
    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            checkAndFixLineLengthsInProject(filePath); // Recursively check subdirectories
        } else if (file.endsWith('.c') || file.endsWith('.h')) {
            checkAndFixLineLength(filePath);
        }
    });
}

// Example usage:
const projectPath = path.join(__dirname, 'your-c-project-directory');
checkAndFixLineLengthsInProject(projectPath);