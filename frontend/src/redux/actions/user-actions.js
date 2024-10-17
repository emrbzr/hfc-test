import { userService } from '../../services/user.service';
import {
  FETCH_USER_CONTENT_REQUEST,
  FETCH_USER_CONTENT_SUCCESS
} from '../action-types/user-content-action-types';

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
