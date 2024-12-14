import React, { useEffect, useState } from 'react'
import { CContainer } from '@coreui/react'
import PulseLoader from 'react-spinners/PulseLoader'
import CreateGrapeRankSummary from './createGrapeRankSummary'

const CreatePersonalizedPageRankSummary = ({ pubkey, grapeRankParams }) => {
  const [wotSuccess, setWotSuccess] = useState(false)

  async function fetchData(url) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      // console.log(`fetchData: ${JSON.stringify(data)}`)
      if (!data.success) {
        setExists('DoS calculations failed')
      }
      if (data.success) {
        if (data.exists) {
          setWotSuccess(true)
        }
        if (!data.exists) {
          setWotSuccess(false)
        }
      }
      return data
    } catch (error) {
      console.error('api/algos/personalizedPageRank/fullWoT_updateS3 endpoint error:', error)
    }
  }

  const url = `https://www.graperank.tech/api/algos/personalizedPageRank/fullWoT_updateS3?pubkey=${pubkey}`
  useEffect(() => {
    fetchData(url)
  }, [])
  if (wotSuccess) {
    return (
      <>
        <CContainer>
          <center>
            <h3>successfully calculated your Personalized PageRank Web of Trust</h3>
          </center>
          <br />
          <CreateGrapeRankSummary pubkey={pubkey} grapeRankParams={grapeRankParams} />
        </CContainer>
      </>
    )
  }
  return (
    <CContainer>
      <center>
        <h3>
          {' '}
          <div style={{ display: 'inline-block' }}>
            <PulseLoader />
          </div>{' '}
          calculating Personalized PageRank{' '}
          <div style={{ display: 'inline-block' }}>
            <PulseLoader />
          </div>
        </h3>
        <h4>(This should take 20 secs; maybe up to a minute or two)</h4>
      </center>
    </CContainer>
  )
}

export default CreatePersonalizedPageRankSummary
