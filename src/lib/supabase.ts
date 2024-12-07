import { SUPABASE_URL, SUPABASE_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import type { User } from "$lib/osuInterfaces";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Setters

export async function setUser(user: User): Promise<boolean> {
    const { error } = await supabase
        .from('users')
        .upsert({ id: user.id, user: user }); // Upsert automatically handles insert/update
    if (error) {
        console.error(`setUser, userId \"${user.id}\": ${error.message}`);
        return false;
    }
    return true;
}

export async function setToken(userId: number, token: string, expiresAt: number): Promise<boolean> {
    const { error } = await supabase.from('tokens').insert({
        userId: userId,
        token,
        expiresAt: expiresAt,
    });
    if (error) {
        console.error(`setToken, userId \"${userId}\": ${error.message}`);
        return false;
    }
    return true;
}

export async function setForm(id: number, form: { name: string; formData: string }): Promise<boolean> {
    const { error } = await supabase
        .from('forms')
        .insert({
            userId: id,
            name: form.name,
            formData: form.formData,
        });

    if (error) {
        console.error(`setForm, userId \"${id}\", form \"${form}\": ${error.message}`);
        return false;
    }
    return true;
}

// Getters

export async function getUser(id: number): Promise<User | null> {
    const { data, error } = await supabase
        .from('users')
        .select('user')
        .eq('id', id)
        .single();
    if (error) {
        console.error(`getUser, userId \"${id}\": ${error.message}`);
        return null;
    }
    if(data === null || data === undefined)
    {
        console.error(`getUser, userId \"${id}\": User not found`);
        return null;
    }
    return JSON.parse(data.user) as User; //data.user as User;
}

export async function getAllUsers(): Promise<{ id: number; user: User }[]> {
    const { data, error } = await supabase.from('users').select('id, user');
    if (error) {
        console.error(`getAllUsers: ${error.message}`);
        return [];
    }
    if (!data) {
        console.error(`getAllUsers: No users found`);
        return [];
    }

    return data.map(({ id, user }) => ({
        id,
        user: JSON.parse(user) as User,
    }));
}

export async function getToken(token: string): Promise<{ userId: number; expiresAt: number } | null> {
    const { data, error } = await supabase
        .from('tokens')
        .select('userId, expiresAt')
        .eq('token', token)
        .single(); // Retrieves only one result

    if (error) {
        console.error(`getToken, token \"${token}\": ${error.message}`);
        return null;
    }

    if (!data)
    {
        console.error(`getToken, token \"${token}\": Token not found`);
        return null;
    }
    
    return data;
}

export async function getAllTokens(): Promise<{ userId: number; token: string; expiresAt: number }[] | null> {
    const { data, error } = await supabase
        .from('tokens')
        .select('userId, token, expiresAt');

    if (error) {
        console.error(`getAllTokens: ${error.message}`);
        return null;
    }

    if (!data) {
        console.error(`getAllTokens: No tokens found`);
        return null;
    }
    return data;
}

export async function getTokens(userId: number): Promise<{ token: string; expiresAt: number }[] | null> {
    const { data, error } = await supabase
        .from('tokens')
        .select('token, expiresAt')
        .eq('userId', userId);

    if (error) {
        console.error(`getTokens, userId \"${userId}\": ${error.message}`);
        return null;
    }

    if (!data) {
        console.error(`getTokens, userId \"${userId}\": No tokens found`);
        return null;
    }
    return data;
}

export async function getForms(): Promise<{ data: number; userId: number; name: string; formData: string }[] | null> {
    const { data, error } = await supabase
        .from('forms')
        .select('created_at, userId, name, formData');

    if (error) {
        console.error(`getForms: ${error.message}`);
        return null;
    }

    if (!data) {
        console.error(`getForms: No forms found`);
        return null;
    }
    return data.map(({ created_at, userId, name, formData }) => ({
        data: new Date(created_at).getTime(),
        userId,
        name,
        formData,
    }));
}

// Removes

export async function removeExpiredTokens(): Promise<void> {
    const now = Date.now();
    const { error } = await supabase.from('tokens').delete().lt('expiresAt', now);
    if (error) {
        console.error(`removeExpiredTokens: ${error.message}`);
    }
}

export async function removeToken(token: string): Promise<boolean> {
    const { error } = await supabase.from('tokens').delete().eq('token', token);
    if (error) {
        console.error(`removeToken, token \"${token}\": ${error.message}`);
        return false;
    }
    return true;
}

export async function removeTokens(id: number): Promise<boolean> {
    const { error } = await supabase
        .from('tokens')
        .delete()
        .eq('userId', id); // Matches all tokens for the user

    if (error) {
        console.error(`removeTokens, userId \"${id}\": ${error.message}`);
        return false;
    }
    return true;
}

export async function removeUser(id: number): Promise<boolean> {
    const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id); // Deletes the user by ID

    if (error) {
        console.error(`removeUser, userId \"${id}\": ${error.message}`);
        return false;
    }
    return true;
}

// Others

export async function generateToken(): Promise<string | null> {
    const maxAttempts = 10;
    for (let attempts = 0; attempts < maxAttempts; attempts++) {
        const token = crypto.randomUUID();

        const tokenInfo = await getToken(token);
        if (tokenInfo) continue;
        return token;
    }
    console.error('generateToken: Failed to generate a unique token.');
    return null;
}