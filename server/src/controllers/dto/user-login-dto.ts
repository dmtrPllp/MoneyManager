import { IsEmail, IsString, Matches } from 'class-validator';

export class UserLoginDto {
	id: number;
	@IsEmail({}, { message: 'Неверно введён email!' })
	email: string;
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])\S{4,16}$/, {
		message: 'Пароль должен содержать минимум по одному символу верхнего и нижнего регистров,\n минимум один специальный символ, одно число, а также иметь максимальную длину в 16 символов!'
	})
	password: string;
}