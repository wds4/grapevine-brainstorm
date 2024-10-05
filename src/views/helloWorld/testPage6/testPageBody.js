import React, { useState, useEffect } from 'react'

/*
see: Using Curl in ReactJS
https://medium.com/@alexandr.fework/curl-is-a-command-line-tool-used-for-making-http-requests-e2ab67aa4672
*/

const TestPageBody = () => {
  const [resp, setResp] = useState({})
  const [data, setData] = useState({})
  useEffect(() => {
    fetch('https://interpretation-brainstorm.vercel.app/api/returnFoo')
      .then(response => response.json())
      // .then(data => setResp(response))
      .then(data => setData(data))
  }, [])
  return (
    <>
      <div>curl test; data!</div>
      <div>{JSON.stringify(data)}</div>
      <div>curl test; resp:</div>
      <div>{JSON.stringify(resp)}</div>
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
