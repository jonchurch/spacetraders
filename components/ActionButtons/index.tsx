import { useCallback, useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PurchaseShipRequest, Ship, Survey } from '@spacejunk/airlock'

import { orbitShip, dockShip, navigateShip, extractResources, refuelShip, sellAllCargo, badRequest, purchaseShip, } from '../../api'
import { run } from "@/test"

export const MakeError = () => {
  const handleClick = useCallback(() => {
    run()
      // .catch((err: unknown) => console.log(err.data))
  }, [])
  return (
  <button 
      className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
      onClick={handleClick}
    >Bad!</button>
  )
}

export const PurchaseShip = ({waypointSymbol, shipType, disabled}: PurchaseShipRequest & {disabled?: boolean}) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: purchaseShip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ships']})
    }
  })
  return <button 
        disabled={disabled}
        onClick={() => mutation.mutate({waypointSymbol, shipType})}
        className='bg-green-500 hover:bg-green-700 disabled:bg-gray-500 text-white font-bold py-1 px-2 rounded'
      >Purchase</button>
}

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
    >Refuel</button>
}

export const SellAllCargo = ({ship}: {ship: Ship}) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: sellAllCargo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['ships']})
    },
  })
  return <button 
      onClick={() => mutation.mutate({shipSymbol: ship.symbol, inventory: ship.cargo.inventory})}
      className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded'
    >Sell All</button>
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
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: extractResources,
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['shipCooldown', shipSymbol]})
      }
  })
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
