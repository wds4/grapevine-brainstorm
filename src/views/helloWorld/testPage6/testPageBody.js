import React, { useState, useEffect } from 'react'

/*
see: Using Curl in ReactJS
https://medium.com/@alexandr.fework/curl-is-a-command-line-tool-used-for-making-http-requests-e2ab67aa4672
*/

// app; all work
const url1 = 'https://interpretation-brainstorm.vercel.app/api/returnFoo'
const url2 = 'https://interpretation-brainstorm.vercel.app/api/requestInterpretation'
const url3 =
  'https://interpretation-brainstorm.vercel.app/api/requestInterpretation?req={"universalInterpretationProtocolID":"recommendedBrainstormNotBotsInterpretationProtocol","parameters":"foo"}'

// pages;
const url4 = 'https://interpretation-brainstorm.vercel.app/api/returnFoo'
const url5 = 'https://interpretation-brainstorm.vercel.app/api/selectVersion'
const url6 = 'https://interpretation-brainstorm.vercel.app/api/requestInterpretation'
const url7 =
  'https://interpretation-brainstorm.vercel.app/api/requestInterpretation?req={"universalInterpretationProtocolID":"recommendedBrainstormNotBotsInterpretationProtocol","parameters":"foo"}'

const TestPageBody = () => {
  const [resp, setResp] = useState({})
  const [data, setData] = useState({})
  const url = url3
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      // .then(data => setResp(response))
      .then((data) => setData(data))
  }, [])
  return (
    <>
      <div>testing curl using the url:</div>
      <div>{url}</div>
      <hr />
      <div>{JSON.stringify(data)}</div>
    </>
  )
}

/*
const TestPageBody = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, [])
  return (
    <>
      <div>curl test</div>
      <div>
        {data.map((item, index) => (
          <div key={index}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </>
  )
}
*/
export default TestPageBody
