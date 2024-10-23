import { limparData } from './limparData';

export function limparDados(total: number, date: string) {
  const cleanData = limparData(date);
  const cleanTotal = total / 100;

  const data = { date: cleanData, total: cleanTotal };

  return data;
}
