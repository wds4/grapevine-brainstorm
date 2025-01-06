import { cilCheck } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React from 'react'

const IsNeo4jServerUp = () => {
  const [serverState, setServerState] = React.useState('?')
  async function isNeo4jServerUp(url) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      if (data.message) {
        setServerState('YES')
      }
      return data
    } catch (error) {
      console.error('api/outwardFacing/singlePubkey/grapeRank endpoint error:', error)
    }
  }
  React.useEffect(() => {
    const url = `https://www.graperank.tech/api`
    isNeo4jServerUp(url)
  }, [])

  if (serverState == 'YES') {
    return (
      <>
        <div style={{ display: 'inline-block' }}>
          server: <CIcon icon={cilCheck} size="lg" />
        </div>
      </>
    )
  }
  return (
    <>
      <div style={{ display: 'inline-block' }}>... is brainstorm neo4j server up? ...</div>
    </>
  )
}

export default IsNeo4jServerUp
