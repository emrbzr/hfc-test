import {
  FETCH_USER_CONTENT_REQUEST,
  FETCH_USER_CONTENT_SUCCESS
} from '../action-types/user-content-action-types';

const initialState = {
  userContent: {},
  isLoadingUserContent: {}
};

function userContentReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_CONTENT_REQUEST:
      return {
        ...state,
        isLoadingUserContent: {
          ...state.isLoadingUserContent,
          [action.payload]: true
        }
      };
    case FETCH_USER_CONTENT_SUCCESS:
      return {
        ...state,
        userContent: {
          ...state.userContent,
          [action.payload.userId]: action.payload.content
        },
        isLoadingUserContent: {
          ...state.isLoadingUserContent,
          [action.payload.userId]: false
        }
      };
    default:
      return state;
  }
}

export default userContentReducer;
