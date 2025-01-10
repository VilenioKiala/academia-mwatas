import { parseAbsoluteToLocal } from "@internationalized/date";

export function formatDateTime(date: Date) {
  const { day, month, year, hour, minute } = parseAbsoluteToLocal(
    date.toISOString()
  );

  return `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year} às ${hour < 10 ? "0" + hour : hour}:${
    minute < 10 ? "0" + minute : minute
  }`;
}

export function formatDate(date: Date) {
  const { day, month, year } = parseAbsoluteToLocal(date.toISOString());

  return `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year}`;
}
