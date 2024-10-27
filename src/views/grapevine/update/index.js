import React, { useEffect, useState } from 'react'
import { useActiveUser } from 'nostr-hooks'
import UpdateMyFollowsAndMutes from './updateMyFollowsAndMutes'
import TransferMyFollowsAndMutes from './transferMyFollowsAndMutes'
import CreateMyObserverObject from './createMyObserverObject'
import CreateDosSummary from './createDosSummary'
import CreateRatingsTable from './createRatingsTable'
import CalculateGrapevineNetwork from './calculateGrapevineNetwork'
import { secsToTime } from '../../../helpers'

/*
https://interpretation-brainstorm.vercel.app/api/manageData/singleUser/createDosSummary?pubkey=e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f
then update View your Grapevine page with DoS data
*/

const UpdateDashboard = ({ pubkey }) => {
  const [action1, setAction1] = useState('?')
  const [action2, setAction2] = useState('?')
  const [action3, setAction3] = useState('?')
  const [action4, setAction4] = useState('?')
  const [action5, setAction5] = useState('?')
  const [action6, setAction6] = useState('?')

  const [whenSignedUp, setWhenSignedUp] = useState(0)
  const url = `https://interpretation-brainstorm.vercel.app/api/manageData/singleUser/controller?pubkey=${pubkey}`
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(`data: ${JSON.stringify(data, null, 4)}`)
        if (data.data.whenSignedUp) {
          // console.log(`resetting data.data.whenSignedUp: ${data.data.whenSignedUp}`)
          setWhenSignedUp(data.data.whenSignedUp)
        }
        /* */
        if (data.data.lastUpdated_scorecardsTables == 0) {
          setAction6('NEVER BEEN DONE')
        }
        if (data.data.lastUpdated_scorecardsTables > 0) {
          setAction6(`last performed: ${secsToTime(data.data.lastUpdated_scorecardsTables)}`)
        }

        /* */
        if (data.data.lastUpdated_ratingsTables == 0) {
          setAction5('NEVER BEEN DONE')
        }
        if (data.data.lastUpdated_ratingsTables > 0) {
          setAction5(`last performed: ${secsToTime(data.data.lastUpdated_ratingsTables)}`)
        }

        /* */
        if (data.data.lastUpdated_dosSummaries == 0) {
          setAction4('NEVER BEEN DONE')
        }
        if (data.data.lastUpdated_dosSummaries > 0) {
          setAction4(`last performed: ${secsToTime(data.data.lastUpdated_dosSummaries)}`)
        }

        /* */
        if (data.data.lastCreated_observerObject == 0) {
          setAction3('NEVER BEEN DONE')
        }
        if (data.data.lastCreated_observerObject > 0) {
          setAction3(`last performed: ${secsToTime(data.data.lastCreated_observerObject)}`)
        }

        /* */
        setAction2(`${data.data.numFollows} FOLLOWS AND ${data.data.numMutes} MUTES TO TRANSFER`)
        if (data.data.haveFollowsAndMutesBeenInput) {
          if (!data.data.numFollows && !data.data.numMutes) {
            setAction2('none to transfer')
          } else {
            setAction2(
              `${data.data.numFollows} follows and ${data.data.numMutes} mutes, but they've already been transferred`,
            )
          }
        }
        if (!data.data.numFollows && !data.data.numMutes) {
          setAction2('none to transfer')
        }

        /* */
        if (data.data.lastQueried_followsAndMutes == 0) {
          setAction1('NEVER BEEN DONE')
        }
        if (data.data.lastQueried_followsAndMutes > 0) {
          setAction1(`last performed: ${secsToTime(data.data.lastQueried_followsAndMutes)}`)
        }
      })
  }, [])
  return (
    <>
      <center>
        <h3>Update your Grapevine and DoS WoT Networks</h3>
      </center>
      <div>whenSignedUp: {secsToTime(whenSignedUp)}</div>
      <UpdateMyFollowsAndMutes pubkey={pubkey} action={action1} />
      <TransferMyFollowsAndMutes pubkey={pubkey} action={action2} />
      <CreateMyObserverObject pubkey={pubkey} action={action3} />
      <CreateDosSummary pubkey={pubkey} action={action4} />
      <CreateRatingsTable pubkey={pubkey} action={action5} />
      <CalculateGrapevineNetwork pubkey={pubkey} action={action6} />
    </>
  )
}

const RetrieveActiveUser = () => {
  const { activeUser } = useActiveUser()
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  return <UpdateDashboard pubkey={activeUser.pubkey} />
}

export default RetrieveActiveUser
