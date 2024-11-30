import React, { useState, useEffect } from 'react'
import { useActiveUser } from 'nostr-hooks'
// import CustomerStatusDoesNotExist from './customerStatusDoesNotExist'
// import CustomerStatusExists from './customerStatusExists'

/*

*/

const QueryCalculationApi = ({ pubkey }) => {
  const [exists, setExists] = useState('pending')
  const [data, setData] = useState({})

  // const url = 'https://calculation-brainstorm.vercel.app/api/grapevine/checkCustomerStatus?pubkey=' + pubkey
  const url = 'https://www.graperank.tech/api/customers/queryCustomerStatus?pubkey=' + pubkey
  useEffect(() => {
    fetch(url)
      .then((response) => console.log(`qwerty ${typeof response} ${JSON.stringify(response, null, 4)}`))
      .then((data) => console.log(`qwerty2 ${typeof data}`))
      .catch((error) => console.error(error))
    /*
      .then((response) => response.json())
      // .then(data => setResp(response))
      .then((data) => {
        setData(data)
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
      })
        */
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
        <div>CustomerStatusDoesNotExist</div>
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
