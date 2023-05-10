// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Ship } from '@/packages/space-sdk'

// Define a service using a base URL and expected endpoints
export const spacetradersApi = createApi({
  reducerPath: 'spacetradersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacetraders.io/v2/', prepareHeaders: (headers) => {
    if (process.env.TOASTY) {
      headers.set('authorization', `Bearer ${process.env.TOASTY}`)
    }
  } }),
  endpoints: (builder) => ({
     getShips: builder.query<Ship[], void>({
      query: () => '/my/ships'
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetShipsQuery } = spacetradersApi
