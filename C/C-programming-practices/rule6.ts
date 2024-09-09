import * as fs from 'fs';
import * as path from 'path';

function convertBlockCommentsToLineComments(filePath: string): void {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');
    let fixedLines: string[] = [];
    let insideBlockComment = false;
    let fixed = true;

    lines.forEach(line => {
        if (insideBlockComment) {
            if (line.includes('*/')) {
                insideBlockComment = false;
                fixedLines.push(line.replace('*/', '').trim());
            } else {
                fixedLines.push('// ' + line.trim());
            }
        } else if (line.includes('/*')) {
            if (line.includes('*/')) {
                fixedLines.push(line.replace('/*', '//').replace('*/', '').trim());
            } else {
                insideBlockComment = true;
                fixedLines.push(line.replace('/*', '//').trim());
            }
        } else {
            fixedLines.push(line);
        }
    });

    if (insideBlockComment) {
        console.error(`Rule 6: Unclosed block comment in file: ${filePath}`);
        fixed = false;
    }

    if (fixed) {
        fs.writeFileSync(filePath, fixedLines.join('\n'), 'utf-8');
        console.log(`Rule 6: Fixed block comments in file: ${filePath}`);
    }
}

function checkAndFixCommentsInProject(directoryPath: string): void {
    if (!fs.existsSync(directoryPath)) {
        console.error(`Rule 6: Directory not found: ${directoryPath}`);
        return;
    }

    const files = fs.readdirSync(directoryPath);
    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            checkAndFixCommentsInProject(filePath); // Recursively check subdirectories
        } else if (file.endsWith('.c') || file.endsWith('.h')) {
            convertBlockCommentsToLineComments(filePath);
        }
    });
}

// Example usage:
const projectPath = path.join(__dirname, 'your-c-project-directory');
checkAndFixCommentsInProject(projectPath);