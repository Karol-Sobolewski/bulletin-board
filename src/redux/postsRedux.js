import { VerifiedUserSharp } from '@material-ui/icons';
import Axios from 'axios';
import shortid from 'shortid';
// import { post } from '../../backend/routes/posts.routes';

/* selectors */
export const getAll = ({posts}) => posts.data;
export const getAllPublished = ({posts}) => posts.data.filter(item => item.status == 'published');
export const getAllWithDrafted =  ({posts, users}) => {
  // console.log(posts.data, users.activeUser.name);
  // console.log(`log`, posts.data.filter(item => (item.author == users.activeUser.name && item.status == 'draft') || item.status == 'published'));
  return posts.data.filter(item => item.status == 'published' || (item.author == users.activeUser.name && item.status == 'draft'));
};

export const getActivePost = ({posts}) => posts.activePost;

export const getPostById = ({posts}, postId) => {
  console.log(`posts`, posts);
  return posts.data;
  // const filtered =  posts.data.filter(post => post._id == postId);
  // console.log(`post id`, postId);
  // return posts.data.filter(post => post.id === postId);
  // return filtered.length ? filtered[0] : {error: true};
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
// export const addNewPost = payload => ({payload: { ...payload, _id: shortid.generate() }, type: ADD_POST });
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
        // console.log(`res`, Axios.get(`http://localhost:8000/api/posts`));
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
      // console.log(`res`, Axios.post(`http://localhost:8000/api/posts`));
      let res = await Axios.post('http://localhost:8000/api/posts', post);
      // console.log(res);
      // await new Promise((resolve) => resolve());
      dispatch(addNewPost(res));
      // console.log(res);
    } catch(err) {
      dispatch(fetchError(err.message || true));
    }

  };
};


export const editPostRequest = (post) => {
  return async dispatch => {
    dispatch(fetchStarted());
    try {
      console.log(`req`, post);
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
      // console.log(`action`, action.payload);
      // console.log(`statepart`, statePart.data);
      return {
        ...statePart,
        data: statePart.data.map(data => {
          console.log(data);

          if (data.id === action.payload.id) {
            return {
              ...action.payload,
            };
          } else {
            return data;
          }
        }),
      };
    }
    default:
      return statePart;
  }
}
