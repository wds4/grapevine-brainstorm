import React from 'react'
import { CFooter } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibGithub, cilHeart } from '@coreui/icons'
import { useSelector } from 'react-redux'

const AppFooter = () => {
  const loggedInUser = useSelector((state) => state.loggedInUser)
  const profileBeingViewed = useSelector((state) => state.profileBeingViewed)

  return (
    <CFooter className="px-4">
      <div className="me-1">
        made with <CIcon icon={cilHeart} size="lg" /> by{' '}
        <a
          href="https://primal.net/p/npub1u5njm6g5h5cpw4wy8xugu62e5s7f6fnysv0sj0z3a8rengt2zqhsxrldq3"
          target="_blank"
          rel="noopener noreferrer"
        >
          straycat
        </a>
      </div>
      <div className="me-me" style={{ fontSize: '6px' }}>
        <div>loggedInUser: {loggedInUser.pubkey}</div>
        <div>profileBeingViewed: {profileBeingViewed.pubkey}</div>
      </div>
      <div className="ms-auto">
        <span className="ms-1">
          &copy; 2025{' '}
          <a target="_blank" href="https://pgf.tech" rel="noreferrer">
            Pretty Good Freedom Tech
          </a>
        </span>{' '}
        <a
          href="https://github.com/PrettyGoodFreedomTech"
          target="_blank"
          rel="noopener noreferrer"
        >
          <CIcon icon={cibGithub} size="lg" />
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
