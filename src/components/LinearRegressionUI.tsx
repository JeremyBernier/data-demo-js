import React from "react";
import * as math from "mathjs";

// currently assumes X and Y are only numbers
const LinearRegressionUI = ({ X: Xarr, Y: Yarr }) => {
  if (!Xarr?.length || !Yarr?.length) {
    return <div></div>;
  }

  console.log("Xarr", Xarr);

  const X = math.matrix(Xarr.map((row) => [1, ...row]));
  const Y = math.matrix(Yarr);
  console.log("X", X);
  // console.log("Y", Y);

  console.log(
    "math.multiply(math.transpose(X), X)",
    math.multiply(math.transpose(X), X)
  );

  const B = math.multiply(
    math.multiply(
      math.inv(math.multiply(math.transpose(X), X)),
      math.transpose(X)
    ),
    Y
  );

  const Y_predicted = math.multiply(X, B);
  // const E = math.subtract(Y, Y_predicted);

  return (
    <div>
      <div>Linear Regression Equations</div>
      <div>Y = X*B</div>
      <div>{`B = ${B.toString()}`}</div>
      {/* <div>{`E = ${E.toString()}`}</div> */}
    </div>
  );
};

export default LinearRegressionUI;
