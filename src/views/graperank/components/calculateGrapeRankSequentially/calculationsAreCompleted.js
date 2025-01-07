import React from 'react'
import { CContainer } from '@coreui/react'
import Confetti from 'react-confetti'
import { useWindowDimensions } from 'src/helpers/windowDimensions'
import WotHighlightsNav from 'src/views/graperank/components/wotHighlightsNav'

const CalculationsAreCompleted = ({ pubkey }) => {
  const { height, width } = useWindowDimensions()
  // const confettiColorsPurple = ['#993366']
  const confettiWind = '10'
  return (
    <>
      <CContainer>
        <Confetti width={width} height={height} wind={confettiWind} />
        <center>
          <h3>Calculation of your Grapevine is complete!</h3>
          <WotHighlightsNav pubkey={pubkey} />
        </center>
      </CContainer>
    </>
  )
}

export default CalculationsAreCompleted
