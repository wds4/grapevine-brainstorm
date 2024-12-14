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

const AttenuationFactor = ({ attenuationFactorX, changeAttenuationFactorX }) => {
  return (
    <>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Attenuation Factor</strong>
            <span style={{ color: 'grey', marginLeft: '5px' }}>
              <CPopover
                content="The Attenuation Factor decreases a profile's influence by a certain amount with each successive hop farther away from you. If you don't want to trust profiles more than a few hops away, decrease the AF. If you want to increase the range of your Grapevine, increase the AF."
                placement="top"
                trigger={['hover', 'focus']}
              >
                <CIcon icon={cilInfo} size="lg" />
              </CPopover>
            </span>
          </CCardHeader>
          <CCardBody>
            <CFormLabel htmlFor="scoreScrollbar">
              <strong>Attenuation Factor</strong>{' '}
              <small>range: from 0 (most conservative) to 100 (most trusting)</small>
            </CFormLabel>
            <CCardTitle>{attenuationFactorX/100}</CCardTitle>
            <CFormRange
              onChange={(e) => changeAttenuationFactorX(e.target.value)}
              min={0}
              max={100}
              step={1}
              value={attenuationFactorX}
              id="scoreScrollbar"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}

export default AttenuationFactor
