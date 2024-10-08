import React, { useState, useEffect } from 'react'

/*
see: Using Curl in ReactJS
https://medium.com/@alexandr.fework/curl-is-a-command-line-tool-used-for-making-http-requests-e2ab67aa4672
*/

const TestPageBody = () => {
  const [resp, setResp] = useState({})
  const [data, setData] = useState({})
  const url =
    'https://calculation-brainstorm.vercel.app/api/grapevine/showStoredRatingsTable?name=default&pubkey=e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f'
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      // .then(data => setResp(response))
      .then((data) => setData(data))
  }, [])
  return (
    <>
      <div>ask calc engine to show my ratingsTable in calc engine storage using the url:</div>
      <div>{url}</div>
      <hr />
      <div>{JSON.stringify(data)}</div>
    </>
  )
}

export default TestPageBody
