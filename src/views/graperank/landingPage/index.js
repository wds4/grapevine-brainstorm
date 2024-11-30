import React, { useState, useEffect } from 'react'
import { useActiveUser } from 'nostr-hooks'
import CustomerStatusDoesNotExist from './customerStatusDoesNotExist'
// import CustomerStatusExists from './customerStatusExists'

/*

*/

const QueryCalculationApi = ({ pubkey }) => {
  const [exists, setExists] = useState('pending')
  const [data, setData] = useState({})

  async function fetchData(url) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      // console.log(`fetchdata qwerty: ${JSON.stringify(data)}`)
      if (!data.success) {
        setExists('query failed')
      }
      if (data.success) {
        if (data.exists) {
          setExists('YES')
        }
        if (!data.exists) {
          setExists('NO')
        }
      }
      return data
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  const url = 'https://www.graperank.tech/api/customers/queryCustomerStatus?pubkey=' + pubkey

  useEffect(() => {
    fetchData(url)
  }, [])

  if (exists == 'YES') {
    return (
      <>
        <div>CustomerStatusExists</div>
      </>
    )
  }
  if (exists == 'NO') {
    return (
      <>
        <CustomerStatusDoesNotExist pubkey={pubkey} />
      </>
    )
  }

  return (
    <div>
      <div>
        ... checking the Brainstorm Calculation Engine API for user profile with pubkey: {pubkey}{' '}
        ...
      </div>
      <div>You can try it yourself! Just go to:</div>
      <div>{url}</div>
    </div>
  )
}

const AppDashboard = () => {
  const { activeUser } = useActiveUser()
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  return <QueryCalculationApi pubkey={activeUser.pubkey} />
}

export default AppDashboard
