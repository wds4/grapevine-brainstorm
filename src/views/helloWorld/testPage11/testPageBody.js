import React from 'react'
import Confetti from 'react-confetti'
import { useWindowDimensions } from '../../../helpers/windowDimensions';

const TestPageBody = () => {
  const { height, width } = useWindowDimensions()

  return <Confetti width={width} height={height} />
}

export default TestPageBody
