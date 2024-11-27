import type User from "../interfaces/user";

export function getApiKey() {
    const session = sessionStorage.getItem('user');
    if (session) {
        const user: User = JSON.parse(session);
        return user.apiKey;
    }
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