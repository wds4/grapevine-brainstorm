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

const Rigor = ({ rigorX, changeRigorX }) => {
  return (
    <>
      <CCol xs={12} style={{ marginTop: '20px' }}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Rigor</strong>
            <span style={{ color: 'grey', marginLeft: '5px' }}>
              <CPopover
                content="The Rigor is a parameter in the equation that calculates the confidence in an average score from the amount of input that went into determining that score."
                placement="top"
                trigger={['hover', 'focus']}
              >
                <CIcon icon={cilInfo} size="lg" />
              </CPopover>
            </span>
          </CCardHeader>
          <CCardBody>
            <CFormLabel htmlFor="scoreScrollbar">
              <strong>Rigor</strong>{' '}
              <small>range: from 0 (most conservative) to 100 (most trusting)</small>
            </CFormLabel>
            <CCardTitle>{rigorX/100}</CCardTitle>
            <CFormRange
              onChange={(e) => changeRigorX(e.target.value)}
              min={0}
              max={100}
              step={1}
              value={rigorX}
              id="scoreScrollbar"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}

export default Rigor
