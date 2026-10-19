export type Statement = {
  revenue: number;
  cost: number;
  gross: number;
  admin: number;
  operating: number;
  interest: number;
  tax: number;
  net: number;
  ppe: number;
  goodwill: number;
  intangibles: number;
  receivables: number;
  cash: number;
  assets: number;
  capital: number;
  retained: number;
  equity: number;
  debt: number;
  payables: number;
  taxLiability: number;
  current: number;
  liabilities: number;
  dividend: number | null;
};
export const statements: Record<string, Record<string, Statement>> = {
  Vennlisk: {
    "2026": {
      revenue: 12370,
      cost: 10846.7,
      gross: 1523.3,
      admin: 72.3,
      operating: 1451,
      interest: 436.8,
      tax: 243.4,
      net: 770.8,
      ppe: 3397.4,
      goodwill: 6274,
      intangibles: 2249,
      receivables: 1437.3,
      cash: 986.1,
      assets: 14343.8,
      capital: 450,
      retained: 7803.1,
      equity: 8253.1,
      debt: 5460,
      payables: 387.2,
      taxLiability: 243.5,
      current: 2423.4,
      liabilities: 630.7,
      dividend: 509.6,
    },
    "2025": {
      revenue: 11627.8,
      cost: 10304.4,
      gross: 1323.4,
      admin: 68.7,
      operating: 1254.7,
      interest: 436.8,
      tax: 196.3,
      net: 621.6,
      ppe: 3261.5,
      goodwill: 6274,
      intangibles: 2114.1,
      receivables: 1365.4,
      cash: 997.3,
      assets: 14012.3,
      capital: 450,
      retained: 7541.9,
      equity: 7991.9,
      debt: 5460,
      payables: 364,
      taxLiability: 196.4,
      current: 2362.7,
      liabilities: 560.4,
      dividend: null,
    },
  },
  Ringcoll: {
    "2026": {
      revenue: 10514.5,
      cost: 9002.8,
      gross: 1511.7,
      admin: 62.2,
      operating: 1449.5,
      interest: 144,
      tax: 300.3,
      net: 1005.2,
      ppe: 2989.7,
      goodwill: 2211,
      intangibles: 3480.2,
      receivables: 1108.2,
      cash: 297.6,
      assets: 10086.7,
      capital: 300,
      retained: 7353.5,
      equity: 7653.5,
      debt: 1800,
      payables: 332.8,
      taxLiability: 300.4,
      current: 1405.8,
      liabilities: 633.2,
      dividend: 374.9,
    },
    "2025": {
      revenue: 9568.2,
      cost: 7922.5,
      gross: 1645.7,
      admin: 57.8,
      operating: 1587.9,
      interest: 144,
      tax: 332.1,
      net: 1111.8,
      ppe: 3310.3,
      goodwill: 2211,
      intangibles: 3211.3,
      receivables: 790.8,
      cash: 281.4,
      assets: 9804.8,
      capital: 300,
      retained: 6723.2,
      equity: 7023.2,
      debt: 1800,
      payables: 649.4,
      taxLiability: 332.2,
      current: 1072.2,
      liabilities: 981.6,
      dividend: null,
    },
  },
};
export const money = (n: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
export function ratios(company: string, year: string) {
  const s = statements[company][year],
    prev = statements[company]["2025"];
  const r = (
    name: string,
    formula: string,
    values: string,
    value: number | null,
    unit: string,
    meaning: string,
  ) => ({ name, formula, values, value, unit, meaning });
  return [
    r(
      "Revenue growth",
      "(Current revenue ÷ prior revenue − 1) × 100",
      `${money(s.revenue)} ÷ ${money(prev.revenue)} − 1`,
      year === "2026" ? (s.revenue / prev.revenue - 1) * 100 : null,
      "%",
      "Growth alone does not establish profitable growth. Prior-year 2024 revenue is not supplied.",
    ),
    r(
      "Gross margin",
      "Gross profit ÷ revenue × 100",
      `${money(s.gross)} ÷ ${money(s.revenue)} × 100`,
      (s.gross / s.revenue) * 100,
      "%",
      "The share of revenue remaining after direct service costs.",
    ),
    r(
      "Operating margin",
      "Operating profit ÷ revenue × 100",
      `${money(s.operating)} ÷ ${money(s.revenue)} × 100`,
      (s.operating / s.revenue) * 100,
      "%",
      "Service quality must earn a premium sufficient to cover operating costs.",
    ),
    r(
      "Net margin",
      "Profit for year ÷ revenue × 100",
      `${money(s.net)} ÷ ${money(s.revenue)} × 100`,
      (s.net / s.revenue) * 100,
      "%",
      "Includes the effects of financing and tax.",
    ),
    r(
      "Current ratio",
      "Current assets ÷ current liabilities",
      `${money(s.current)} ÷ ${money(s.liabilities)}`,
      s.current / s.liabilities,
      "×",
      "A snapshot of short-term coverage; receivables may not convert to cash immediately.",
    ),
    r(
      "Gearing",
      "Debt ÷ (debt + equity) × 100",
      `${money(s.debt)} ÷ (${money(s.debt)} + ${money(s.equity)}) × 100`,
      (s.debt / (s.debt + s.equity)) * 100,
      "%",
      "Uses book-value debt as a proportion of long-term capital; alternative definitions exist.",
    ),
    r(
      "Interest cover",
      "Operating profit ÷ finance costs",
      `${money(s.operating)} ÷ ${money(s.interest)}`,
      s.operating / s.interest,
      "×",
      "Lower cover leaves less room for earnings shocks before debt service becomes difficult.",
    ),
    r(
      "ROCE",
      "Operating profit ÷ closing (equity + debt) × 100",
      `${money(s.operating)} ÷ ${money(s.equity + s.debt)} × 100`,
      (s.operating / (s.equity + s.debt)) * 100,
      "%",
      "Uses closing book capital consistently for both years, rather than average capital.",
    ),
    r(
      "Receivables days",
      "Closing trade receivables ÷ revenue × 365",
      `${money(s.receivables)} ÷ ${money(s.revenue)} × 365`,
      (s.receivables / s.revenue) * 365,
      " days",
      "Assumes all revenue is on credit; closing receivables approximate average balances.",
    ),
    r(
      "Dividend payout",
      "Dividend ÷ profit for year × 100",
      `${s.dividend === null ? "Not supplied" : money(s.dividend)} ÷ ${money(s.net)} × 100`,
      s.dividend === null ? null : (s.dividend / s.net) * 100,
      "%",
      "Higher distributions can constrain internal funding. 2025 dividends are not disclosed.",
    ),
  ];
}
