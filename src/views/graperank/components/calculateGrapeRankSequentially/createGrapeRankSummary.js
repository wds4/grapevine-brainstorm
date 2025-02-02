import React, { useEffect, useState } from 'react'
import { CContainer } from '@coreui/react'
import PulseLoader from 'react-spinners/PulseLoader'
import CreateCompositeWoTSummary from './createCompositeWoTSummary'

const CreateGrapeRankSummary = ({ pubkey, grapeRankParams }) => {
  // const { height, width } = useWindowDimensions()
  // const confettiColorsGreen = ['#009933']
  const [wotSuccess, setWotSuccess] = useState(false)

  async function fetchData(url) {
    try {
      const response = await fetch(url, {
        timeout: 120000, // 1200 seconds
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      // console.log(`fetchData: ${JSON.stringify(data)}`)
      if (!data.success) {
        setExists('GrapeRank calculations failed')
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
      console.error('api/algos/grapeRank endpoint error:', error)
    }
  }

  let url = `https://www.graperank.tech/api/algos/grapeRank?pubkey=${pubkey}`
  if (grapeRankParams.attenuationFactor) {
    url += `&attenuationFactor=${grapeRankParams.attenuationFactor}`
  }
  if (grapeRankParams.rigor) {
    url += `&rigor=${grapeRankParams.rigor}`
  }
  if (grapeRankParams.followConfidence) {
    url += `&followConfidence=${grapeRankParams.followConfidence}`
  }
  if (grapeRankParams.muteConfidence) {
    url += `&muteConfidence=${grapeRankParams.muteConfidence}`
  }
  if (grapeRankParams.followRating) {
    url += `&followRating=${grapeRankParams.followRating}`
  }
  if (grapeRankParams.muteRating) {
    url += `&muteRating=${grapeRankParams.muteRating}`
  }
  if (grapeRankParams.followConfidenceOfObserver) {
    url += `&followConfidenceOfObserver=${grapeRankParams.followConfidenceOfObserver}`
  }
  useEffect(() => {
    fetchData(url)
  }, [])
  if (wotSuccess) {
    return (
      <>
        <CContainer>
          <center>
            <h4>WoT 3: GrapeRank ✅</h4>
          </center>
          <br />
          <CreateCompositeWoTSummary pubkey={pubkey} grapeRankParams={grapeRankParams} />
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
          calculating your GrapeRank Web of Trust{' '}
          <div style={{ display: 'inline-block' }}>
            <PulseLoader />
          </div>
        </h3>
        <h4>(This should take up to a minute)</h4>
      </center>
    </CContainer>
  )
}

export default CreateGrapeRankSummary
