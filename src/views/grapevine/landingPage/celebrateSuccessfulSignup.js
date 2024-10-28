import React, { useEffect, useState } from 'react'
import { CContainer } from '@coreui/react'
import Confetti from 'react-confetti'
import { useWindowDimensions } from 'src/helpers/windowDimensions'

const CreateScorecardsTable = ({ pubkey }) => {
  const [createScorecardsTableSuccess, setCreateScorecardsTableSuccess] = useState(false)
  const url = `https://calculation-brainstorm.vercel.app/api/grapevine/calculate/basicNetwork?name=default&pubkey=${pubkey}`
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data)
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
          <div>GrapeRank Calculations are complete and you are ready to view the table of results!!!</div>
        </CContainer>
      </>
    )
  }
  return (
    <CContainer>
      <div>... feeding Ratings into the GrapeRank calculator ...</div>
    </CContainer>
  )
}

const CreateRatingsTable = ({ pubkey }) => {
  const [createRatingsTableSuccess, setCreateRatingsTableSuccess] = useState(false)
  const url = `https://interpretation-brainstorm.vercel.app/api/requestInterpretation?req={"universalInterpretationProtocolID":"recommendedBrainstormNotBotsInterpretationProtocol","parameters":{"context":"notSpam","pubkeys":["${pubkey}"],"depth":5,"follows":{"score":1.0,"confidence":0.05},"mutes":{"score":0.0,"confidence":0.10}}}`
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data)
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
          <div>successfully created Ratings Table.</div>
        </CContainer>
        <CreateScorecardsTable pubkey={pubkey} />
      </>
    )
  }
  return (
    <CContainer>
      <div>... interpreting raw data to create the Ratings Table ...</div>
    </CContainer>
  )
}

const CreateDosSummary = ({ pubkey }) => {
  const [dosSuccess, setDosSuccess] = useState(false)
  const url = `https://interpretation-brainstorm.vercel.app/api/manageData/singleUser/createDosSummary?pubkey=${pubkey}`
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data)
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
          <div>successfully calculated Degrees of Separation.</div>
        </CContainer>
        <CreateRatingsTable pubkey={pubkey} />
      </>
    )
  }
  return (
    <CContainer>
      <div>... calculating Degrees of Separation ...</div>
    </CContainer>
  )
}

const CelebrateSuccessfulSignUp = ({ data, pubkey }) => {
  const { height, width } = useWindowDimensions()
  if (data.success) {
    return (
      <CContainer>
        <Confetti width={width} height={height} />
        <div>
          <center>
            <h1>SUCCESS</h1>
            <br />
            <br />
            <h2>You are now ready to set up your Grapevine!!!</h2>
            <br />
            <h3>
              Central to the Grapevine experience is the <i>Worldview</i>, which provides the
              high-level summary + control panel for the information that your Grapevine curates for
              you.
            </h3>
            <br />
            <h3>Refresh the page and set up your first Worldview!</h3>
          </center>
        </div>
        <CreateDosSummary pubkey={pubkey} />
      </CContainer>
    )
  }
  return (
    <div>
      CelebrateSuccessfulSignUp; not succes??
      <div>message from the calculation enging: {data.message}</div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  )
}

export default CelebrateSuccessfulSignUp
