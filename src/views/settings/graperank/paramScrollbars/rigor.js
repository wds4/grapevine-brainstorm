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
import RigorChart from './rigorChart'

const Rigor = ({ rigorX, changeRigorX }) => {
  const content = `The Rigor is a parameter in the equation that calculates the confidence in an average score
        from the amount of input that went into determining that score. To understand this curve, consider the question:
        How many trusted profiles (input) need to
        weigh in on a topic for you to believe what they tell you? The higher the rigor, the more
        independent confirmation you require. Higher rigor means it takes more input to reach any
        given degree of confidence.`
  return (
    <>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Rigor</strong>
            <span style={{ color: 'grey', marginLeft: '5px' }}>
              <CPopover
                content={content}
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
              <small>range: from 0 (most lax) to 1 (most rigorous)</small>
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
            <RigorChart rigor={rigorX/100} />
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}

export default Rigor
