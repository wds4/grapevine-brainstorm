import React from 'react'
import { Chart } from 'react-google-charts'
import { convertInputToConfidence } from '../../../../../helpers/grapevine'

const RigorChart = ({ rigor }) => {
  const aData = []
  aData.push(['PageRank', 'pubkey'])
  for (let input = 0; input < 500; input++) {
    const confidence = convertInputToConfidence(input / 10, rigor)

    aData.push([input / 10, confidence * 100])
  }
  return (
    <>
      <Chart
        chartType="ScatterChart"
        data={aData}
        options={{
          title: 'Rigor determines the relationship between input and confidence',
          hAxis: { title: 'input' },
          vAxis: { title: 'confidence (%)' },
        }}
        legendToggle
      />
    </>
  )
}

export default RigorChart
