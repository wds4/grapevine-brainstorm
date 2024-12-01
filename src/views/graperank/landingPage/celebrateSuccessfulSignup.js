import React, { useEffect, useState } from 'react'
import { CContainer } from '@coreui/react'
import Confetti from 'react-confetti'
import { useWindowDimensions } from 'src/helpers/windowDimensions'
import PulseLoader from 'react-spinners/PulseLoader'

const CelebrateSuccessfulSignUp = ({ data, pubkey }) => {
  if (data?.success) {
    return (
      <CContainer>
        <div>
          <center>
            <h2>You are signed up to the Brainstorm: Grapevine Service.</h2>
            <br />
            <div>Todo: calculate DoS</div>
            <div>Todo: calculate personalized PageRank</div>
            <div>Todo: calculate personalized GrapeRank</div>
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
