export function limparData(data: Date | string): string {
  const date = new Date(data);

  if (isNaN(date.getTime())) {
    throw new Error('Formato de data inválido');
  }

  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = String(date.getFullYear());
  return `${ano}-${mes}-${dia}`;
}
