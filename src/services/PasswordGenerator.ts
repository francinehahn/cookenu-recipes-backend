export class PasswordGenerator {
    generatePassword = () => {
        return Math.random().toString(36).slice(-10)
    }
}