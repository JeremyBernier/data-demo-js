export default class DataModel {
  id: string;
  columns: string[];
  data: any[][];

  constructor(arr2d: any[][], id: string) {
    this.id = id;
    this.columns = arr2d[0].slice(0);
    this.data = arr2d.slice(1);
  }

  getDataByColName(colName: string) {
    const index = this.columns.indexOf(colName);
    return this.data[index];
  }

  getDataByColNames(colNames: string[]) {
    console.log("colNames", colNames);
    console.log("this.columns", this.columns);
    const indexes = colNames.map((colName) => this.columns.indexOf(colName));
    return this.data.map((row) => indexes.map((colIndex) => row[colIndex]));
  }
}
