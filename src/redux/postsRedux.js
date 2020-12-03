import Axios from 'axios';

/* selectors */
export const getAll = ({posts}) => posts.data;
export const getAllPublished = ({posts}) => posts.data.filter(item => item.status == 'published');
export const getAllWithDrafted =  ({posts, users}) => {
  return posts.data.filter(item => item.status == 'published' || (item.author == users.activeUser.name && item.status == 'draft'));
};

export const getActivePost = ({posts}) => posts.activePost;

export const getPostById = ({posts}, postId) => {

  return posts.data;
};

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');
const SELECT_POST = createActionName('SELECT_POST');
const UPDATE_POST = createActionName('UPDATE_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addNewPost =  payload => ({payload, type: ADD_POST});
export const selectPost = payload => ({payload: payload, type: SELECT_POST });
export const updatePost = payload => ({payload: payload, type: UPDATE_POST });

export const fetchPublished = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    const state = getState();
    if(!state.posts.data.length) {
      Axios
        .get('http://localhost:8000/api/posts')
        .then(res => {
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    }
  };
};


export const fetchSelected = (id) => {
  return async dispatch => {
    dispatch(fetchStarted());

    try {
      let res = await Axios.get(`http://localhost:8000/api/posts/${id}`);
      await new Promise((resolve, reject) => resolve());
      dispatch(fetchSuccess(res.data));
    } catch(err) {
      dispatch(fetchError(err.message || true));
    }
  };
};

export const addPostRequest = (post) => {
  return async dispatch => {

    dispatch(fetchStarted());
    try {
      let res = await Axios.post('http://localhost:8000/api/posts', post);
      dispatch(addNewPost(res.data));
    } catch(err) {
      dispatch(fetchError(err.message || true));
    }

  };
};


export const editPostRequest = (post) => {
  return async dispatch => {
    dispatch(fetchStarted());
    try {
      let res = await Axios.put(`http://localhost:8000/api/posts/${post.id}`, post);

      await new Promise((resolve) => resolve());
      dispatch(updatePost(res.data));
    } catch(err) {
      dispatch(fetchError(err.message || true));
    }

  };
};

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_POST: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: [...statePart.data, action.payload],
      };
    }
    case SELECT_POST: {
      return {
        ...statePart,
        activePost: action.payload,
      };
    }
    case UPDATE_POST: {
      console.log(statePart);
      console.log(action.payload);
      return {
        ...statePart,
        activePost: action.payload,
        data: statePart.data.map(data => {
          console.log(`2`, data);

          if (data.id === action.payload.id) {
            return {
              ...action.payload,
            };
          } else {
            console.log(`3`, data);
            return data;
          }
        }),
      };
    }
    default:
      return statePart;
  }
}
