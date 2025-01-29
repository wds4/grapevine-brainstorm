import { useActiveUser, useNdk } from 'nostr-hooks'
import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CContainer, CCardTitle, CRow, CCol, CNavLink } from '@coreui/react'
import { useSearchParams } from 'react-router-dom'
import { asyncFetchProfile } from 'src/helpers/ndk'
// import ShowScoreCalculations_brainstorm from './showScoreCalculations_brainstorm'
// import ShowScoreCalculations_gvEarth from './showScoreCalculations_gvRogue'
import { nip19 } from 'nostr-tools'
import { noProfilePicUrl } from 'src/const'
// import FollowersTable from './followersTable'
import ShowShortestPath from 'src/views/graperank/components/showShortestPath'
import { useDispatch, useSelector } from 'react-redux'

const Profile = ({ activeUserPubkey }) => {
  console.log(`rerender Profile`)

  const profileBeingViewed = useSelector((state) => state.profileBeingViewed)

  const dispatch = useDispatch()

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

  const [numMutuals, setNumMutuals] = useState('?')
  const [numFans, setNumFans] = useState('?')
  const [numIdols, setNumIdols] = useState('?')

  const [numRecsForYou, setNumRecsForYou] = useState('?')
  const [numRecsByYou, setNumRecsByYou] = useState('?')

  const [dosBrainstorm, setDosBrainstorm] = useState('?')
  const [dos, setDos] = useState('?')

  const [influence, setInfluence] = useState('?')
  const [confidence, setConfidence] = useState('?')
  const [average, setAverage] = useState('?')
  const [input, setInput] = useState('?')

  const [pagerank, setPagerank] = useState('?')

  const [influenceV1, setInfluenceV1] = useState('?')
  const [confidenceV1, setConfidenceV1] = useState('?')
  const [averageV1, setAverageV1] = useState('?')
  const [inputV1, setInputV1] = useState('?')

  const { ndk } = useNdk()

  async function fetchNumFollowers(url) {
    console.log(`async function fetchNumFollowers`)
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
    console.log(`async function fetchNumFollows`)
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
    console.log(`async function fetchDos`)
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
    console.log(`async function fetchGrapeRank`)
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
      console.error('api/outwardFacing/getGrapeRank endpoint error:', error)
    }
  }

  async function fetchPageRank(url) {
    console.log(`async function fetchPageRank`)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      if (data.success) {
        if (data.exists) {
          setPagerank(data.data.personalizedPageRankScore)
        }
      }
      return data
    } catch (error) {
      console.error('api/outwardFacing/getPageRank endpoint error:', error)
    }
  }

  async function fetchNumMuters(url) {
    console.log(`async function fetchNumMuters`)
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

  async function fetchNumMutes(url) {
    console.log(`async function fetchNumMutes`)
    console.log(url)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('fetchNumMutes: Network response was not ok')
      }
      const data = await response.json()
      if (data.success) {
        if (data.exists) {
          setNumMutes(data.data.numMutes)
        }
      }
      return data
    } catch (error) {
      console.error('api/outwardFacing/singlePubkey/numMutes endpoint error:', error)
    }
  }

  async function fetchFollowersFollowsMutualsFansIdols(url) {
    console.log(`async function fetchFollowersFollowsMutualsFansIdols`)
    console.log(url)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('fetchFollowersFollowsMutualsFansIdols: Network response was not ok')
      }
      const data = await response.json()
      if (data.success) {
        if (data.exists) {
          setNumFollowers(data.data.numFollowers)
          setNumFollows(data.data.numFollows)
          setNumMutuals(data.data.numMutuals)
          setNumFans(data.data.numFans)
          setNumIdols(data.data.numIdols)
        }
      }
      return data
    } catch (error) {
      console.error(
        'api/outwardFacing/singlePubkey/fetchFollowersFollowsMutualsFansIdols endpoint error:',
        error,
      )
    }
  }

  async function fetchFollowRecsForYou(url) {
    console.log(`async function fetchFollowRecsForYou`)
    console.log(url)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('fetchFollowRecsForYou: Network response was not ok')
      }
      const data = await response.json()
      if (data.success) {
        if (data.exists) {
          setNumRecsForYou(data.data.numFollowRecommendations)
        }
      }
      return data
    } catch (error) {
      console.error('api/neo4j/getFollowRecommendations endpoint error:', error)
    }
  }

  async function fetchFollowRecsByYou(url) {
    console.log(`async function fetchFollowRecsByYou`)
    console.log(url)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('fetchFollowRecsByYou: Network response was not ok')
      }
      const data = await response.json()
      if (data.success) {
        if (data.exists) {
          setNumRecsByYou(data.data.numFollowRecommendations)
        }
      }
      return data
    } catch (error) {
      console.error('api/neo4j/getFollowRecommendations endpoint error:', error)
    }
  }

  const fetchData = (pk) => {
    const url1 = `https://www.graperank.tech/api/outwardFacing/singlePubkey/numFollowers?pubkey=${pk}`
    // fetchNumFollowers(url1)
    const url2 = `https://www.graperank.tech/api/outwardFacing/singlePubkey/numFollows?pubkey=${pk}`
    // fetchNumFollows(url2)
    const url3 = `https://www.graperank.tech/api/outwardFacing/getDos?observer=${activeUserPubkey}&observee=${pk}`
    fetchDos(url3)
    const url4 = `https://www.graperank.tech/api/outwardFacing/getGrapeRank?observer=${activeUserPubkey}&observee=${pk}`
    fetchGrapeRank(url4)
    const url5 = `https://www.graperank.tech/api/outwardFacing/singlePubkey/numMuters?pubkey=${pk}`
    fetchNumMuters(url5)
    const url6 = `https://www.graperank.tech/api/outwardFacing/singlePubkey/numMutes?pubkey=${pk}`
    fetchNumMutes(url6)
    const url7 = `https://www.graperank.tech/api/outwardFacing/getPageRank?observer=${activeUserPubkey}&observee=${pk}`
    fetchPageRank(url7)

    const url8 = `https://www.graperank.tech/api/outwardFacing/singlePubkey/numFollowersFollowsMutualsFansIdols?pubkey=${pk}`
    fetchFollowersFollowsMutualsFansIdols(url8)

    const url9 = `https://www.graperank.tech/api/neo4j/getFollowRecommendations?recommender=${pk}&recommendee=${activeUserPubkey}`
    fetchFollowRecsForYou(url9)
    const url10 = `https://www.graperank.tech/api/neo4j/getFollowRecommendations?recommender=${activeUserPubkey}&recommendee=${pk}`
    fetchFollowRecsByYou(url10)
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
        pubkeyFromUrl = pk.data
      }
      if (pubkeyFromUrl) {
        setProvidedPubkey(pubkeyFromUrl)
        fetchData(pubkeyFromUrl)

        internalPubkey = pubkeyFromUrl
        const np = nip19.npubEncode(pubkeyFromUrl)
        setCalculatedNpub(np)
      }
    }
    updateUserDataFromUrl()
    const updateProfile = async () => {
/*
      if (internalNpub) {
        const obj = {}
        obj.npub = internalNpub
        const pk = nip19.decode(internalNpub)
        console.log(`pk: ${JSON.stringify(pk)}`)
        const oProfile = await asyncFetchProfile(ndk, obj)
        dispatch({
          type: 'set',
          profileBeingViewed: { selected: true, pubkey: pk.data, npub: internalNpub },
        })
        setProfile(oProfile)
      }
*/
      if (internalPubkey) {
        const obj = {}
        obj.pubkey = internalPubkey
        const np = nip19.npubEncode(internalPubkey)
        const oProfile = await asyncFetchProfile(ndk, obj)
        dispatch({
          type: 'set',
          profileBeingViewed: { selected: true, pubkey: internalPubkey, npub: np },
        })
        setProfile(oProfile)
      }

      if (!internalNpub && !internalPubkey) {
        if (profileBeingViewed.selected && profileBeingViewed.pubkey) {
          console.log(`use profileBeingViewed ${profileBeingViewed.pubkey}`)
          const storedPubkey = profileBeingViewed.pubkey
          const obj = {}
          obj.pubkey = storedPubkey
          const np = nip19.npubEncode(storedPubkey)
          const oProfile = await asyncFetchProfile(ndk, obj)
          setProfile(oProfile)

          setProvidedPubkey(storedPubkey)
          setCalculatedNpub(np)
          fetchData(storedPubkey)
        }
      }
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
  const hrefMutuals = `#/profile/mutuals?npub=${calculatedNpub}`
  const hrefFans = `#/profile/fans?npub=${calculatedNpub}`
  const hrefIdols = `#/profile/idols?npub=${calculatedNpub}`

  const hrefFollowRecsForYou = `#/profile/followRecsForYou?npub=${calculatedNpub}&myPubkey=${activeUserPubkey}`
  const hrefFollowRecsByYou = `#/profile/followRecsByYou?npub=${calculatedNpub}&myPubkey=${activeUserPubkey}`

  const hrefMuters = `#/profile/muters?npub=${calculatedNpub}`
  const hrefMutes = `#/profile/mutes?npub=${calculatedNpub}`
  const hrefShortestPath = `#/profile/shortestPath?npub=${calculatedNpub}`
  const hrefGrapeRankScoreCalculations = `#/profile/grapeRankScoreCalculations?npub=${calculatedNpub}`
  return (
    <>
      <CContainer>
        <CRow>
          <CCol sm="auto">
            <CRow>
              <CCol sm="auto">
                <div className="profileAvatarContainer">
                  <img src={profile?.image} className="profileAvatarLarge" />
                </div>
              </CCol>
              <CCol auto>
                <br />
                <div style={{ fontWeight: 'bold' }}>{profile?.displayName}</div>
                <div style={{ color: 'grey' }}>@{profile?.name}</div>
                <br />
                <div style={{ fontSize: '12px' }}>
                  <div>{providedPubkey}</div>
                  <div>{calculatedNpub}</div>
                </div>
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
                <div style={{ width: '250px' }}>mutuals:</div>
              </CCol>
              <CCol>
                <CNavLink href={hrefMutuals}>
                  {numMutuals} <span style={{ color: 'grey' }}>mutuals</span>
                </CNavLink>
              </CCol>
            </CRow>

            <CRow>
              <CCol sm="auto">
                <div style={{ width: '250px' }}>fans:</div>
              </CCol>
              <CCol>
                <CNavLink href={hrefFans}>
                  {numFans} <span style={{ color: 'grey' }}>fans</span>
                </CNavLink>
              </CCol>
            </CRow>

            <CRow>
              <CCol sm="auto">
                <div style={{ width: '250px' }}>idols:</div>
              </CCol>
              <CCol>
                <CNavLink href={hrefIdols}>
                  {numIdols} <span style={{ color: 'grey' }}>idols</span>
                </CNavLink>
              </CCol>
            </CRow>

            <hr />

            <CRow>
              <CCol sm="auto">
                <div style={{ width: '250px' }}>Recommended Follows:</div>
              </CCol>
            </CRow>

            <CRow>
              <CCol sm="auto">
                <div style={{ width: '250px' }}></div>
              </CCol>
              <CCol>
                <CNavLink href={hrefFollowRecsForYou}>
                  {numRecsForYou}{' '}
                  <span style={{ color: 'grey' }}>
                    recommendations (for you to follow, by this user)
                  </span>
                </CNavLink>
              </CCol>
            </CRow>

            <CRow>
              <CCol sm="auto">
                <div style={{ width: '250px' }}></div>
              </CCol>
              <CCol>
                <CNavLink href={hrefFollowRecsByYou}>
                  {numRecsByYou}{' '}
                  <span style={{ color: 'grey' }}>
                    recommendations (by you, for this user to follow)
                  </span>
                </CNavLink>
              </CCol>
            </CRow>

            <hr />

            <CRow>
              <CCol sm="auto">
                <div style={{ width: '250px' }}>muters:</div>
              </CCol>
              <CCol>
                <CNavLink href={hrefMuters}>
                  {numMuters} <span style={{ color: 'grey' }}>muters</span>
                </CNavLink>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="auto">
                <div style={{ width: '250px' }}>mutes:</div>
              </CCol>
              <CCol>
                <CNavLink href={hrefMutes}>
                  {numMutes} <span style={{ color: 'grey' }}>mutes</span>
                </CNavLink>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="auto">
                <div style={{ width: '250px' }}>DoS:</div>
              </CCol>
              <CCol>
                <CNavLink href={hrefShortestPath}>{dos} hops </CNavLink>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="auto">
                <div style={{ width: '250px' }}>
                  <div>GrapeRank:</div>
                  <div style={{ marginLeft: '10px', color: 'grey', fontSize: '14px' }}>
                    <CNavLink href={hrefGrapeRankScoreCalculations}>(how is this calculated?)</CNavLink>
                  </div>
                </div>
              </CCol>
              <CCol>
                influence: {influence}
                <br />
                average: {average}
                <br />
                WEIGHT: {input}
                <br />
                confidence: {confidence * 100} %
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="auto">
                <div style={{ width: '250px' }}>pageRank:</div>
              </CCol>
              <CCol>{pagerank}</CCol>
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
          </CCol>
          <CCol sm="auto">
            <ShowShortestPath from_pubkey={activeUserPubkey} to_pubkey={providedPubkey} />
          </CCol>
        </CRow>
      </CContainer>
      <div style={{ marginBottom: '200px' }}></div>
    </>
  )
}

const RetrieveActiveUser = () => {
  console.log(`rerender RetrieveActiveUser`)
  const { activeUser } = useActiveUser()
  if (!activeUser) return <div>retrieving the active user pubkey ...</div>
  return (
    <>
      <Profile activeUserPubkey={activeUser.pubkey} />
    </>
  )
}

export default RetrieveActiveUser

/*
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
*/
