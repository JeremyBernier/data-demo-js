import LogisticRegression from "src/utils/LogisticRegression";

const LEARNING_RATE = 0.1;
const EPOCHS = 150;

const LogisticRegressionUI = ({ X, Y }) => {
  console.log("X", X);
  console.log("Y", Y);

  const model = new LogisticRegression(X, Y);
  model.fit(LEARNING_RATE, EPOCHS);
  const accuracy = model.calculateAccuracy(X);

  return (
    <div>
      <h3 className="font-bold text-xl mb-2">Logistic Regression</h3>
      <div className="mb-2">
        <div>Learning Rate: {LEARNING_RATE}</div>
        <div># of Iterations: {EPOCHS}</div>
      </div>
      <div className="mb-2">
        <h4 className="font-bold text-lg">Results</h4>
        <div>Accuracy: {accuracy}</div>
        <div>
          Weights:
          <ul className="list-disc ml-6">
            {model.weights.map((weight, index) => (
              <li key={index}>{weight}</li>
            ))}
          </ul>
        </div>
        <div>Equation: y = 1 / (1 + e^(-(X * W)))</div>
      </div>
    </div>
  );
};

export default LogisticRegressionUI;
