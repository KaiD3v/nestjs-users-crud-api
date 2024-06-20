import { IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Rule } from "src/enums/rule.enum";

export class CreateUserDTO {

    @IsString({message: "O Nome deve ser uma string."})
    name: string;

    @IsEmail({}, 
        {
            message: "Insira um E-mail válido!"
        })
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minUppercase: 0,
        minLowercase: 0,
        minSymbols: 0,
    }, 
    {
        message: "A senha deve conter ao menos 6 caracteres"
    })
        
    password: string;

    @IsOptional()
    @IsEnum(Rule)
    rule: number
}