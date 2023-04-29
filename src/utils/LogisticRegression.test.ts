import LogisticRegression from "./LogisticRegression";

const x = [
  3.78, 2.44, 2.09, 0.14, 1.72, 1.65, 4.92, 4.37, 4.96, 4.52, 3.69, 5.88,
].map((val) => [val]);
const y = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1];

test("adds 1 + 2 to equal 3", () => {
  const model = new LogisticRegression(x, y);
  model.fit();
  const accuracy =
    x
      .map((row, i) => (model.predict([row]).get([0]) === y[i] ? 1 : 0))
      .reduce((a: number, b: number) => a + b, 0) / x.length;
  // console.log("accuracy", accuracy);
  // console.log("predict0", model.predict([[3.46]]));
  // console.log(
  //   "predictions",
  //   x.map((row, i) => (model.predict([row]).get([0]) ? 1 : 0))
  // );
  expect(accuracy).toBe(0.9166666666666666);
});
