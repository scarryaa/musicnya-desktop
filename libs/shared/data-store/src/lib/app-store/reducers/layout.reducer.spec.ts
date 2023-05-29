describe('Layout Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const result = reducer();

      expect(result).toBe(initialState);
    });
  });
});

function reducer() {
  //
}

const initialState = {};
