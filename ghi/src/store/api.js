import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { clearForm } from './userSlice';

export const apiSlice = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_FAST_API,
    prepareHeaders: async (headers, { getState }) => {
      const selector = apiSlice.endpoints.getToken.select();
      const { data: tokenData } = selector(await getState());
      if (tokenData && tokenData.access_token) {
        headers.set('Authorization', `Bearer ${tokenData.access_token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['User', 'Games', 'Token', 'List'],
  endpoints: builder => ({
    signUp: builder.mutation({
      query: data => ({
        url: '/api/users',
        method: 'post',
        body: data,
        credentials: 'include',
      }),
      providesTags: ['User'],
      invalidatesTags: result => {
        return (result && ['Token']) || [];
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearForm());
        } catch (err) { }
      },
    }),
    login: builder.mutation({
      query: info => {
        let formData = null;
        if (info instanceof HTMLElement) {
          formData = new FormData(info);
        } else {
          formData = new FormData();
          formData.append('username', info.username);
          formData.append('password', info.password);
        }
        return {
          url: '/token',
          method: 'post',
          body: formData,
          credentials: 'include',
        };
      },
      providesTags: ['User'],
      invalidatesTags: result => {
        return (result && ['Token']) || [];
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearForm());
        } catch (err) { }
      },
    }),
    logOut: builder.mutation({
      query: () => ({
        url: '/token',
        method: 'delete',
        credentials: 'include',
      }),
      invalidatesTags: ['User', 'Token', 'Games'],
    }),
    getToken: builder.query({
      query: () => ({
        url: '/token',
        credentials: 'include',
      }),
      providesTags: ['Token'],
    }),
    getGames: builder.query({
      query: () => ({
        url: '/api/games',
        credentials: 'include'
      }),
      providesTags: data => {
        const tags = [{ type: 'Games', id: 'LIST' }];
        if (!data || !data.games) return tags;

        const { games } = data;
        if (games) {
          tags.concat(...games.map(({ id }) => ({ type: 'Games', id })));
        }
        return tags;
      }
    }),
  }),
})

export const {
  useLoginMutation,
  useLogOutMutation,
  useSignUpMutation,
  useGetGamesQuery,
  useGetTokenQuery,
} = apiSlice