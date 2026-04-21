export interface CsvParseResult {
    headers: string[];
    rows: Record<string, string>[];
}

function parseLine(line: string) {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"' && inQuotes && nextChar === '"') {
            current += '"';
            i += 1;
            continue;
        }

        if (char === '"') {
            inQuotes = !inQuotes;
            continue;
        }

        if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
            continue;
        }

        current += char;
    }

    result.push(current.trim());
    return result;
}

export function parseCsv(text: string): CsvParseResult {
    const lines = text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    if (lines.length === 0) {
        return { headers: [], rows: [] };
    }

    const headers = parseLine(lines[0]);
    const rows = lines.slice(1).map((line) => {
        const values = parseLine(line);
        return headers.reduce<Record<string, string>>((acc, header, index) => {
            acc[header] = values[index] ?? '';
            return acc;
        }, {});
    });

    return { headers, rows };
}
