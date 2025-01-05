import { CButton, CCard, CCardBody, CCardTitle, CContainer, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import MiniProfile from 'src/views/components/miniProfile'

const ShowShortestPath = ({ from_pubkey, to_pubkey }) => {
  console.log(`rerender ShowShortestPath`)

  const [aPubkeys, setAPubkeys] = useState([])
  async function fetchArrayOfPubkeys({ url }) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      if (data.success) {
        const aPubs = data.data.aPubkeys
        setAPubkeys(aPubs)
        console.log(`fetchArrayOfPubkeys success! aPubs: ${JSON.stringify(aPubs)}`)
      }
    } catch (error) {
      console.error('getFollows endpoint error:', error)
    }
  }
  const findShortestPath = () => {
    const url = `https://www.graperank.tech/api/neo4j/getShortestPath?pubkey1=${from_pubkey}&pubkey2=${to_pubkey}`
    console.log(`findShortestPath; url: ${url}`)
    fetchArrayOfPubkeys({ url })
  }
  if (!from_pubkey || !to_pubkey) {
    return <></>
  }

  useEffect(() => {
    findShortestPath()
  }, [])

  return (
    <>
      <CContainer md>
        <CRow className="justify-content-center">
          <div className="col-auto">
            <CCard className="w-80">
              <CCardBody>
                <center>
                  <CCardTitle>
                    Shortest Path by Follows
                    <NumHops aPubkeys={aPubkeys} />
                  </CCardTitle>
                </center>
              </CCardBody>
              <CCardBody>
                {aPubkeys.map((pk, item) => {
                  return (
                    <div key={item}>
                      <FollowsDownArrow item={item} />
                      <div>
                        <MiniProfile pubkey={pk} />
                      </div>
                    </div>
                  )
                })}
              </CCardBody>
            </CCard>
          </div>
        </CRow>
      </CContainer>
    </>
  )
}

const NumHops = ({ aPubkeys }) => {
  if (aPubkeys.length == 0) {
    return <></>
  }
  return <>: {aPubkeys.length - 1} hops</>
}

const FollowsDownArrow = ({ item }) => {
  if (item > 0) {
    return (
      <div style={{ fontSize: '36px' }}>
        <center>⬇️</center>
      </div>
    )
  }
  return <></>
}

export default ShowShortestPath
