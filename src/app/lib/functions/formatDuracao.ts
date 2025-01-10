export function formatDuracao(hora: number, minuto: number, segundo: number) {
  const horaText = hora == 0 || hora > 1 ? `${hora} horas` : `${hora} hora`;

  const minutosText =
    minuto == 0 || minuto > 1 ? `${minuto} minutos` : `${minuto} minuto`;

  const segundosText =
    segundo == 0 || segundo > 1 ? `${segundo} segundos` : `${segundo} segundo`;

  return `${hora > 0 ? horaText + ", " : ""}${
    minuto > 0 ? minutosText + " e " : ""
  }${segundosText}`;
}
