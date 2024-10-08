import React from 'react'
import { useSelector } from 'react-redux'
import { verifyPubkeyValidity } from '../../../helpers/nip19'

const TestPageBody = () => {
  const pk_valid = 'e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f'
  const pk_invalid = 'X-e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f'
  const result_valid = verifyPubkeyValidity(pk_valid)
  const result_invalid = verifyPubkeyValidity(pk_invalid)
  return (
    <>
      <center>
        <h3>Test Page Body</h3>
      </center>
      <div>
        <p>result_valid: {result_valid}</p>
        <p>result_invalid: {result_invalid}</p>
      </div>
    </>
  )
}

export default TestPageBody
