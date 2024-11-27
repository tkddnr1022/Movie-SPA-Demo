import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getApiKey, getCachedData, setCachedData, getSession, setSession, removeSession } from '@/scripts/utils/storage';
import type User from '@/scripts/interfaces/user';

describe('Cache Utils', () => {
    // Mock for localStorage and sessionStorage
    beforeEach(() => {
        // Clear mocks before each test
        vi.clearAllMocks();

        // Mock sessionStorage and localStorage
        globalThis.localStorage = {
            getItem: vi.fn(),
            setItem: vi.fn(),
            removeItem: vi.fn(),
        } as unknown as Storage;
        globalThis.sessionStorage = {
            getItem: vi.fn(),
            setItem: vi.fn(),
            removeItem: vi.fn(),
        } as unknown as Storage;
    });

    it('getApiKey should return apiKey from sessionStorage if user is found', () => {
        const mockUser: User = { apiKey: 'mock-api-key' } as User;
        globalThis.sessionStorage.getItem = vi.fn(() => JSON.stringify(mockUser));

        const apiKey = getApiKey();

        expect(apiKey).toBe('mock-api-key');
    });

    it('getCachedData should return cached data if not expired', () => {
        const mockCache = {
            data: { someKey: 'someValue' },
            expiresIn: Date.now() + 100000, // Set expiration in the future
        };
        globalThis.localStorage.getItem = vi.fn(() => JSON.stringify(mockCache));

        const cache = getCachedData('someData');
        expect(cache).toEqual(mockCache);
    });

    it('getCachedData should remove expired cache', () => {
        const mockCache = {
            data: { someKey: 'someValue' },
            expiresIn: Date.now() - 100000, // Set expiration in the past
        };
        globalThis.localStorage.getItem = vi.fn(() => JSON.stringify(mockCache));
        globalThis.localStorage.removeItem = vi.fn();

        const cache = getCachedData('someData');
        expect(globalThis.localStorage.removeItem).toHaveBeenCalledWith('someData');
        expect(cache).toBeUndefined();
    });

    it('setCachedData should store data in localStorage with expiration', () => {
        const mockData = { someKey: 'someValue' };

        setCachedData('someData', mockData);

        expect(globalThis.localStorage.setItem).toHaveBeenCalledWith(
            'someData',
            expect.stringContaining('"expiresIn":')
        );
    });

    it('getSession should return user from sessionStorage or localStorage', () => {
        const mockUser: User = { apiKey: 'mock-api-key' } as User;
        globalThis.sessionStorage.getItem = vi.fn(() => null);
        globalThis.localStorage.getItem = vi.fn(() => JSON.stringify(mockUser));
        globalThis.sessionStorage.setItem = vi.fn();

        const session = getSession();

        expect(session).toEqual(mockUser);
        expect(globalThis.sessionStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
    });

    it('setSession should store user in sessionStorage and localStorage when rememberMe is true', () => {
        const mockUser: User = { apiKey: 'mock-api-key' } as User;
        setSession(mockUser, true);

        expect(globalThis.sessionStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
        expect(globalThis.localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
    });

    it('setSession should store user only in sessionStorage when rememberMe is false', () => {
        const mockUser: User = { apiKey: 'mock-api-key' } as User;
        setSession(mockUser);

        expect(globalThis.sessionStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
        expect(globalThis.localStorage.setItem).not.toHaveBeenCalled();
    });

    it('removeSession should remove user from sessionStorage and localStorage', () => {
        removeSession();

        expect(globalThis.sessionStorage.removeItem).toHaveBeenCalledWith('user');
        expect(globalThis.localStorage.removeItem).toHaveBeenCalledWith('user');
    });
});
