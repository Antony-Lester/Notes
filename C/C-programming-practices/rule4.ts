import * as fs from 'fs';
import * as path from 'path';

const tabRegex = /\t/g;
const spaces = '    '; // 4 spaces

function checkAndFixTabsInFile(filePath: string): void {
    if (!fs.existsSync(filePath)) {
        console.error(`Rule 4: File not found: ${filePath}`);
        return;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    if (tabRegex.test(fileContent)) {
        const fixedContent = fileContent.replace(tabRegex, spaces);
        try {
            fs.writeFileSync(filePath, fixedContent, 'utf-8');
            console.log(`Rule 4: Fixed tabs in file: ${filePath}`);
        } catch (error) {
            console.error(`Rule 4: Could not fix tabs in file: ${filePath}. Error: ${error.message}`);
        }
    } 
}

function checkAndFixTabsInProject(directoryPath: string): void {
    if (!fs.existsSync(directoryPath)) {
        console.error(`Rule 4: Directory not found: ${directoryPath}`);
        return;
    }

    const files = fs.readdirSync(directoryPath);
    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            checkAndFixTabsInProject(filePath); // Recursively check subdirectories
        } else if (file.endsWith('.c') || file.endsWith('.h')) {
            checkAndFixTabsInFile(filePath);
        }
    });
}

// Example usage:
const projectPath = path.join(__dirname, 'your-c-project-directory');
checkAndFixTabsInProject(projectPath);