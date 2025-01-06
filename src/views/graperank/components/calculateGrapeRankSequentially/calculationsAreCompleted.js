import React from 'react'
import { CContainer } from '@coreui/react'
import Confetti from 'react-confetti'
import { useWindowDimensions } from 'src/helpers/windowDimensions'

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

export default CalculationsAreCompleted
