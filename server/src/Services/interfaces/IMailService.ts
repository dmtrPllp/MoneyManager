
export interface IMailService {
    sendActivationMail: (to: string, from: string) => Promise<void>;
}