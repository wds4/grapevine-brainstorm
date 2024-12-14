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

const FollowConfidence = ({ followConfidenceX, changeFollowConfidenceX }) => {
  return (
    <>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Follow Confidence</strong>
            <span style={{ color: 'grey', marginLeft: '5px' }}>
              <CPopover
                content="How confident are you in your interpretation of a follow, i.e. that the rating that you ascribe to a follow is the 'correct' one."
                placement="top"
                trigger={['hover', 'focus']}
              >
                <CIcon icon={cilInfo} size="lg" />
              </CPopover>
            </span>
          </CCardHeader>
          <CCardBody>
            <CFormLabel htmlFor="scoreScrollbar">
              <strong>Follow Confidence</strong>{' '}
              <small>range: from 0 (most conservative) to 100 (most trusting)</small>
            </CFormLabel>
            <CCardTitle>{followConfidenceX/100}</CCardTitle>
            <CFormRange
              onChange={(e) => changeFollowConfidenceX(e.target.value)}
              min={0}
              max={100}
              step={1}
              value={followConfidenceX}
              id="scoreScrollbar"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}

export default FollowConfidence
