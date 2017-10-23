import fetchival from 'fetchival'
import configs from './../../configs.js'

export const SET_ALL = 'posts/SET_ALL'
export const LOADING = 'posts/POSTS_LOADING'
export const ERROR = 'posts/ERROR'

const initialState = {
    posts: [],
    activeId: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL:
            return {
                ...state,
                posts: action.posts,
                loading: false
            }
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case ERROR:
            return {
                ...state,
                error: action.error
            }

        default:
            return state
    }
}

export const getPosts = () => {
  return dispatch => {
    dispatch({
            type: LOADING
        })
        fetchival( configs.baseurl + '/wp/v2/posts', {
            mode: 'cors'
        }).get({
            limit: 8
        }).then( r => {
            let postsArray = []
            for (let post of r) {
                postsArray.push(post)
            }
            dispatch({
                type: SET_ALL,
                posts: postsArray
            })
        }).catch( r => {
            dispatch({
                type: ERROR,
                error: r.message
            })
        })
  }
}
