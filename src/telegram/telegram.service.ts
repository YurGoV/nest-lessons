import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ITelegramOptions } from './telegramInterface';
// import { getTelegramConfig } from 'src/configs/telegramConfig';
import { TELEGRAM_MODULE_OPTIONS } from './telegramConstants';

@Injectable()
export class TelegramService {
  bot: Telegraf;
  options: ITelegramOptions;

  constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options: ITelegramOptions) {
    // this.options = getTelegramConfig();
    // this.bot = new Telegraf(this.options.token);
    this.bot = new Telegraf(options.token);
    this.options = options;
  }

  async sendMessage(message: string, chatId: string = this.options.chatId) {
    await this.bot.telegram.sendMessage(chatId, message);
  }
}
