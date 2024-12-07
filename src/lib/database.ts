import type { User } from "$lib/osuInterfaces";
import Database from 'better-sqlite3';

const database = new Database("app.db");

export default database;

// Initialize

export function initialize() {
    // Create users table
    database.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,                                            
            user TEXT                                                          
        );
    `);

    // Create tokens table
    database.exec(`
        CREATE TABLE IF NOT EXISTS tokens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,                              
            userId INTEGER NOT NULL,                                           
            token TEXT NOT NULL,                                               
            expiresAt INTEGER NOT NULL,                                        
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
        );
    `);

    // Create forms table
    database.exec(`
        CREATE TABLE IF NOT EXISTS forms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,         
            userId INTEGER NOT NULL,
            date INTEGER NOT NULL,
            name TEXT NOT NULL,
            formData TEXT NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
        );
    `);
}

// Setters

export function setUser(user: User): boolean {
    const userInfo = JSON.stringify(user);

    // Insert user information into the database
    const userStatement = database.prepare(`
        INSERT INTO users (id, user)
        VALUES (?, ?)
        ON CONFLICT(id) DO UPDATE SET
            user = excluded.user
    `);

    try {
        userStatement.run(user.id, userInfo);
        return true;
    } catch (ex) {
        console.error(`saveUserInfo, userId \"${user.id}\": \"${ex}\"`);
        return false;
    }
}

export function setToken(id: number, token: string, expiresAt: number): boolean {
    // Insert token information
    const tokenStatement = database.prepare(`
        INSERT INTO tokens (userId, token, expiresAt)
        VALUES (?, ?, ?)
        `);

    try {
        tokenStatement.run(id, token, expiresAt);
        return true;
    } catch (ex) {
        console.error(`saveUserToken, userId \"${id}\": \"${ex}\"`);
        return false;
    }
}

// Getters

export function getUser(id: number): User | null {
    const statement = database.prepare("SELECT user FROM users WHERE id = ?");

    try {
        const response = statement.get(id) as { user: string };
        return JSON.parse(response.user);

    } catch (ex) {
        console.error(`getUser, userId \"${id}\": \"${ex}\"`);
    }
    return null;
}

export function getAllUsers(): {id: number, user: User}[] {
    const statement = database.prepare("SELECT id, user FROM users");

    let users: {id: number, user: User}[];
    try {
        users = statement.all() as {id: number, user: User}[];
    } catch (ex) {
        console.error(`getUsers: \"${ex}\"`);
        return [];
    }
    return users;
}

export function getToken(token: string): { userId: number, expiresAt: number } | null {
    const statement = database.prepare("SELECT userId, expiresAt FROM tokens WHERE token = ?");

    try {
        const response = statement.get(token) as { userId: number, expiresAt: number };
        if (!response) return null;
        return response;
    } catch (ex) {
        console.error(`getId, token \"${token}\": \"${ex}\"`);
    }
    return null;
}

export function getAllTokens(): { userId: number, token: string, expiresAt: number }[] | null {
    const statement = database.prepare(`
        SELECT userId, token, expiresAt 
        FROM tokens
    `);

    let tokens: { userId: number, token: string, expiresAt: number }[];
    try {
        tokens = statement.all() as { userId: number, token: string, expiresAt: number }[];
        if (!tokens) return null;
    } catch (ex) {
        console.error(`getUserTokens: \"${ex}\"`);
        return null;
    }
    return tokens;
}

export function getTokens(userId: number): { token: string, expiresAt: number }[] | null {
    const statement = database.prepare(`
        SELECT token, expiresAt 
        FROM tokens 
        WHERE userId = ?
    `);

    let tokens: { token: string, expiresAt: number }[];
    try {
        tokens = statement.all(userId) as { token: string, expiresAt: number }[];
        if (!tokens) return null;
    } catch (ex) {
        console.error(`getUserTokens, userId \"${userId}\": \"${ex}\"`);
        return null;
    }
    return tokens;
}

// Removes

export function removeExpiredTokens(): void {
    const now = Date.now();
    const statement = database.prepare("DELETE FROM tokens WHERE expiresAt < ?");

    try {
        statement.run(now);
    } catch (ex) {
        console.error(`removeExpiredTokens: \"${ex}\"`);
    }
}

export function removeToken(token: string): boolean {
    const statement = database.prepare("DELETE FROM tokens WHERE token = ?");

    try {
        statement.run(token);
        return true;
    } catch (ex) {
        console.error(`removeToken, token \"${token}\": \"${ex}\"`);
        return false;
    }
}

export function removeTokens(id: number): boolean {
    const statement = database.prepare("DELETE FROM tokens WHERE userId = ?");

    try {
        statement.run(id);
        return true;
    } catch (ex) {
        console.error(`removeTokens, userId \"${id}\": \"${ex}\"`);
        return false;
    }
}

export function removeUser(id: number): boolean {
    const statement = database.prepare("DELETE FROM users WHERE id = ?");

    try {
        statement.run(id);
        return true;
    } catch (ex) {
        console.error(`removeUser, userId \"${id}\": \"${ex}\"`);
        return false;
    }
}

// Others

export function generateToken(): string | null {
    const maxAttempts = 10;

    for (let attempts = 0; attempts < maxAttempts; attempts++) {
        const token = crypto.randomUUID();

        // Check for uniqueness
        const tokenInfo: { userId: number, expiresAt: number } | null = getToken(token);
        if (tokenInfo) continue; // Token already exists
        
        return token;
    }

    console.error("generateToken: Failed to generate a unique token.");
    return null;
}

export function setForm(id: number, form: { name: string, formData: string }): boolean {
    const statement = database.prepare(`
        INSERT INTO forms (userId, name, date, formData)
        VALUES (?, ?, ?, ?)
    `);

    try {
        statement.run(id, form.name, Date.now(), form.formData);
        return true;
    } catch (ex) {
        console.error(`setForm, userId \"${id}\", form \"${form}\": \"${ex}\"`);
        return false;
    }
}

export function getForms(): { userId: number, name: string, date: number, formData: string }[] | null {
    const statement = database.prepare(`
        SELECT userId, name, date, formData 
        FROM forms
    `);

    let forms: { userId: number, name: string, date: number, formData: string }[];
    try {
        forms = statement.all() as { userId: number, name: string, date: number, formData: string }[];
        if (!forms) return null;
    } catch (ex) {
        console.error(`getForms: \"${ex}\"`);
        return null;
    }
    return forms;
}