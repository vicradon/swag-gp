const get = (item) => {
  return JSON.parse(localStorage.getItem(item));
};

const set = (item, value) => {
  JSON.stringify(localStorage.setItem(item, value));
};

const remove = (item) => {
  localStorage.removeItem(item)
}

module.exports = {
  get,
  set,
  remove
};
