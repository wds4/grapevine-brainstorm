import React from 'react'
import { CContainer } from '@coreui/react'
import Confetti from 'react-confetti'
import { useWindowDimensions } from 'src/helpers/windowDimensions'

const CelebrateSuccessfulSignUp = ({ data }) => {
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
            <h2>Your Grapevine is being calculated!!!</h2>
            <br />
            <h3>
              coming soon: [You will receive a DM once this is complete. (Should take just a few
              minutes.)]
            </h3>
          </center>
        </div>
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
