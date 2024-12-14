import { useActiveUser, useNdk } from 'nostr-hooks'
import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CContainer, CCardTitle, CRow, CCol, CNavLink } from '@coreui/react'
import { useSearchParams } from 'react-router-dom'
import { asyncFetchProfile } from 'src/helpers/ndk'
import ShowScoreCalculations_brainstorm from './showScoreCalculations_brainstorm'
import ShowScoreCalculations_gvEarth from './showScoreCalculations_gvRogue'
import { nip19 } from 'nostr-tools'
import { noProfilePicUrl } from 'src/const'
// import FollowersTable from './followersTable'

const Profile = ({ activeUserPubkey }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [providedNpub, setProvidedNpub] = useState('')
  const [calculatedNpub, setCalculatedNpub] = useState('')
  const [providedPubkey, setProvidedPubkey] = useState('')
  const [profile, setProfile] = useState({})
  const [profilePicUrl, setProfilePicUrl] = useState(noProfilePicUrl)

  const [numFollowers, setNumFollowers] = useState('?')
  const [numFollows, setNumFollows] = useState('?')

  const [numMuters, setNumMuters] = useState('?')
  const [numMutes, setNumMutes] = useState('?')

  const [dosBrainstorm, setDosBrainstorm] = useState('?')
  const [dos, setDos] = useState('?')

  const [influence, setInfluence] = useState('?')
  const [confidence, setConfidence] = useState('?')
  const [average, setAverage] = useState('?')
  const [input, setInput] = useState('?')

  const [influenceV1, setInfluenceV1] = useState('?')
  const [confidenceV1, setConfidenceV1] = useState('?')
  const [averageV1, setAverageV1] = useState('?')
  const [inputV1, setInputV1] = useState('?')

  const { ndk } = useNdk()

  async function fetchNumFollowers(url) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      if (data.success) {
        if (data.exists) {
          setNumFollowers(data.data.numFollowers)
        }
      }
      return data
    } catch (error) {
      console.error('api/outwardFacing/singlePubkey/numFollowers endpoint error:', error)
    }
  }

  async function fetchNumFollows(url) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      if (data.success) {
        if (data.exists) {
          setNumFollows(data.data.numFollows)
        }
      }
      return data
    } catch (error) {
      console.error('api/outwardFacing/singlePubkey/numFollowers endpoint error:', error)
    }
  }

  async function fetchDos(url) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      if (data.success) {
        if (data.exists) {
          setDos(data.data.dos)
        }
      }
      return data
    } catch (error) {
      console.error('api/outwardFacing/getDos endpoint error:', error)
    }
  }

  async function fetchGrapeRank(url) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      if (data.success) {
        if (data.exists) {
          setInfluence(data.data.grapeRank.influence)
          setInput(data.data.grapeRank.input)
          setAverage(data.data.grapeRank.average)
          setConfidence(data.data.grapeRank.confidence)
        }
      }
      return data
    } catch (error) {
      console.error('api/outwardFacing/singlePubkey/grapeRank endpoint error:', error)
    }
  }

  async function fetchNumMuters(url) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('fetchNumMuters: Network response was not ok')
      }
      const data = await response.json()
      if (data.success) {
        if (data.exists) {
          setNumMuters(data.data.numMuters)
        }
      }
      return data
    } catch (error) {
      console.error('api/outwardFacing/singlePubkey/numMuters endpoint error:', error)
    }
  }

  useEffect(() => {
    let internalNpub = ''
    let internalPubkey = ''
    function updateUserDataFromUrl() {
      let pubkeyFromUrl = searchParams.get('pubkey')
      const npubFromUrl = searchParams.get('npub')
      if (npubFromUrl) {
        setProvidedNpub(npubFromUrl)
        internalNpub = npubFromUrl
        const pk = nip19.decode(npubFromUrl)
        // console.log(`pk: ${JSON.stringify(pk)}`)
        pubkeyFromUrl = pk.data
      }
      if (pubkeyFromUrl) {
        setProvidedPubkey(pubkeyFromUrl)
        const url1 = `https://www.graperank.tech/api/outwardFacing/singlePubkey/numFollowers?pubkey=${pubkeyFromUrl}`
        fetchNumFollowers(url1)
        const url2 = `https://www.graperank.tech/api/outwardFacing/singlePubkey/numFollows?pubkey=${pubkeyFromUrl}`
        fetchNumFollows(url2)
        const url3 = `https://www.graperank.tech/api/outwardFacing/getDos?observer=${activeUserPubkey}&observee=${pubkeyFromUrl}`
        fetchDos(url3)
        const url4 = `https://www.graperank.tech/api/outwardFacing/getGrapeRank?observer=${activeUserPubkey}&observee=${pubkeyFromUrl}`
        fetchGrapeRank(url4)
        const url5 = `https://www.graperank.tech/api/outwardFacing/singlePubkey/numMuters?pubkey=${pubkeyFromUrl}`
        fetchNumMuters(url5)
        internalPubkey = pubkeyFromUrl
        const np = nip19.npubEncode(pubkeyFromUrl)
        setCalculatedNpub(np)
      }
    }
    updateUserDataFromUrl()
    const updateProfile = async () => {
      if (internalNpub) {
        const obj = {}
        obj.npub = internalNpub
        const oProfile = await asyncFetchProfile(ndk, obj)
        setProfile(oProfile)

        return true
      }
      if (internalPubkey) {
        const obj = {}
        obj.pubkey = internalPubkey
        const oProfile = await asyncFetchProfile(ndk, obj)
        setProfile(oProfile)
        return true
      }
      return false
    }
    updateProfile()
  }, [])

  console.log('Profile component rerender')

  if (JSON.stringify(profile) == '{}') {
    return (
      <div>
        profile with pubkey: {providedPubkey} and npub: {calculatedNpub} not found
      </div>
    )
  }
  const hrefFollows = `#/profile/follows?npub=${calculatedNpub}`
  const hrefFollowers = `#/profile/followers?npub=${calculatedNpub}`
  return (
    <>
      <CContainer>
        <CRow>
          <CCol sm="auto">
            <div className="profileAvatarContainer">
              <img src={profile?.image} className="profileAvatarLarge" />
            </div>
          </CCol>
          <CCol auto>
            <center>
              <CCardTitle>{profile?.displayName}</CCardTitle>
            </center>
            <br />
            <div>{profile?.name}</div>
            <div>{providedPubkey}</div>
            <div>{calculatedNpub}</div>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="auto">
            <div style={{ width: '250px' }}>follows:</div>
          </CCol>
          <CCol>
            <CNavLink href={hrefFollows}>
              {numFollows} <span style={{ color: 'grey' }}>follows</span>
            </CNavLink>
          </CCol>
        </CRow>

        <CRow>
          <CCol sm="auto">
            <div style={{ width: '250px' }}>followers:</div>
          </CCol>
          <CCol>
            <CNavLink href={hrefFollowers}>
              {numFollowers} <span style={{ color: 'grey' }}>followers</span>
            </CNavLink>
          </CCol>
        </CRow>

        <CRow>
          <CCol sm="auto">
            <div style={{ width: '250px' }}>DoS-1 followers:</div>
          </CCol>
          <CCol>
            <CNavLink href={hrefFollowers}>
              tbd <span style={{ color: 'grey' }}>DoS-1 followers</span>
            </CNavLink>
          </CCol>
        </CRow>

        <CRow>
          <CCol sm="auto">
            <div style={{ width: '250px' }}>muters:</div>
          </CCol>
          <CCol>
            <CNavLink href={hrefFollowers}>
              {numMuters} <span style={{ color: 'grey' }}>muters</span>
            </CNavLink>
          </CCol>
        </CRow>

        <CRow>
          <CCol sm="auto">
            <div style={{ width: '250px' }}>grapeWeight:</div>
          </CCol>
          <CCol>
            <CNavLink href={hrefFollowers}>
              {Number(input).toFixed(2)} <span style={{ color: 'grey' }}>grapes</span>
            </CNavLink>
          </CCol>
        </CRow>

        <CRow>
          <CCol sm="auto">
            <div style={{ width: '250px' }}>DoS:</div>
          </CCol>
          <CCol>{dos}</CCol>
        </CRow>
        <CRow>
          <CCol sm="auto">
            <div style={{ width: '250px' }}>GrapeRank:</div>
          </CCol>
          <CCol>
            influence: {influence}
            <br />
            average: {average}
            <br />
            input: {input}
            <br />
            confidence: {confidence * 100} %
          </CCol>
        </CRow>

        <CRow>
          <CCol sm="auto">
            <div style={{ width: '250px' }}>PageRank:</div>
          </CCol>
          <CCol>tbd</CCol>
        </CRow>

        <CRow style={{ display: 'none' }}>
          <CCol sm="auto">
            <div style={{ width: '250px' }}>GrapeRank (before neo4j):</div>
          </CCol>
          <CCol>
            influence: {influenceV1}
            <br />
            average: {averageV1}
            <br />
            input: {inputV1}
            <br />
            confidence: {confidenceV1 * 100} %
          </CCol>
        </CRow>
      </CContainer>

      <div style={{ display: 'none' }}>
        <div style={{ border: '1px solid purple', padding: '10px' }}>
          <ShowScoreCalculations_brainstorm
            activeUserPubkey={activeUserPubkey}
            pubkey={providedPubkey}
            setInfluence={setInfluenceV1}
            setConfidence={setConfidenceV1}
            setDos={setDosBrainstorm}
            setAverage={setAverageV1}
            setInput={setInputV1}
          />
        </div>
        <div style={{ border: '1px solid purple', padding: '10px' }}>
          <ShowScoreCalculations_gvEarth
            activeUserPubkey={activeUserPubkey}
            pubkey={providedPubkey}
          />
        </div>
        <br />
        <div>
          <p>observee profile info:</p>
          <pre>{JSON.stringify(profile, null, 4)}</pre>
        </div>
      </div>
      <div style={{ marginBottom: '200px' }}></div>
    </>
  )
}

const RetrieveActiveUser = () => {
  const { activeUser } = useActiveUser()
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  return (
    <>
      <Profile activeUserPubkey={activeUser.pubkey} />
    </>
  )
}

export default RetrieveActiveUser
