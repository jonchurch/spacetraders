import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Survey } from '../../packages/space-sdk'

import { orbitShip, dockShip, navigateShip, extractResources, refuelShip, } from '../../api'
import { useState } from "react"

export const Refuel = ({shipSymbol} : {shipSymbol: string}) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: refuelShip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ships'] })
    },
  })

  return <button 
      onClick={() => mutation.mutate(shipSymbol)}
      className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded'
    >Mine</button>
}
export const OrbitShip = ({shipSymbol}: {shipSymbol: string}) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
      mutationFn: orbitShip,
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['ships'] })
      },
    })
  return (
    <button onClick={() => mutation.mutate(shipSymbol)} 
      className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded'
    >Orbit</button>
  )
}

export const DockShip = ({shipSymbol}: {shipSymbol: string}) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
      mutationFn: dockShip,
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['ships'] })
      },
    })
  return (
    <button onClick={() => mutation.mutate(shipSymbol)} 
      className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded'
    >Dock</button>
  )
}

export const Mine = ({shipSymbol, survey}: {shipSymbol: string; survey?: Survey}) => {
  const mutation = useMutation({mutationFn: extractResources})
  return (
    <button 
      onClick={() => mutation.mutate({shipSymbol, survey})}
      className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded'
    >Mine</button>
  )
}

export const NavigateShip = ({shipSymbol, initialWaypointSymbol} : {shipSymbol: string; initialWaypointSymbol?: string}) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [waypointSymbol, setWaypointSymbol] = useState(initialWaypointSymbol);
  const queryClient = useQueryClient()
  
  const mutation = useMutation({mutationFn: navigateShip, onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['ships']})
  }});

  const handleButtonClick = () => {
    setIsNavigating(true);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWaypointSymbol(event.target.value);
  }

  const handleGoClick = () => {
    if (!waypointSymbol) {
      return
    }
    mutation.mutate({shipSymbol, waypointSymbol});
    setIsNavigating(false);
    setWaypointSymbol('')
  }

  return (
    <>
      {!isNavigating ? (
        <button 
          className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded'
          onClick={handleButtonClick}
        >
          Nav
        </button>
      ) : (
        <div>
          <input 
            type="text" 
            value={waypointSymbol} 
            onChange={handleInputChange}
            className='border-2 border-purple-500 py-1 px-2 rounded bg-purple-400'
          />
          <button 
            className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded ml-2'
            onClick={handleGoClick}
          >
            GO
          </button>
        </div>
      )}
    </>
  )
}
