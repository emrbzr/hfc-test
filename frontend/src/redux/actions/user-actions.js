import { userService } from '../../services/user.service';
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
import { DashboardActions } from "../action-types/dashboard-action-types";
import { onLoadDashboardUsers } from './dashboard-actions';

export const fetchUserContent = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_USER_CONTENT_REQUEST, payload: userId });
  try {
    const { data } = await userService.getUserContent(userId);
    dispatch({
      type: FETCH_USER_CONTENT_SUCCESS,
      payload: { userId, content: data },
    });
  } catch (error) {
    console.error('Error fetching user content:', error);
  }
};

export const searchContent = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_CONTENT_REQUEST });
  try {
    const { data } = await userService.searchContent(query);
    dispatch({
      type: SEARCH_CONTENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error('Error searching content:', error);
    dispatch({
      type: SEARCH_CONTENT_SUCCESS,
      payload: [],
    });
  }
};

export const updateContentStatus = (userId, contentId, status) => async (dispatch) => {
  dispatch({ type: UPDATE_CONTENT_STATUS_REQUEST, payload: { contentId, status } });
  try {
    const { data } = await userService.updateContentStatus(userId, contentId, status);
    dispatch({
      type: UPDATE_CONTENT_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error('Error updating content status:', error);
    if(error.response?.status === 400 || error.response?.status === 404) {
      dispatch({
        type: UPDATE_CONTENT_STATUS_FAILURE,
        payload: { contentId, error: error.response?.data?.error || 'An error occurred' },
      });
      setTimeout(() => {
        dispatch({ type: CLEAR_UPDATE_ERROR, payload: contentId });
      }, 3000);
    }
  }
};

export const setSearchTerm = (term) => ({
  type: SET_SEARCH_TERM,
  payload: term,
});

export const clearSearch = () => (dispatch) => {
  dispatch(setSearchTerm(''));
  dispatch({ type: CLEAR_SEARCH });
  dispatch({ type: CLEAR_USER_CONTENT });
  dispatch(onLoadDashboardUsers());
};
