export function formatNumber(value?: number | string | null) {
  return Intl.NumberFormat(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(
    Number.parseInt(value as any, 10) || 0
  );
}

export function formatCurrency(value?: number | string) {
  return `$ ${formatNumber(value)}`;
}

export function formatPercent(value?: number | string) {
  return `${formatNumber(value)} %`;
}
