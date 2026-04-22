// Strict RU phone utilities.
// Canonical format: +7XXXXXXXXXX (11 digits including leading 7).
// Display format:   +7 (XXX) XXX-XX-XX

export function digitsOnly(input: string): string {
    return input.replace(/\D/g, '');
}

/** Normalize any user input to canonical +7XXXXXXXXXX or return null if it's not a valid RU number. */
export function normalizeRuPhone(input: string): string | null {
    let d = digitsOnly(input);
    if (d.length === 11 && d.startsWith('8')) d = '7' + d.slice(1);
    if (d.length === 10) d = '7' + d;
    if (d.length !== 11 || !d.startsWith('7')) return null;
    return '+' + d;
}

export function isValidRuPhone(input: string): boolean {
    return normalizeRuPhone(input) !== null;
}

/** Format partial or full input as +7 (XXX) XXX-XX-XX while typing. */
export function formatRuPhoneInput(input: string): string {
    let d = digitsOnly(input);
    if (d.length === 0) return '';
    if (d.startsWith('8')) d = '7' + d.slice(1);
    if (!d.startsWith('7')) d = '7' + d;
    d = d.slice(0, 11); // cap to 11 digits

    const rest = d.slice(1); // after leading 7
    let out = '+7';
    if (rest.length > 0) out += ' (' + rest.slice(0, 3);
    if (rest.length >= 3) out += ')';
    if (rest.length > 3) out += ' ' + rest.slice(3, 6);
    if (rest.length > 6) out += '-' + rest.slice(6, 8);
    if (rest.length > 8) out += '-' + rest.slice(8, 10);
    return out;
}
