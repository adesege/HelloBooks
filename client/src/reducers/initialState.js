export const initialAuthState = {
  isAuthenticated: false,
  user: {
    group: '',
    userId: 0
  },
};

export const initialBookState = {
  books: [],
  pagination: {
    pageSize: 0,
    totalCount: 0,
    page: 0,
    pageCount: 0,
    limit: 0
  }
};

export default {
  initialAuthState,
  initialBookState
};
