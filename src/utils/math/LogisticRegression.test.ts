import LogisticRegression from "./LogisticRegression";

const x = [
  3.78, 2.44, 2.09, 0.14, 1.72, 1.65, 4.92, 4.37, 4.96, 4.52, 3.69, 5.88,
].map((val) => [val]);
const y = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1];

test("adds 1 + 2 to equal 3", () => {
  const model = new LogisticRegression(x, y);
  model.fit();
  expect(model.calculateAccuracy(x)).toBe(0.9166666666666666);
  expect(model.weights).toEqual([-1.7376501276409693, 0.6465409867899616]);
});
