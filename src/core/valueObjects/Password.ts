export class Password {
    value: string

    constructor(value: string){
        this.value = value
    }

    static passwordLength(value: string): string{
        if(value.length < 5){
            throw new Error("The password was too short")
        }
        if(value.length > 11){
            throw new Error("The password was too long")
        }
        return value
    }
}