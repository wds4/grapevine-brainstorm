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

const FollowConfidenceOfObserver = ({ followConfidenceOfObserverX, changeFollowConfidenceOfObserverX }) => {
  return (
    <>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Follow ConfidenceOfObserver</strong>
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
              <strong>Follow ConfidenceOfObserver</strong>{' '}
              <small>range: from 0% (most lax) to 100% (most paranoid)</small>
            </CFormLabel>
            <CCardTitle>{followConfidenceOfObserverX/100}</CCardTitle>
            <CFormRange
              onChange={(e) => changeFollowConfidenceOfObserverX(e.target.value)}
              min={0}
              max={100}
              step={1}
              value={followConfidenceOfObserverX}
              id="scoreScrollbar"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}

export default FollowConfidenceOfObserver
