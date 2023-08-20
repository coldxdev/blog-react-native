import { API_URL, LOADING_STATE } from '@consts/index';
import { IComment, IPost } from '@global-types/global';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import uuid from 'react-native-uuid';
import errorHandler from '@utils/errorHandler';

export interface PostsState {
    posts: IPost[];
    isLoading: string;
}

export interface updatePostPayload {
    postId: string;
    updatedPost: IPost;
}

export interface deletePostPayload {
    postId: string;
}

export interface addPostPayload {
    id: string;
    title: string;
    body: string;
    comments: IComment[] | [];
}

const initialState: PostsState = {
    posts: [],
    isLoading: LOADING_STATE.IDLE,
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        loadingPending: state => {
            if (state.isLoading === LOADING_STATE.IDLE) {
                state.isLoading = LOADING_STATE.PENDING;
            }
        },
        loadingFinished: state => {
            if (state.isLoading === LOADING_STATE.PENDING) {
                state.isLoading = LOADING_STATE.IDLE;
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        updatePost: (state, action: PayloadAction<updatePostPayload>) => {
            const postIndex = state.posts.findIndex(
                post => post.id === action.payload.postId
            );

            if (postIndex !== -1) {
                state.posts[postIndex] = action.payload.updatedPost;
            }
        },
        removePost: (state, action: PayloadAction<deletePostPayload>) => {
            const postIndex = state.posts.findIndex(
                post => post.id === action.payload.postId
            );
            if (postIndex !== -1) {
                state.posts.splice(postIndex, 1);
            }
        },

        addPost: (state, action: PayloadAction<addPostPayload>) => {
            state.posts = [...state.posts, action.payload];
        },
        addComment: (state, action) => {
            const postIndex = state.posts.findIndex(
                post => post.id === action.payload.postId
            );
            if (postIndex !== -1) {
                state.posts[postIndex].comments.push(action.payload.newComment);
            }
        },
    },
});

const { actions, reducer } = postsSlice;

export const {
    addPost,
    setPosts,
    removePost,
    loadingPending,
    loadingFinished,
    updatePost,
} = actions;
export default reducer;

export const fetchPosts = () => async dispatch => {
    try {
        dispatch(loadingPending());
        const response = await axios.get(`${API_URL}/posts`);
        dispatch(setPosts(response.data));
    } catch (error) {
        errorHandler(error);
    } finally {
        dispatch(loadingFinished());
    }
};

export const deletePost = (postId: string) => async dispatch => {
    try {
        const response = await axios.delete(`${API_URL}/posts/${postId}`);
        if (response.status === 200) {
            dispatch(removePost({ postId }));
        }
    } catch (e) {
        errorHandler(e);
    }
};

export const createPost = (title, body) => async dispatch => {
    try {
        const newPost = {
            title,
            body,
        };
        const response = await axios.post(`${API_URL}/posts`, newPost);

        if (response.status === 201) {
            dispatch(addPost(response.data));
        }
    } catch (e) {
        errorHandler(e);
    }
};

export const getPostById = (posts: IPost[], postIdToFind: string) => {
    return posts.find(post => post.id === postIdToFind);
};

export const editPost =
    (postId: string, title: string, body: string) =>
    async (dispatch, getState) => {
        try {
            const { posts } = getState().posts;
            const currentPost = posts.find(post => post.id === postId);
            const updatedPost = { ...currentPost, title, body };

            await axios.put(`${API_URL}/posts/${postId}`, updatedPost);
            dispatch(updatePost({ postId, updatedPost }));
        } catch (e) {
            errorHandler(e);
        }
    };

export const createComment =
    (text: string, postId: string) => async (dispatch, getState) => {
        try {
            const { posts } = getState().posts;
            const currentPost = posts.find(post => post.id === postId);

            const updatedPost = {
                ...currentPost,
                comments: [
                    ...currentPost.comments,
                    { id: uuid.v4(), text, postId },
                ],
            };

            await axios.put(`${API_URL}/posts/${postId}`, updatedPost);

            dispatch(updatePost({ postId, updatedPost }));
        } catch (e) {
            errorHandler(e);
        }
    };

export const deleteComment =
    (postId: string, commentId: string) => async (dispatch, getState) => {
        try {
            const { posts } = getState().posts;
            const currentPost = posts.find(post => post.id === postId);
            const updatedComments = currentPost.comments.filter(
                comment => comment.id !== commentId
            );

            const updatedPost = {
                ...currentPost,
                comments: updatedComments,
            };

            await axios.put(`${API_URL}/posts/${postId}`, updatedPost);

            dispatch(updatePost({ postId, updatedPost }));
        } catch (e) {
            errorHandler(e);
        }
    };

export const editComment =
    (postId, commentId, text) => async (dispatch, getState) => {
        try {
            const { posts } = getState().posts;
            const post = posts.find(post => post.id === postId);
            const commentIndex = post.comments.findIndex(
                comment => comment.id === commentId
            );

            post.comments[commentIndex].text = text;

            await axios.put(`${API_URL}/posts/${postId}`, post);

            dispatch(updatePost({ postId, updatedPost: post }));
        } catch (e) {
            errorHandler(e);
        }
    };
