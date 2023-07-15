let uniqueId = 0;

function next() {
  uniqueId++;
  return uniqueId.toString();
}

export default {
  mixin: {
    beforeCreate() {
      this.uniqueId = next();
    },
  },
};
