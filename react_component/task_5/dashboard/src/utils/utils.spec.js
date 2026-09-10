import {
    getCurrentYear,
    getFooterCopy,
    getLatestNotification,
} from './utils.js';

describe('getCurrentYear', () => {
    test('return the current year', () => {
        expect(getCurrentYear()).toBe(new Date().getFullYear());
    });
});

describe('getFooterCopy', () => {
    test('returns Holberton School when argument is true', () => {
        expect(getFooterCopy(true)).toBe('Holberton School');
    });

    test('returns Holberton School main dashboard when argument is false', () => {
        expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
    });
});

describe('getLatestNotification', () => {
    test('returns string form', () => {
        expect(getLatestNotification()).toBe(
            '<strong>Urgent requirement</strong> - complete by EOD');
    });
});
