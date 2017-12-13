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

export const initialHistoryState = {
  histories: [],
  pagination: {}
};

export const initialNotificationState = {
  pagination: {},
  notifications: []
};

export default {
  initialAuthState,
  initialBookState,
  initialHistoryState,
  initialNotificationState
};

