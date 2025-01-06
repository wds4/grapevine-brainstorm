import React, { useEffect, useState } from 'react'
import { CContainer } from '@coreui/react'
import Confetti from 'react-confetti'
import { useWindowDimensions } from 'src/helpers/windowDimensions'
import PulseLoader from 'react-spinners/PulseLoader'

const CalculationsAreCompleted = () => {
  const { height, width } = useWindowDimensions()
  // const confettiColorsPurple = ['#993366']
  const confettiWind = '10'
  return (
    <>
      <CContainer>
        <Confetti width={width} height={height} wind={confettiWind} />
        <center>
          <h2>Calculation of your Grapevine is complete!!</h2>
          <p>Use the navbar on the left to:</p>
          <li>view results in table format</li>
          <li>export results as NIP-51 lists</li>
          <li>
            Worldviews: use your Grapevine to curate lists, like lists of Nostr Devs (coming soon!)
          </li>
        </center>
      </CContainer>
    </>
  )
}

const CreateCompositeWoTSummary = ({ pubkey }) => {
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

const CreateGrapeRankSummary = ({ pubkey }) => {
  // const { height, width } = useWindowDimensions()
  // const confettiColorsGreen = ['#009933']
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

  const url = `https://www.graperank.tech/api/algos/grapeRank?pubkey=${pubkey}`
  useEffect(() => {
    fetchData(url)
  }, [])
  if (wotSuccess) {
    return (
      <>
        <CContainer>
          <center>
            <h3>successfully calculated your GrapeRank Web of Trust</h3>
          </center>
          <br />
          <CreateCompositeWoTSummary pubkey={pubkey} />
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
        <h4>(This should take up to a minute or two)</h4>
      </center>
    </CContainer>
  )
}

const CreatePersonalizedPageRankSummary = ({ pubkey }) => {
  // const { height, width } = useWindowDimensions()
  // const confettiColorsGreen = ['#009933']
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
          <CreateGrapeRankSummary pubkey={pubkey} />
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

const CreateDosSummary = ({ pubkey }) => {
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
      return data
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
        <CreatePersonalizedPageRankSummary pubkey={pubkey} />
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

const CelebrateSuccessfulSignUp = ({ data, pubkey }) => {
  if (data?.success) {
    return (
      <CContainer>
        <div>
          <center>
            <h2>You are signed up to the Brainstorm: Grapevine Service (v2)</h2>
            <br />
            <CreateDosSummary pubkey={pubkey} />
          </center>
        </div>
      </CContainer>
    )
  }
  return (
    <div>
      CelebrateSuccessfulSignUp; not succes??
      <div>message from the calculation enging: {data?.message}</div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  )
}

export default CelebrateSuccessfulSignUp
