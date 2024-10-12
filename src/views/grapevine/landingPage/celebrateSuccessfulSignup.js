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
