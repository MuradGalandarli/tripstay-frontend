import { createApi  } from '@reduxjs/toolkit/query/react'
// import { baseQuery } from "./baseQuery"
import { baseQueryWithReauth } from './baseQueryWithReauth'

export const baseApi = createApi({
   
  reducerPath: 'api',
  baseQuery:baseQueryWithReauth,
  endpoints:()=>({}),
  })
