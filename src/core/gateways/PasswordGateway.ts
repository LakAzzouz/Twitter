export interface PasswordGateway {
    hashPassword(password: string, salt: number): string
    compare(password: string, hashedPassword: string): boolean
}