import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    // baseUrl: "",
    baseUrl: import.meta.env.VITE_APP_API_URI,
    // mode: "cors",
    // prepareHeaders: (headers) => {
    //   headers.set("Access-Control-Allow-Origin", "*");
    //   headers.set(
    //     "Access-Control-Allow-Methods",
    //     "GET, POST, PUT,PATCH, DELETE, OPTIONS"
    //   );
    //   return headers;
    // },
    credentials: "include",
  }),
  tagTypes: ["myCodes"],
  endpoints: (builder) => ({
    saveCode: builder.mutation({
      query: (fullCode) => ({
        url: "/api/compiler/save",
        method: "POST",
        body: fullCode,
      }),
      invalidatesTags: ["myCodes"],
    }),
    loadCode: builder.mutation({
      query: (body) => ({
        url: "/api/compiler/load",
        method: "POST",
        body: body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/api/user/login",
        method: "POST",
        body: body,
        credentials: "include",
      }),
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: "/api/user/signup",
        method: "POST",
        body: body,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/user/logout",
        method: "POST",
      }),
    }),
    getUserDetails: builder.query({
      query: () => ({
        url: "/api/user/user-details",
        cache: "no-store",
      }),
    }),
    getMyCodes: builder.query({
      query: () => ({
        url: "/api/user/my-codes",
      }),
      providesTags: ["myCodes"],
    }),
    getAllCodes: builder.query({
      query: () => ({
        url: "/api/compiler/all-codes",
        cache: "no-store",
      }),
      providesTags: ["myCodes"],
    }),
    deleteCode: builder.mutation({
      query: (_id) => ({
        url: `/api/compiler/delete/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["myCodes"],
    }),
  }),
});

export const {
  useSaveCodeMutation,
  useLoadCodeMutation,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useGetUserDetailsQuery,
  useGetMyCodesQuery,
  useDeleteCodeMutation,
  useGetAllCodesQuery,
} = authApi;
