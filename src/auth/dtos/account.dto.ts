import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, isNumber, IsNumberString } from "class-validator";

export abstract class AccountSetupDto {

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsNumberString()
    otp: string;
}