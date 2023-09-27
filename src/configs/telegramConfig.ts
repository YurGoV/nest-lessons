import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from 'src/telegram/telegramInterface';

// export const getTelegramConfig = async (): Promise<ITelegramOptions> => {
export const getTelegramConfig = (configService: ConfigService): ITelegramOptions => {
  const token = configService.get('TELEGRAM_TOKEN');
  if (!token) {
    throw new Error('no telegram token');
  }
  return {
    token,
    chatId: configService.get('CHAT_ID') || '',
  };
};
