import React from 'react'
import {
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CCardHeader,
  CPopover,
  CFormLabel,
  CFormRange,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilInfo } from '@coreui/icons'

const MuteConfidence = ({ muteConfidenceX, changeMuteConfidenceX }) => {
  return (
    <>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Mute Confidence</strong>
            <span style={{ color: 'grey', marginLeft: '5px' }}>
              <CPopover
                content="How confident are you in your interpretation of a mute, i.e. that the rating that you ascribe to a mute is the 'correct' one."
                placement="top"
                trigger={['hover', 'focus']}
              >
                <CIcon icon={cilInfo} size="lg" />
              </CPopover>
            </span>
          </CCardHeader>
          <CCardBody>
            <CFormLabel htmlFor="scoreScrollbar">
              <strong>Mute Confidence</strong>{' '}
              <small>range: from 0 (most conservative) to 100 (most trusting)</small>
            </CFormLabel>
            <CCardTitle>{muteConfidenceX/100}</CCardTitle>
            <CFormRange
              onChange={(e) => changeMuteConfidenceX(e.target.value)}
              min={0}
              max={100}
              step={1}
              value={muteConfidenceX}
              id="scoreScrollbar"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}

export default MuteConfidence
