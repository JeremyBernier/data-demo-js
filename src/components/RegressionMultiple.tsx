import React from "react";
import * as math from "mathjs";

const RegressionMultiple = ({ data }) => {
  console.log("data", data);

  if (!data?.length) {
    return <div></div>;
  }

  const X = math.matrix(
    data.slice(1).map((row) => row.slice(0, row.length - 1))
  );
  const Y = math.matrix(data.slice(1).map((row) => [row[row.length - 1]]));
  console.log("X", X);
  console.log("Y", Y);

  const B = math.multiply(
    math.multiply(
      math.inv(math.multiply(math.transpose(X), X)),
      math.transpose(X)
    ),
    Y
  );

  const Y_predicted = math.multiply(X, B);
  const E = math.subtract(Y, Y_predicted);

  console.log("B", B);
  console.log("E", E);

  return (
    <div>
      <div>Regression Equations</div>
      <div>Y = X*B + E</div>
      <div>{`B = ${B.toString()}`}</div>
      <div>{`E = ${E.toString()}`}</div>
    </div>
  );
};

export default RegressionMultiple;
