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
      if (data.success) {
        setServerState('YES')
      }
    } catch (error) {
      console.error('api/tests/sql endpoint error:', error)
    }
  }
  React.useEffect(() => {
    const url = `https://www.graperank.tech/api/tests/sql`
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
      <div style={{ display: 'inline-block' }}> ... is brainstorm server up? (sql test) ...</div>
    </>
  )
}

export default IsNeo4jServerUp
