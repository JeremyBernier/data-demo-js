const dataConfig = {
  car: {
    filename: "car_data.csv",
    independentVars: ["Volume", "Weight"],
    regressionType: "linear",
  },
  real_estate: {
    filename: "real_estate.csv",
    independentVars: ["X3 distance to the nearest MRT station"],
    regressionType: "linear",
  },
  tumor: {
    filename: "tumor.csv",
    independentVars: ["Size"],
    regressionType: "logistic",
  },
};

export default dataConfig;
