// Calculates Linear Regression coefficients using Ordinary Least Squares
// y = b_0 + b_1 * x
export function calculateCoefficients(
  x: number[],
  y: number[]
): [number, number] {
  if (!x?.length || !y.length) {
    throw "x and y must be valid arrays";
  }
  const n = x.length;

  const X = x.map((row) => row[0]);

  const x_mean = X.reduce((prev, cur) => prev + cur, 0) / n;
  const y_mean = y.reduce((prev, cur) => prev + cur, 0) / n;

  const ss_xy =
    X.reduce((prev, cur, i) => prev + cur * y[i], 0) - n * x_mean * y_mean;
  const ss_xx =
    X.reduce((prev, cur) => prev + Math.pow(cur, 2)) - n * Math.pow(x_mean, 2);

  const b_1 = ss_xy / ss_xx;
  const b_0 = y_mean - b_1 * x_mean;

  return [b_0, b_1];
}
