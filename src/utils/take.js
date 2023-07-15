import sortedBy from "./sortedBy";
import bucketedBy from "./bucketedBy";
import distinct from "./distinct";

const retakeAfterMethods = [
  "concat",
  "map",
  "copyWithin",
  "fill",
  "filter",
  "flat",
  "keys",
  "map",
  "reverse",
  "sort",
  "slice",
  "splice",
  "values",
];

function take(array) {
  function Taken() {
    this.sortedBy = (...args) => take(sortedBy(array, ...args));
    this.bucketedBy = (...args) => take(bucketedBy(array, ...args));
    this.distinct = (...args) => take(distinct(array, ...args));
    this.toArray = () => array;

    retakeAfterMethods.forEach((method) => {
      this[method] = (...args) => take(array[method](...args));
    });
  }

  Taken.prototype = array;
  return new Taken();
}

export default take;
