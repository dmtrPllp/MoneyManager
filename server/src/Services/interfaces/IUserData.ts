import { UserLoginDto } from "../../controllers/dto/user-login-dto";
import { UserRegisterDto } from "../../controllers/dto/user-reg-dto";
import { UserDto } from "../../controllers/dto/UserDto";

export interface IUserData{
    UserData: UserDto;
    accesstoken: string;
    refreshToken: string;
}