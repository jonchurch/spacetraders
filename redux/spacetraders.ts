// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FleetApi, Ship } from '@/packages/space-sdk'
import { config } from '../api'

// Define a service using a base URL and expected endpoints
export const spacetradersApi = createApi({
  reducerPath: 'spacetradersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacetraders.io/v2/' }),
  endpoints: (builder) => ({
     getShips: builder.query<Ship[], void>({
      queryFn: async () => {
        const fleet = new FleetApi(config)
        try {
          const { data } = await fleet.getMyShips()
          return { data }
        } catch (error) {
          return {error: {message: 'oops'}}
        }
      }
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetShipsQuery } = spacetradersApi
