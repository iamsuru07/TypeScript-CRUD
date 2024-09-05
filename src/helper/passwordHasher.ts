import bcrypt from 'bcrypt';

export const passwordHasher = async (password: string): Promise<string> => {
    const hashedPassword: string = await bcrypt.hash(password, 10)
    return hashedPassword;
}

export const passwordMatcher = async (password: string, hashedPassword: string): Promise<boolean> => {
    const result = await bcrypt.compare(password,hashedPassword);
    return result;
}