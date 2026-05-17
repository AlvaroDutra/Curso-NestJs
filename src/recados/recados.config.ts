import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  valorTeste1: 'Valor teste 1',
  valorTeste2: 'Valor teste 2',
}));
