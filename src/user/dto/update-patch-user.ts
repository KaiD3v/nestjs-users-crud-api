import { IsEmail, IsString, IsStrongPassword } from "class-validator";
import { CreateUserDTO } from "./create-user.dto";

export class UpdatePatchUserDTO extends CreateUserDTO {}