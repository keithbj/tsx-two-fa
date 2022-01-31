function create() {
  jest.fn(() => Promise.resolve({ data: {} }));
}

function get() {
  jest.fn(() => Promise.resolve({ data: {} }));
}

export default {
  create,
  get
};
