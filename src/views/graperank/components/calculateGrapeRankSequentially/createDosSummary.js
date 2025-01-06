import React, { useEffect, useState } from 'react'
import { CContainer } from '@coreui/react'
import PulseLoader from 'react-spinners/PulseLoader'
import CreatePersonalizedPageRankSummary from './createPersonalizedPageRankSummary'

const CreateDosSummary = ({ pubkey, grapeRankParams }) => {
  const [dosSuccess, setDosSuccess] = useState(false)

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
          setDosSuccess(true)
        }
        if (!data.exists) {
          setDosSuccess(false)
        }
      }
      // return data
    } catch (error) {
      console.error('api/algos/dos/fullWoT_updateS3 endpoint error:', error)
    }
  }

  const url = `https://www.graperank.tech/api/algos/dos/fullWoT_updateS3?pubkey=${pubkey}`
  useEffect(() => {
    fetchData(url)
  }, [])
  if (dosSuccess) {
    return (
      <>
        <CContainer>
          <center>
            <h3>successfully calculated your Degrees of Separation (DoS) Web of Trust</h3>
          </center>
        </CContainer>
        <br />
        <CreatePersonalizedPageRankSummary pubkey={pubkey} grapeRankParams={grapeRankParams} />
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
          calculating Degrees of Separation{' '}
          <div style={{ display: 'inline-block' }}>
            <PulseLoader />
          </div>
        </h3>
        <h4>(This should take 25-30 secs; maybe up to a minute or two)</h4>
      </center>
    </CContainer>
  )
}

export default CreateDosSummary
