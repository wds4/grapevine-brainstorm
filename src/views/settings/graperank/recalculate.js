import React, { useCallback, useState } from 'react'
import { CCard, CCardBody, CContainer, CRow, CCardTitle, CCol } from '@coreui/react'
import { secsToTimeAgo } from '../../../helpers'
import AttenuationFactor from './paramScrollbars/attenuationFactor'
import Rigor from './paramScrollbars/rigor'
import FollowConfidence from './paramScrollbars/followConfidence'
import MuteConfidence from './paramScrollbars/muteConfidence'

const RecalculateGrapeRank = ({ pubkey, grapeRankParams }) => {
  const howLongAgo = secsToTimeAgo(grapeRankParams.whenLastImplemented)

  const [attenuationFactorX, setAttenuationFactorX] = useState(
    grapeRankParams.paramsAtLastImplementation.attenuationFactor * 100,
  )
  const changeAttenuationFactorX = useCallback(async (newValue) => {
    setAttenuationFactorX(newValue)
  }, [])

  const [rigorX, setRigorX] = useState(grapeRankParams.paramsAtLastImplementation.rigor * 100)
  const changeRigorX = useCallback(async (newValue) => {
    setRigorX(newValue)
  }, [])

  const [followConfidenceX, setFollowConfidenceX] = useState(grapeRankParams.paramsAtLastImplementation.followConfidence * 100)
  const changeFollowConfidenceX = useCallback(async (newValue) => {
    setFollowConfidenceX(newValue)
  }, [])

  const [muteConfidenceX, setMuteConfidenceX] = useState(grapeRankParams.paramsAtLastImplementation.muteConfidence * 100)
  const changeMuteConfidenceX = useCallback(async (newValue) => {
    setMuteConfidenceX(newValue)
  }, [])

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
                      {grapeRankParams.paramsAtLastImplementation.rigor}
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
                      {grapeRankParams.paramsAtLastImplementation.attenuationFactor}
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
                    <div style={{ display: 'inline-block' }}>
                      {grapeRankParams.paramsAtLastImplementation.followRating}
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
                      {grapeRankParams.paramsAtLastImplementation.followConfidence}
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
                    <div style={{ display: 'inline-block' }}>
                      {grapeRankParams.paramsAtLastImplementation.muteRating}
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
                      {grapeRankParams.paramsAtLastImplementation.muteConfidence}
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
                    <div style={{ display: 'inline-block' }}>
                      {grapeRankParams.paramsAtLastImplementation.followConfidenceOfObserver}
                    </div>
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
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
        </CRow>
      </CContainer>
    </>
  )
}

export default RecalculateGrapeRank
