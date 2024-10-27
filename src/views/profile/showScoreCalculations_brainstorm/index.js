import React, { useEffect, useState } from 'react'
import { arrayToObject } from '../../../helpers'
import { convertInputToConfidence } from '../../../helpers/grapevine'

// https://calculation-brainstorm.vercel.app/api/grapevine/showFullStoredReport?name=notSpam&pubkey=e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f

const ShowScoreCalculations = ({ activeUserPubkey, pubkey }) => {
  const [areScoresSet, setAreScoresSet] = useState(false)
  const [areFollowsAndMutesSet, setAreFollowsAndMutesSet] = useState(false)

  const [followers, setFollowers] = useState([])
  const [muters, setMuters] = useState([])
  const [scores, setScores] = useState([])
  const [scoresLookup, setScoresLookup] = useState({})

  const [scorecards, setScorecards] = useState([])
  const [pubkeyLookupByUserId, setPubkeyLookupByUserId] = useState({})
  const [userIdLookupByPubkey, setUserIdLookupByPubkey] = useState({})

  const processDataAllScores = (data) => {
    const success = data.success
    if (!success) {
      console.log(`processDataAllScores: failure`)
    }
    if (success) {
      console.log(`processDataAllScores: success`)
      const oPubkeyLookupByUserId = data.data.pubkeyLookupByUserId
      setPubkeyLookupByUserId(oPubkeyLookupByUserId)
      const oScorecards = data.data.scorecardsData.scorecards
      setScorecards(oScorecards)
      const aUserIds = Object.keys(oPubkeyLookupByUserId)
      const oUserIdLookupByPubkey = {}
      for (let z = 0; z < aUserIds.length; z++) {
        const nextUserId = aUserIds[z]
        const nextUserPubkey = oPubkeyLookupByUserId[nextUserId].pubkey
        oUserIdLookupByPubkey[nextUserPubkey] = nextUserId
      }
      setUserIdLookupByPubkey(oUserIdLookupByPubkey)
      setAreScoresSet(true)
      /*
      const oScoresLookupByPubkey = arrayToObject(data, 'PubkeyHex')
      setScoresLookup(oScoresLookupByPubkey)
      setScores(data)
      */
    }
  }

  const processDataFollowersAndMuters = (data) => {
    setFollowers(data.data.aFollowers)
    setMuters(data.data.aMuters)
    setAreFollowsAndMutesSet(true)
  }

  const url1 =
    'https://calculation-brainstorm.vercel.app/api/grapevine/showFullStoredReport?name=notSpam&pubkey=' +
    activeUserPubkey
  const url2 = 'https://calculation-brainstorm.vercel.app/api/users/followers?pubkey=' + pubkey
  const triggerEndpointAllScores = (url) => {
    // console.log(`triggerEndpointAllScores with url: ${url}`)
    fetch(url)
      .then((response) => response.json())
      .then((data) => processDataAllScores(data))
  }
  const triggerEndpointFollowersAndMuters = (url) => {
    // console.log(`triggerEndpointFollowersAndMuters with url: ${url}`)
    fetch(url)
      .then((response) => response.json())
      .then((data) => processDataFollowersAndMuters(data))
  }

  useEffect(() => {
    triggerEndpointAllScores(url1)
    triggerEndpointFollowersAndMuters(url2)
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
  let averageScore = 0
  let confidence = 0
  let influence = 0
  let input = 0

  let influenceOfObservee = 0

  if (areScoresSet && areFollowsAndMutesSet) {
    const myUserId = Object.keys(scorecards.notSpam)[0] // workaround hack until I revamp data format
    const oRatees = scorecards.notSpam[myUserId]
    const observeeUserId = userIdLookupByPubkey[pubkey]
    if (
      oRatees[observeeUserId]
    ) {
      influenceOfObservee = oRatees[observeeUserId].influence
    }

    console.log(`myUserId: ${myUserId}`)
    for (let x = 0; x < followers.length; x++) {
      const pk_follower = followers[x]
      const userId_follower = userIdLookupByPubkey[pk_follower]
      let influence_follower = 0
      if (oRatees.hasOwnProperty(userId_follower)) {
        influence_follower = oRatees[userId_follower].influence
      }
      const rating = followScore
      let weight = attenuation * influence_follower * followConfidence
      if (activeUserPubkey == pk_follower) {
        weight = followConfidence
      }
      const product = rating * weight
      products += product
      weights += weight
    }

    for (let x = 0; x < muters.length; x++) {
      const pk_muter = muters[x]
      const userId_muter = userIdLookupByPubkey[pk_muter]
      let influence_muter = 0
      if (oRatees.hasOwnProperty(userId_muter)) {
        influence_muter = oRatees[userId_muter].influence
      }
      const rating = muteScore
      let weight = attenuation * influence_muter * muteConfidence
      if (activeUserPubkey == pk_muter) {
        weight = muteConfidence
      }
      const product = rating * weight
      products += product
      weights += weight
    }

    input = weights
    if (weights) {
      averageScore = products / weights
      confidence = convertInputToConfidence(weights, rigor)
      influence = averageScore * confidence
    }
  }

  return (
    <>
      <center>
        <h3>Check Calculations: brainstorm</h3>
      </center>
      <div>
        <div>
          influence score as reported by brainstorm: <span style={{ color: 'green' }}>{influenceOfObservee}</span>
        </div>
      </div>
      <br />
      {url1}
      <div>
        <div>
          <div>to check calculations, repeat them locally, using:</div>
          <li>{followers.length} follows</li>
          <li>{muters.length} muters</li>
          <li>influence scores from the brainstorm calculation engine</li>
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
