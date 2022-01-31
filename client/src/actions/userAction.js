import {FETCH_USER, REST_PASSWORD, UPDATE_PASSWORD,CHECK_EMAIL, INTRODUCE, CONVERT_BLOG, GET_BLOG, GET_BLOG_By_Id, UpdateBlog, DeleteBlog} from './types'
import axios from 'axios'



export const fetchUser = () => async dispatch => {
        const res = await axios.get('/api/profile')
        
        dispatch({type:FETCH_USER, payload:res.data})
}

export const restPassword = (email) => async dispatch => {
        const res = await axios.post('/api/rest_password',{email:email})
        
        dispatch({type:REST_PASSWORD, payload:res.data})
}

export const restPasswordConfirm = (email, password) => async dispatch => {
        const res = await axios.post('/api/update_password', {email:email, password:password})

        dispatch({type:UPDATE_PASSWORD, payload:res.data})
}

export const checkEmail = (email) => async dispatch => {
        const res = await axios.post('/api/check_email',{email:email})

        dispatch({type:CHECK_EMAIL, payload:res.data})
}

export const introduce = (nickName, job, country, city, sentence, hobbies) => async dispatch => {
        const res = await axios.post('/api/introduce_user',{nickName: nickName, job: job, country: country, city: city, sentence: sentence, hobbies: hobbies})

        dispatch({type:INTRODUCE, payload:res.data})
}
export const submitBlogs = (title, content, image, video ) => async dispatch => {
        const res = await axios.post('/api/post_blog',{ title:title, content:content, imageUrl: image, videoUrl:video})

        dispatch({type:CONVERT_BLOG, payload:res.data})
}
export const getBlogs = () => async dispatch => {
        const res = await axios.get('/api/blogs')

        dispatch({type:GET_BLOG, payload:res.data})
}
export const getBlogById = (id) => async dispatch => {
        const res = await axios.get(`/api/getBlogById/${id}`)

        dispatch({type:GET_BLOG_By_Id, payload:res.data})
}

export const updadteBlog = (id, title, content, imageUrl, videoUrl) => async dispatch => {
        const res = await axios.post('/api/updateBlog',{id,title,content,imageUrl, videoUrl})

        dispatch({type:UpdateBlog, payload:res.data})
}
export const deleteBlog = (id) => async dispatch => {
        const res = await axios.delete(`/api/delete_blog/${id}`)

        dispatch({type:DeleteBlog, payload:res.data})
}
export const changeHeaderState = (state, payload) => dispatch => {
        dispatch({type:state, payload:payload})
}








