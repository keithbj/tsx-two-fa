function get() {
  jest.fn(() => Promise.resolve({ data: {} }));
}

export default {
  get
};
