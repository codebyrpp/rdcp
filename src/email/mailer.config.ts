import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { ConfigService } from "@nestjs/config";
import { join } from "path/posix";

export class MailerConfigFactory {

  create(configService: ConfigService) {
    return {
      transport: {
        host: configService.get<string>('SMTP_HOST'),
        port: configService.get<number>('SMTP_PORT'),
        auth: {
          user: configService.get<string>('SMTP_USER'),
          pass: configService.get<string>('SMTP_PASS'),
        },
      },
      defaults: {
        from: '"RDCP" <user-ebf7f8fa-5074-4324-be3a-0ad32cbd1de7@mailslurp.biz>',
      },
      preview: true,
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  };
}
