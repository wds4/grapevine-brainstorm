import React, { useCallback, useState } from 'react'
import {
  CCard,
  CCardBody,
  CContainer,
  CRow,
  CCardTitle,
  CCol,
  CButton,
  CCardHeader,
  CForm,
  CFormInput,
} from '@coreui/react'
import { secsToTimeAgo } from '../../../helpers'
import AttenuationFactor from './paramScrollbars/attenuationFactor'
import Rigor from './paramScrollbars/rigor'
import FollowConfidence from './paramScrollbars/followConfidence'
import MuteConfidence from './paramScrollbars/muteConfidence'
import CreateDosSummary from 'src/views/graperank/components/calculateGrapeRankSequentially/createDosSummary'
import FollowConfidenceOfObserver from './paramScrollbars/followConfidenceOfObserver'

const ThreeModes = ({ resetParamsByMode }) => {
  return (
    <>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <span className="d-flex justify-content-around">
              <CButton color="primary" onClick={() => resetParamsByMode(0)}>
                Lax, Trusting & Open
              </CButton>
              <CButton color="primary" onClick={() => resetParamsByMode(1)}>
                Middle
              </CButton>
              <CButton color="primary" onClick={() => resetParamsByMode(2)}>
                Rigorous, Paranoid & Conservative
              </CButton>
            </span>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}

const RecalculationModule = ({ recalculating, pubkey, grapeRankParams }) => {
  if (recalculating == 0) {
    return <></>
  }
  return (
    <>
      <br />
      <div>Recalculations commencing ....</div>
      <CreateDosSummary pubkey={pubkey} grapeRankParams={grapeRankParams} />
    </>
  )
}

const RecalculateGrapeRank = ({ pubkey, grapeRankParams }) => {
  // console.log(`RecalculateGrapeRank`)
  // console.log(grapeRankParams)
  const howLongAgo = secsToTimeAgo(grapeRankParams?.whenLastImplemented)
  const [recalculateButtonDisplay, setRecalculateButtonDisplay] = useState('block')
  const [recalculating, setRecalculating] = useState(0)

  const resetParamsByMode = (mode) => {
    console.log(`resetParamsByMode: ${mode}`)
    if (mode == 0) {
      console.log(`mode 0: trusting & open`)
      setAttenuationFactorX(90)
      setRigorX(20)
      setFollowConfidenceX(50)
      setMuteConfidenceX(10)
      setMuteRating(0)
      setFollowConfidenceOfObserverX(10)
    }
    if (mode == 1) {
      console.log(`mode 1: medium`)
      setAttenuationFactorX(50)
      setRigorX(40)
      setFollowConfidenceX(20)
      setMuteConfidenceX(50)
      setMuteRating(0)
      setFollowConfidenceOfObserverX(30)
    }
    if (mode == 2) {
      console.log(`mode 2: paranoid`)
      setAttenuationFactorX(20)
      setRigorX(60)
      setFollowConfidenceX(5)
      setMuteConfidenceX(90)
      setMuteRating(-0.9)
      setFollowConfidenceOfObserverX(50)
    }
  }

  const [attenuationFactorX, setAttenuationFactorX] = useState(
    grapeRankParams?.paramsAtLastImplementation.attenuationFactor * 100,
  )
  const changeAttenuationFactorX = useCallback(async (newValue) => {
    setAttenuationFactorX(newValue)
  }, [])

  const [rigorX, setRigorX] = useState(grapeRankParams?.paramsAtLastImplementation.rigor * 100)
  const changeRigorX = useCallback(async (newValue) => {
    setRigorX(newValue)
  }, [])

  const [followConfidenceX, setFollowConfidenceX] = useState(
    grapeRankParams?.paramsAtLastImplementation.followConfidence * 100,
  )
  const changeFollowConfidenceX = useCallback(async (newValue) => {
    setFollowConfidenceX(newValue)
  }, [])

  const [muteConfidenceX, setMuteConfidenceX] = useState(
    grapeRankParams?.paramsAtLastImplementation.muteConfidence * 100,
  )
  const changeMuteConfidenceX = useCallback(async (newValue) => {
    setMuteConfidenceX(newValue)
  }, [])

  const [followRating, setFollowRating] = useState(
    grapeRankParams?.paramsAtLastImplementation.followRating,
  )
  const changeFollowRating = (newValue) => {
    setFollowRating(newValue.target.value)
  }

  const [muteRating, setMuteRating] = useState(
    grapeRankParams?.paramsAtLastImplementation.muteRating,
  )
  const changeMuteRating = (newValue) => {
    setMuteRating(newValue.target.value)
  }

  const [followConfidenceOfObserverX, setFollowConfidenceOfObserverX] = useState(
    grapeRankParams?.paramsAtLastImplementation.followConfidenceOfObserver * 100,
  )
  const changeFollowConfidenceOfObserverX = useCallback(async (newValue) => {
    setFollowConfidenceOfObserverX(newValue)
  }, [])

  const recalculateGrapeRank = () => {
    console.log(`recalculateGrapeRank`)
    setRecalculating(1)
    setRecalculateButtonDisplay('none')
  }

  const newGrapeRankParams = {
    attenuationFactor: attenuationFactorX / 100,
    rigor: rigorX / 100,
    followConfidence: followConfidenceX / 100,
    muteConfidence: muteConfidenceX / 100,
    followRating: followRating,
    muteRating: muteRating,
    followConfidenceOfObserver: followConfidenceOfObserverX / 100,
  }

  let url = `https://www.graperank.tech/api/algos/grapeRank?pubkey=${pubkey}`
  if (newGrapeRankParams.attenuationFactor) {
    url += `&attenuationFactor=${newGrapeRankParams.attenuationFactor}`
  }
  if (newGrapeRankParams.rigor) {
    url += `&rigor=${newGrapeRankParams.rigor}`
  }
  if (newGrapeRankParams.followConfidence) {
    url += `&followConfidence=${newGrapeRankParams.followConfidence}`
  }
  if (newGrapeRankParams.muteConfidence) {
    url += `&muteConfidence=${newGrapeRankParams.muteConfidence}`
  }
  if (newGrapeRankParams.followRating) {
    url += `&followRating=${newGrapeRankParams.followRating}`
  }
  if (newGrapeRankParams.muteRating) {
    url += `&muteRating=${newGrapeRankParams.muteRating}`
  }
  if (newGrapeRankParams.followConfidenceOfObserver) {
    url += `&followConfidenceOfObserver=${newGrapeRankParams.followConfidenceOfObserver}`
  }

  return (
    <>
      <CContainer md>
        <CRow className="justify-content-center">
          <CCol>
            <CCard className="w-100">
              <CCardBody>
                <center>
                  <CCardTitle>Recalculate GrapeRank</CCardTitle>
                  <div>Your Grapevine was last calculated {howLongAgo}, using parameters:</div>
                </center>
                <br />
                <div>url: {url}</div>
                <div style={{ marginLeft: '50px' }}>
                  <div>
                    <div style={{ display: 'inline-block', width: '300px' }}></div>
                    <div
                      style={{
                        display: 'inline-block',
                        width: '200px',
                        textDecoration: 'underline',
                      }}
                    >
                      previous params
                    </div>
                    <div
                      style={{
                        display: 'inline-block',
                        width: '200px',
                        textDecoration: 'underline',
                      }}
                    >
                      new params
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: 'inline-block',
                        width: '300px',
                        marginRight: '30px',
                        textAlign: 'right',
                      }}
                    >
                      rigor:
                    </div>
                    <div style={{ display: 'inline-block', width: '200px' }}>
                      {grapeRankParams?.paramsAtLastImplementation.rigor}
                    </div>
                    <div style={{ display: 'inline-block', width: '200px' }}>{rigorX / 100}</div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: 'inline-block',
                        width: '300px',
                        marginRight: '30px',
                        textAlign: 'right',
                      }}
                    >
                      attenuationFactor:
                    </div>
                    <div style={{ display: 'inline-block', width: '200px' }}>
                      {grapeRankParams?.paramsAtLastImplementation.attenuationFactor}
                    </div>
                    <div style={{ display: 'inline-block', width: '200px' }}>
                      {attenuationFactorX / 100}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: 'inline-block',
                        width: '300px',
                        marginRight: '30px',
                        textAlign: 'right',
                      }}
                    >
                      followRating:
                    </div>
                    <div style={{ display: 'inline-block', width: '200px' }}>
                      {grapeRankParams?.paramsAtLastImplementation.followRating}
                    </div>
                    <div style={{ display: 'inline-block', width: '200px' }}>
                      <CForm>
                        <CFormInput
                          type="number"
                          placeholder={followRating}
                          onChange={(value) => changeFollowRating(value)}
                        />
                      </CForm>
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        display: 'inline-block',
                        width: '300px',
                        marginRight: '30px',
                        textAlign: 'right',
                      }}
                    >
                      followConfidence:
                    </div>
                    <div style={{ display: 'inline-block', width: '200px' }}>
                      {grapeRankParams?.paramsAtLastImplementation.followConfidence}
                    </div>
                    <div style={{ display: 'inline-block', width: '200px' }}>
                      {followConfidenceX / 100}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: 'inline-block',
                        width: '300px',
                        marginRight: '30px',
                        textAlign: 'right',
                      }}
                    >
                      muteRating:
                    </div>
                    <div style={{ display: 'inline-block', width: '200px' }}>
                      {grapeRankParams?.paramsAtLastImplementation.muteRating}
                    </div>
                    <div style={{ display: 'inline-block', width: '200px' }}>
                      <CForm>
                        <CFormInput
                          type="number"
                          placeholder={muteRating}
                          onChange={changeMuteRating}
                        />
                      </CForm>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: 'inline-block',
                        width: '300px',
                        marginRight: '30px',
                        textAlign: 'right',
                      }}
                    >
                      muteConfidence:
                    </div>
                    <div style={{ display: 'inline-block', width: '200px' }}>
                      {grapeRankParams?.paramsAtLastImplementation.muteConfidence}
                    </div>
                    <div style={{ display: 'inline-block', width: '200px' }}>
                      {muteConfidenceX / 100}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: 'inline-block',
                        width: '300px',
                        marginRight: '30px',
                        textAlign: 'right',
                      }}
                    >
                      followConfidenceOfObserver:
                    </div>
                    <div style={{ display: 'inline-block', width: '200px' }}>
                      {grapeRankParams?.paramsAtLastImplementation.followConfidenceOfObserver}
                    </div>
                    <div style={{ display: 'inline-block', width: '200px' }}>
                      {followConfidenceOfObserverX / 100}
                    </div>
                  </div>
                </div>
                <br />
                <div style={{ display: recalculateButtonDisplay }}>
                  <CButton
                    color="primary"
                    style={{ float: 'right' }}
                    onClick={() => recalculateGrapeRank()}
                  >
                    Recalculate using new parameters
                  </CButton>
                </div>
                <RecalculationModule
                  recalculating={recalculating}
                  pubkey={pubkey}
                  grapeRankParams={newGrapeRankParams}
                />
              </CCardBody>
            </CCard>
          </CCol>

          <CCol xs={12} style={{ marginTop: '20px' }}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>
                  <center>Edit GrapeRank Parameters</center>
                </strong>
              </CCardHeader>
            </CCard>
          </CCol>

          <ThreeModes resetParamsByMode={resetParamsByMode} />

          <Rigor rigorX={rigorX} changeRigorX={changeRigorX} />

          <AttenuationFactor
            attenuationFactorX={attenuationFactorX}
            changeAttenuationFactorX={changeAttenuationFactorX}
          />

          <FollowConfidence
            followConfidenceX={followConfidenceX}
            changeFollowConfidenceX={changeFollowConfidenceX}
          />

          <MuteConfidence
            muteConfidenceX={muteConfidenceX}
            changeMuteConfidenceX={changeMuteConfidenceX}
          />

          <FollowConfidenceOfObserver
            followConfidenceOfObserverX={followConfidenceOfObserverX}
            changeFollowConfidenceOfObserverX={changeFollowConfidenceOfObserverX}
          />
        </CRow>
      </CContainer>
    </>
  )
}

export default RecalculateGrapeRank
