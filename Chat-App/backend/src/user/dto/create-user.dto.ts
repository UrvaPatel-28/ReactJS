import { IsAlphanumeric, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, Matches, MinLength } from "class-validator";


export class CreateUserDto {

    @IsString()
    @MinLength(3, { message: 'Username must have atleast 3 characters.' })
    @IsNotEmpty()
    userName: string;


    @IsNotEmpty()
    @IsStrongPassword({ minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 }, { message: 'Password contains minimum 8 charcaters with 1 lowercase, 1 uppercase, 1 symbol, 1 number' })
    password: string;

    @IsMobilePhone()
    mobileNumber: number;





    //


}
