import { createAsyncThunk } from "@reduxjs/toolkit";
import { PPost } from "@/entities/post/api/interfaces";
import toast from "react-hot-toast";
import { instanceSecond } from "@/shared/api/instance";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

// get all posts

export const getPosts = createAsyncThunk('post/getPosts', async (page: number) => {
    try {
        const response = await instanceSecond.get(`${API_ENDPOINTS.POSTS}?page=${page}&amount=20`)
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
})

// get post

export const getPost = createAsyncThunk('post/getPost', async (id: string) => {
    try {
        const response = await instanceSecond.get(`${API_ENDPOINTS.POSTS}?post_id=${id}`)
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
})

// get user posts

export const getUserPosts = createAsyncThunk('post/getUserPosts', async (id: string) => {
    try {
        const response = await instanceSecond.get(`${API_ENDPOINTS.POSTS}?user=${id}`)
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
})

// add post

export const addPost = createAsyncThunk('post/addPost', async (data: PPost | any) => {
    try {
        const response = await instanceSecond.post(`${API_ENDPOINTS.POSTS}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        toast.success('Пост успешнло добавлен')
        return response.data        
    } catch (error) {
        toast.error('Пост не добавлен')
        return Promise.reject(error)
    }
})

// update post

export const updatePost = createAsyncThunk('post/updatePost', async (data: PPost) => {
    try {
        await instanceSecond.put(`${API_ENDPOINTS.POSTS}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        toast.success('Пост успешнло обновлен')
    } catch (error) {
        toast.error('Пост не обновлен')
        return Promise.reject(error)
    }
})

// delete post 

export const deletePost = createAsyncThunk('post/deletePost', async (id: string) => {
    try {
        await instanceSecond.delete(`${API_ENDPOINTS.POSTS}`, {
            data: { id }
        })
        toast.success('Пост успешнло удален')
    } catch (error) {
        toast.error('Пост не удален')
        return Promise.reject(error)
    }
})