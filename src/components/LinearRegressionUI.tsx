import React from "react";
import * as math from "mathjs";

// currently assumes X and Y are only numbers
const LinearRegressionUI = ({ X: Xarr, Y: Yarr }) => {
  if (!Xarr?.length || !Yarr?.length) {
    return <div></div>;
  }

  const X = math.matrix(Xarr.map((row) => [1, ...row]));
  const Y = math.matrix(Yarr);

  const B = math.multiply(
    math.multiply(
      math.inv(math.multiply(math.transpose(X), X)),
      math.transpose(X)
    ),
    Y
  );

  const Y_predicted = math.multiply(X, B);

  return (
    <div>
      <div>Linear Regression Equations</div>
      <div>Y = X*B</div>
      <div>{`B = ${B.toString()}`}</div>
    </div>
  );
};

export default LinearRegressionUI;
