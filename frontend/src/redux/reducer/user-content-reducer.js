import {
  FETCH_USER_CONTENT_REQUEST,
  FETCH_USER_CONTENT_SUCCESS,
  SEARCH_CONTENT_REQUEST,
  SEARCH_CONTENT_SUCCESS,
  UPDATE_CONTENT_STATUS_REQUEST,
  UPDATE_CONTENT_STATUS_SUCCESS,
  UPDATE_CONTENT_STATUS_FAILURE,
  CLEAR_SEARCH,
  CLEAR_UPDATE_ERROR,
  CLEAR_USER_CONTENT,
  SET_SEARCH_TERM
} from '../action-types/user-content-action-types';

const initialState = {
  userContent: {},
  isLoadingUserContent: {},
  searchResults: [],
  isSearching: false,
  hasSearched: false,
  updatingContentStatus: {},
  updateErrors: {},
  searchTerm: ''
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
      const newUpdatingContentStatus = action.payload.content.reduce((acc, item) => {
        acc[item.id] = false;
        return acc;
      }, {});
      
      return {
        ...state,
        userContent: {
          ...state.userContent,
          [action.payload.userId]: action.payload.content
        },
        isLoadingUserContent: {
          ...state.isLoadingUserContent,
          [action.payload.userId]: false
        },
        updatingContentStatus: {
          ...state.updatingContentStatus,
          ...newUpdatingContentStatus
        }
      };
    case SEARCH_CONTENT_REQUEST:
      return {
        ...state,
        isSearching: true,
        hasSearched: false,
        // Above value helps to keep the current searchResults while searching
        searchResults: state.searchResults
      };
    case SEARCH_CONTENT_SUCCESS:
      return {
        ...state,
        searchResults: action.payload,
        isSearching: false,
        hasSearched: true
      };
    case UPDATE_CONTENT_STATUS_REQUEST:
      return {
        ...state,
        updatingContentStatus: {
          ...state.updatingContentStatus,
          [action.payload.contentId]: true
        }
      };
    case UPDATE_CONTENT_STATUS_SUCCESS:
      return {
        ...state,
        userContent: {
          ...state.userContent,
          [action.payload.userId]: state.userContent[action.payload.userId].map(
            content => content.id === action.payload.id ? action.payload : content
          )
        },
        updatingContentStatus: {
          ...state.updatingContentStatus,
          [action.payload.id]: false
        },
        updateErrors: {
          ...state.updateErrors,
          [action.payload.id]: null
        }
      };
    case UPDATE_CONTENT_STATUS_FAILURE:
      return {
        ...state,
        updatingContentStatus: {
          ...state.updatingContentStatus,
          [action.payload.contentId]: false
        },
        updateErrors: {
          ...state.updateErrors,
          [action.payload.contentId]: action.payload.error
        }
      };
    case CLEAR_UPDATE_ERROR:
      return {
        ...state,
        updateErrors: {
          ...state.updateErrors,
          [action.payload]: null
        }
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        searchResults: [],
        isSearching: false,
        hasSearched: false,
        searchTerm: ''
      };
    case CLEAR_USER_CONTENT:
      return {
        ...state,
        userContent: {},
        isLoadingUserContent: {}
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
}

export default userContentReducer;
