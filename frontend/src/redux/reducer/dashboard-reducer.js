import { DashboardActions } from "../action-types/dashboard-action-types";

const initialState = {
  users: [],
  isLoading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case DashboardActions.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case DashboardActions.SET_LOADING_USERS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case DashboardActions.RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
