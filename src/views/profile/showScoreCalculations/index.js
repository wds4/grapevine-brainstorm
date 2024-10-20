import React, { useEffect, useState } from 'react'
import { arrayToObject } from '../../../helpers'
import { convertInputToConfidence } from '../../../helpers/grapevine'

const ShowScoreCalculations = ({ activeUserPubkey, pubkey }) => {
  const [followers, setFollowers] = useState([])
  const [scores, setScores] = useState([])
  const [scoresLookup, setScoresLookup] = useState({})

  const processDataAllScores = (data) => {
    console.log(`typeof data: ${data.length}`)
    const oScoresLookupByPubkey = arrayToObject(data, 'PubkeyHex')
    setScoresLookup(oScoresLookupByPubkey)
    setScores(data)
  }
  const processDataFollowers = (data) => {
    console.log(`typeof data: ${data.length}`)
    setFollowers(data)
  }

  const url1 = 'https://gv.rogue.earth/api/members/' + activeUserPubkey + '/gvscores'
  const url2 = 'https://gv.rogue.earth/api/members/' + pubkey + '/followers'
  const triggerEndpointAllScores = (url) => {
    console.log(`triggerEndpointAllScores with url: ${url}`)
    fetch(url)
      .then((response) => response.json())
      .then((data) => processDataAllScores(data))
  }
  const triggerEndpointFollowers = (url) => {
    console.log(`triggerEndpointFollowers with url: ${url}`)
    fetch(url)
      .then((response) => response.json())
      .then((data) => processDataFollowers(data))
  }

  useEffect(() => {
    triggerEndpointAllScores(url1)
    triggerEndpointFollowers(url2)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!followers) {
    return <div>no followers</div>
  }
  if (!scores) {
    return <div>no scores</div>
  }

  const followScore = 1
  const followConfidence = 0.05
  const muteScore = 0
  const muteConfidence = 0.1
  const rigor = 0.25
  const attenuation = 0.8

  let weights = 0
  let products = 0

  for (let x = 0; x < followers.length; x++) {
    const pk = followers[x]
    let raterInfluenceScore = scoresLookup[pk]?.Score
    if (!raterInfluenceScore) {
      raterInfluenceScore = 0
    }
    const rating = followScore
    let weight = attenuation * raterInfluenceScore * followConfidence
    if (activeUserPubkey == pk) {
      weight = followConfidence
    }
    const product = rating * weight
    products += product
    weights += weight
    console.log(`pk: ${pk}; raterInfluenceScore: ${raterInfluenceScore}`)
  }
  let averageScore = 0
  let confidence = 0
  let influence = 0
  const input = weights
  if (weights) {
    averageScore = products / weights
    confidence = convertInputToConfidence(weights, rigor)
    influence = averageScore * confidence
  }

  return (
    <>
      <center>
        <h3>Check Calculations</h3>
      </center>
      <div>
        <div>
          influence score as reported by gv.rogue.earth:{' '}
          <span style={{ color: 'green' }}>{scoresLookup[pubkey]?.Score}</span>
        </div>
      </div>
      <br />
      <div>
        <div>
          <div>to check calculations, repeat them locally, using:</div>
          <li>{followers.length} follows</li>
          <li>influence scores from gv.rogue.earth</li>
          <li>attenuation: {attenuation}</li>
          <li>rigor: {rigor}</li>
          <li>follow score: {followScore}</li>
          <li>follow confidence: {followConfidence}</li>
        </div>
        <br />
        <div>Results:</div>
        <div>
          influence: <span style={{ color: 'green' }}>{influence}</span>
        </div>
        <div>averageScore: {averageScore}</div>
        <div>confidence: {confidence}</div>
        <div>weights (a.k.a. input): {input}</div>
        <div>products: {products}</div>
      </div>
    </>
  )
}

export default ShowScoreCalculations
