import React, { useEffect, useState } from 'react'
import { CContainer } from '@coreui/react'
import Confetti from 'react-confetti'
import { useWindowDimensions } from 'src/helpers/windowDimensions'
import PulseLoader from 'react-spinners/PulseLoader'
import CalculationsAreCompleted from './calculationsAreCompleted'

const CreateCompositeWoTSummary = ({ pubkey, grapeRankParams }) => {
  const { height, width } = useWindowDimensions()
  // const confettiColorsGreen = ['#009933']
  const [wotSuccess, setWotSuccess] = useState(false)

  async function fetchData(url) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      if (!data.success) {
        setExists('file creation failed')
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
      console.error('api/algos/combineAllWebsOfTrust/outputToS3 endpoint error:', error)
    }
  }

  const url = `https://www.graperank.tech/api/algos/combineAllWebsOfTrust/outputToS3?pubkey=${pubkey}`
  useEffect(() => {
    fetchData(url)
  }, [])
  if (wotSuccess) {
    return (
      <>
        <CContainer>
          <Confetti width={width} height={height} />
          <center>
            <h3>successfully gathered data into your Composite Web of Trust file.</h3>
          </center>
          <br />
        </CContainer>
        <CalculationsAreCompleted />
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
          creating composite file of webs of trust (DoS and Personalized PageRank){' '}
          <div style={{ display: 'inline-block' }}>
            <PulseLoader />
          </div>
        </h3>
        <h4>(This should take 20 secs; maybe up to a minute or two)</h4>
      </center>
    </CContainer>
  )
}

export default CreateCompositeWoTSummary