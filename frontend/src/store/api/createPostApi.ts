import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_BASE_URL = 'http://localhost:9000/api'

export const createPostApi = createApi({
  reducerPath: 'createPostApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    createPost: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/user/post',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Post'],
    }),
  }),
})

export const { useCreatePostMutation } = createPostApi