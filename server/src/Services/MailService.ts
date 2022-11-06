import { IMailService } from "./interfaces/IMailService";
import { createTransport, Transporter } from 'nodemailer';
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { IConfigService } from "../config/IConfigService";
import 'reflect-metadata';
import SMTPTransport from "nodemailer/lib/smtp-transport";

@injectable()
export class MailService implements IMailService {
    transporter: Transporter<SMTPTransport.SentMessageInfo>;
    constructor(@inject(TYPES.ConfigService) private configService: IConfigService
    ) {

        this.transporter = createTransport({
            host: this.configService.get('SMTP_HOST'),
            port: Number(this.configService.get('SMTP_PORT')),
            secure: true,
            auth: {
                user: this.configService.get('SMTP_USER'),
                pass: this.configService.get('SMTP_PASSWORD')
            }
        } as SMTPTransport.Options);
    }
    async sendActivationMail(to: string, link: string): Promise<void> {
        await this.transporter.sendMail({
            from: this.configService.get('SMTP_USER'),
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html:
                `
                       <div>
                       <h1>Для активации перейдите по ссылке</h1>
                       <a href="${link}">${link}</a>
                       </div>
                  `
        });
    }
}

