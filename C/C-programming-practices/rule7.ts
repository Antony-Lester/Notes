import * as fs from 'fs';
import * as path from 'path';

const britishToAmerican: { [key: string]: string } = {
    'colour': 'color',
    'flavour': 'flavor',
    'centre': 'center',
    'metre': 'meter',
    'neighbour': 'neighbor',
    'defence': 'defense',
    'burnt': 'burned',
    // Add more mappings as needed
};

function replaceBritishWithAmerican(content: string): string {
    let modifiedContent = content;
    for (const [british, american] of Object.entries(britishToAmerican)) {
        const regex = new RegExp(`\\b${british}\\b`, 'g');
        modifiedContent = modifiedContent.replace(regex, american);
    }
    return modifiedContent;
}

function checkAndFixSpellingInFile(filePath: string): void {
    if (!fs.existsSync(filePath)) {
        console.error(`Rule 7: File not found: ${filePath}`);
        return;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const modifiedContent = replaceBritishWithAmerican(fileContent);

    if (fileContent !== modifiedContent) {
        try {
            fs.writeFileSync(filePath, modifiedContent, 'utf-8');
            console.log(`Rule 7: Fixed British English spellings in file: ${filePath}`);
        } catch (error) {
            console.error(`Rule 7: Could not fix spellings in file: ${filePath}. Error: ${error.message}`);
        }
    } 
}

function checkAndFixSpellingInProject(directoryPath: string): void {
    if (!fs.existsSync(directoryPath)) {
        console.error(`Rule 7: Directory not found: ${directoryPath}`);
        return;
    }

    const files = fs.readdirSync(directoryPath);
    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            checkAndFixSpellingInProject(filePath); // Recursively check subdirectories
        } else if (file.endsWith('.c') || file.endsWith('.h')) {
            checkAndFixSpellingInFile(filePath);
        }
    });
}

// Example usage:
const projectPath = path.join(__dirname, 'your-c-project-directory');
checkAndFixSpellingInProject(projectPath);