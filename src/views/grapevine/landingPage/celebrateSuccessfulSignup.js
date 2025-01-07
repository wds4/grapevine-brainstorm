import React, { useEffect, useState } from 'react'
import { CContainer } from '@coreui/react'
import Confetti from 'react-confetti'
import { useWindowDimensions } from 'src/helpers/windowDimensions'
import PulseLoader from 'react-spinners/PulseLoader'
import WotHighlightsNav from 'src/views/graperank/components/wotHighlightsNav'

const CreateScorecardsTable = ({ pubkey }) => {
  const { height, width } = useWindowDimensions()
  // const confettiColorsPurple = ['#993366']
  const confettiWind = '10'
  const [createScorecardsTableSuccess, setCreateScorecardsTableSuccess] = useState(false)
  const url = `https://calculation-brainstorm.vercel.app/api/grapevine/calculate/basicNetwork?name=default&pubkey=${pubkey}`
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.log('Interpretation failed')
        }
        if (data.success) {
          setCreateScorecardsTableSuccess(true)
        }
      })
  }, [])
  if (createScorecardsTableSuccess) {
    return (
      <>
        <CContainer>
          <Confetti width={width} height={height} wind={confettiWind} />
          <center>
            <h3>Calculation of your Grapevine is complete!</h3>
          </center>
          <WotHighlightsNav pubkey={pubkey} />
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
          feeding Ratings into the GrapeRank calculator{' '}
          <div style={{ display: 'inline-block' }}>
            <PulseLoader />
          </div>
        </h3>
        <h4>(This may take 3 or 4 min)</h4>
      </center>
    </CContainer>
  )
}

const CreateRatingsTable = ({ pubkey }) => {
  const { height, width } = useWindowDimensions()
  const confettiColorsBrown = ['#663300']
  const [createRatingsTableSuccess, setCreateRatingsTableSuccess] = useState(false)
  const url = `https://interpretation-brainstorm.vercel.app/api/requestInterpretation?req={"universalInterpretationProtocolID":"recommendedBrainstormNotBotsInterpretationProtocol","parameters":{"context":"notSpam","pubkeys":["${pubkey}"],"depth":5,"follows":{"score":1.0,"confidence":0.05},"mutes":{"score":0.0,"confidence":0.10}}}`
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.log('Interpretation failed')
        }
        if (data.success) {
          setCreateRatingsTableSuccess(true)
        }
      })
  }, [])
  if (createRatingsTableSuccess) {
    return (
      <>
        <CContainer>
          <center>
            <h3>successfully created Ratings Table.</h3>
          </center>
          <br />
        </CContainer>
        <CreateScorecardsTable pubkey={pubkey} />
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
          interpreting raw data to create the Ratings Table{' '}
          <div style={{ display: 'inline-block' }}>
            <PulseLoader />
          </div>
        </h3>
        <h4>(This may take 2 or 3 min)</h4>
      </center>
    </CContainer>
  )
}

/*
      <Confetti
        width={width}
        height={height}
        colors={confettiColorsBrown}
        drawShape={(ctx) => {
          ctx.beginPath()
          for (let i = 0; i < 22; i++) {
            const angle = 0.35 * i
            const x = (0.2 + 1.5 * angle) * Math.cos(angle)
            const y = (0.2 + 1.5 * angle) * Math.sin(angle)
            ctx.lineTo(x, y)
          }
          ctx.stroke()
          ctx.closePath()
        }}
      />
*/

const CreateDosSummary = ({ pubkey }) => {
  // const { height, width } = useWindowDimensions()
  // const confettiColorsGreen = ['#009933']
  const [dosSuccess, setDosSuccess] = useState(false)
  const url = `https://interpretation-brainstorm.vercel.app/api/manageData/singleUser/createDosSummary?pubkey=${pubkey}`
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.log('DoS Summary failed')
        }
        if (data.success) {
          setDosSuccess(true)
        }
      })
  }, [])
  if (dosSuccess) {
    return (
      <>
        <CContainer>
          <center>
            <h3>successfully calculated Degrees of Separation.</h3>
          </center>
          <br />
        </CContainer>
        <CreateRatingsTable pubkey={pubkey} />
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
        <h4>(This may take a minute or two)</h4>
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
            <h2>You are signed up to the Brainstorm: Grapevine Service.</h2>
            <br />
            <h2>Your Grapevine is being calculated!!!</h2>
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
