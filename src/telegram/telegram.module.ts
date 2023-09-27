import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ITelegramModuleAsyncOptions } from './telegramInterface';
import { TELEGRAM_MODULE_OPTIONS } from './telegramConstants';

@Global()
@Module({
  // providers: [TelegramService],
  // exports: [TelegramService],
})
export class TelegramModule {
  static forRootAsync(options: ITelegramModuleAsyncOptions): DynamicModule {
    const asyncOptions = this.createAcyncOptionsProvider(options);

    return {
      module: TelegramModule,
      imports: options.imports,
      providers: [TelegramService, asyncOptions],
      exports: [TelegramService],
    };
  }

  private static createAcyncOptionsProvider(options: ITelegramModuleAsyncOptions): Provider {
    return {
      provide: TELEGRAM_MODULE_OPTIONS,
      useFactory: async (...args: any[]) => {
        const config = await options.useFactory(...args);
        return config;
      },
      inject: options.inject || [],
    };
  }
}
