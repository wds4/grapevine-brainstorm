import { useActiveUser } from 'nostr-hooks'
import React, { useEffect, useState } from 'react'

const CustomerStatusExists = ({ pubkey, grapeRankParams }) => {
  return (
    <>
      <div>CustomerStatusExists</div>
      <div>pubkey: {pubkey}</div>
      <div>grapeRankParams: {JSON.stringify(grapeRankParams, null, 4)}</div>
    </>
  )
}

const QueryCustomerStatus = ({ pubkey }) => {
  const [exists, setExists] = useState('pending')
  const [data, setData] = useState({})
  const [grapeRankParams, setGrapeRankParams] = useState({})

  const url = 'https://www.graperank.tech/api/customers/queryCustomerStatus?pubkey=' + pubkey
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        if (!data.success) {
          setExists('query failed')
        }
        if (data.success) {
          if (data.exists) {
            setExists('YES')
            const oCustomerData = data.data.oCustomerData
            const oGrapeRankParams = oCustomerData.grapeRankParams
            setGrapeRankParams(oCustomerData)
          }
          if (!data.exists) {
            setExists('NO')
          }
        }
      })
  }, [])

  if (exists == 'YES') return <CustomerStatusExists pubkey={pubkey} grapeRankParams={grapeRankParams} />
  if (exists == 'NO') return <p>Pubkey {pubkey} is not a customer of the Grapevine (v2).</p>

  return (
    <div>
      <div>
        ... checking the Brainstorm Calculation Engine API for user profile with pubkey: {pubkey}{' '}
        ...
      </div>
    </div>
  )
}

const CheckingActiveUser = () => {
  console.log(`rerender CheckingActiveUser`)
  const { activeUser } = useActiveUser()
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  return <QueryCustomerStatus pubkey={activeUser.pubkey} />
}

const FeatureB = () => {
  return (
    <>
      <center>
        <h3>Calculate your Follows Network</h3>
      </center>
      <CheckingActiveUser />
      <div>
        <p>hippity hoppity hop!</p>
      </div>
    </>
  )
}

export default FeatureB
