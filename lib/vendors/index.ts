let count = 0;
export const uuid = {
  v4() {
    return count++, Date.now() + count + "";
  },
};
