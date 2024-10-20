import React from 'react'

// const pubkey = 'e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f'

const doSomething = (pubkey) => {
  const profile = { pubkey }
  return { profile }
}
const TestPageBody = () => {
  console.log('render ProblemComponent')
  const params = { pubkey: 'e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f' }
  const { profile } = doSomething({params})
  const obj = doSomething(params)
  return (
    <>
      <center>
        <h3>Test Page Body</h3>
      </center>
      <div>
        <p>Lorem ipsum</p>
        <div>{obj.profile.pubkey?.pubkey}</div>
        <pre>{JSON.stringify(profile, null, 4)}</pre>
        <pre>{JSON.stringify(obj, null, 4)}</pre>
      </div>
    </>
  )
}

export default TestPageBody
