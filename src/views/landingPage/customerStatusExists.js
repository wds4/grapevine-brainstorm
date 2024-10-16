import React, { useState } from 'react'
import { CCard, CCardBody, CContainer, CCardTitle, CRow, CButton } from '@coreui/react'

const SorryToSeeYouGo = ({ data }) => {
  if (data.success) {
    return <div>We're sorry to see you go! Sign up again if you want! (Refresh the page)</div>
  }
  return (
    <>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </>
  )
}

const UnsubscribeButton = ({ pubkey, setData }) => {
  const unsubscribeFromBrainstorm = () => {
    console.log('unsubscribeFromBrainstorm ' + pubkey)
    const url =
      'https://calculation-brainstorm.vercel.app/api/grapevine/unsubscribe?pubkey=' + pubkey
    fetch(url)
      .then((response) => response.json())
      // .then(data => setResp(response))
      .then((data) => setData(data))
  }
  return (
    <>
      <CCardBody>
        <div className="d-grid gap-2">
          <div>
            Would you like to watch the confetti again? If so, unsubscribe with the button below so
            you can sign up all over again!
          </div>
        </div>
      </CCardBody>
      <CCardBody>
        <CButton color="primary" onClick={() => unsubscribeFromBrainstorm()}>
          Unsubscribe
        </CButton>
      </CCardBody>
    </>
  )
}

const CustomerStatusExists = ({ pubkey }) => {
  const [data, setData] = useState({})

  if (data.success) {
    return <SorryToSeeYouGo data={data} />
  }
  return (
    <>
      <CContainer md style={{ marginTop: '50px' }}>
        <CRow className="justify-content-center">
          <div className="col-auto">
            <CCard className="w-80">
              <UnsubscribeButton pubkey={pubkey} setData={setData} />
            </CCard>
          </div>
        </CRow>
      </CContainer>
    </>
  )
}

export default CustomerStatusExists
