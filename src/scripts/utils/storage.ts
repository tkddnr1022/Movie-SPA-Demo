import type { CachedData } from "../interfaces/cache";
import type User from "../interfaces/user";

const CACHE_EXPIRES_IN = import.meta.env.VITE_CACHE_EXPIRES_IN;

export function getApiKey() {
    const session = sessionStorage.getItem('user');
    if (session) {
        const user: User = JSON.parse(session);
        return user.apiKey;
    }
}

export function getCachedData(name: string) {
    const dataStr = localStorage.getItem(name);
    if (dataStr) {
        const cache: CachedData = JSON.parse(dataStr);
        if (cache.expiresIn < Date.now()) {
            localStorage.removeItem(name);
            return;
        }
        return cache;
    }
}

export function setCachedData(name: string, data: Object) {
    const cache: CachedData = {
        data: data,
        expiresIn: Date.now() + Number(CACHE_EXPIRES_IN),
    }
    localStorage.setItem(name, JSON.stringify(cache));
}

export function getSession() {
    const session = sessionStorage.getItem('user');
    if (session) {
        const user: User = JSON.parse(session);
        return user;
    }
    const autoSession = localStorage.getItem('user');
    if (autoSession) {
        sessionStorage.setItem('user', autoSession);
        const user: User = JSON.parse(autoSession);
        return user;
    }
}

export function setSession(user: User, rememberMe = false) {
    sessionStorage.setItem('user', JSON.stringify(user));
    if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(user));
    }
}

export function removeSession() {
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
}