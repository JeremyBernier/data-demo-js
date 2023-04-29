import * as math from "mathjs";

const LEARNING_RATE_DEFAULT = 0.1;
const EPOCHS_DEFAULT = 150;

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

function sigmoidMatrix(Z: math.Matrix): math.Matrix {
  return math.map(Z, sigmoid);
}

export default class LogisticRegression {
  // z = w * x + b
  x: number[][];
  y: number[];
  weights: number[] = [];

  /**
   *
   * @param x n*m where n = # samples, m = # dimensions
   * @param y
   */
  constructor(x: number[][], y: number[]) {
    // const numSamples = x.length;
    const numDimensions = x[0].length;

    this.x = x.map((row) => [1, ...row]);
    this.y = y;
    this.weights = Array(numDimensions + 1).fill(0);
  }

  /**
   *
   * @param x n*m where n = # samples, m = # dimensions
   * @param y
   * @param epochs
   */
  fit(
    learningRate: number = LEARNING_RATE_DEFAULT,
    epochs: number = EPOCHS_DEFAULT
  ) {
    const X = math.matrix(this.x);
    const Y = math.matrix(this.y);

    for (let i = 0; i < epochs; i++) {
      const yPred = this.computeYPred(X, this.weights);
      const dW = this.computeGradient(X, Y, yPred);
      this.weights = this.weights.map(
        (weight, i) => (weight -= learningRate * dW.get([i]))
      );
    }
  }

  // computeYPred(x: number[][], weights: number[]): number[] {
  computeYPred(X: math.Matrix, weights: number[]): math.Matrix {
    const Z = math.multiply(X, weights);
    return sigmoidMatrix(Z);
  }

  // computeGradient(X: number[][], Y: number[], yPred: number[]): number {
  computeGradient(
    X: math.Matrix,
    Y: math.Matrix,
    yPred: math.Matrix
  ): math.Matrix {
    const sub = math.subtract(yPred, Y);
    const mul = math.multiply(math.transpose(X), sub);
    return math.multiply(mul, 1 / Y.size()[0]);

    // return (
    //   math.multiply(math.multiply(math.transpose(X), math.subtract(yPred, Y), Y.size()[0])
    // );
  }

  predict(x: number[][], threshold: number = 0.5): math.Matrix {
    const X = math.matrix(x.map((row) => [1, ...row]));
    const prediction = this.computeYPred(math.matrix(X), this.weights);
    return math.map(prediction, (val) => (val >= threshold ? 1 : 0));
  }
}
