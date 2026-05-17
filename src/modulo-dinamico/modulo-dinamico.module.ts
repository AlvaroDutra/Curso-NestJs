import { DynamicModule, Module } from '@nestjs/common';

export type ModuloDinamicoConfigs = {
  apiKey: string;
  apiUrl: string;
};

export const MODULO_DINAMICO_CONFIG = 'MODULO_DINAMICO_CONFIG';

@Module({})
export class ModuloDinamicoModule {
  static register(configs: ModuloDinamicoConfigs): DynamicModule {
    return {
      module: ModuloDinamicoModule,
      imports: [],
      providers: [{ provide: MODULO_DINAMICO_CONFIG, useValue: configs }],
      controllers: [],
      exports: [MODULO_DINAMICO_CONFIG],
    };
  }
}
