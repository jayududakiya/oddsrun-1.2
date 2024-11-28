import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const InitAPICall = () => {

    const dispatch = useDispatch()
    useEffect(() =>{

        const data = {
            sport: 'soccer',
            market: '1X2',
            timeFilter: '1h',
        };
        // dispatch(loadDroppingOdds(data));

    },[])

  return (
    <div>InitAPICall</div>
  )
}

export default InitAPICall