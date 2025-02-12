import React, { useState, useEffect } from 'react'
import {
  CAvatar,
  CButton,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilUser,
  cilHome,
  cibWikipedia,
  cibApple,
  cibTwitter,
  cilInfo,
  cilArrowThickFromLeft,
  cilBuilding,
  cilSitemap,
  cilGlobeAlt,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { useActiveUser, useLogin, useNdk } from 'nostr-hooks'

import { noProfilePicUrl } from 'src/const'
import { useNavigate } from 'react-router-dom'

import { asyncFetchProfile } from 'src/helpers/ndk'
import { useDispatch } from 'react-redux'

const AppHeaderDropdown = () => {
  const { activeUser } = useActiveUser()
  if (!activeUser) {
    return (
      <>
        <CButton href="#/login" color="primary">
          Login
        </CButton>
      </>
    )
  }
  return <ActiveHeaderDropdownLoggedIn activeUser={activeUser} />
}

const Avatar = ({}) => {
  const { ndk } = useNdk()
  const dispatch = useDispatch()
  const [profilePicUrl, setProfilePicUrl] = useState(noProfilePicUrl)

  const { activeUser } = useActiveUser()

  useEffect(() => {
    const updateProfilePic = async () => {
      const obj = {}
      obj.pubkey = activeUser?.pubkey
      const oProfile = await asyncFetchProfile(ndk, obj)
      setProfilePicUrl(oProfile?.image)
    }
    updateProfilePic()
  }, [activeUser])

  console.log('rerender Avatar')

  return <CAvatar style={{ backgroundColor: 'grey' }} src={profilePicUrl} size="md" />
}

const ActiveHeaderDropdownLoggedIn = ({ activeUser }) => {
  const { logout } = useLogin()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    dispatch({
      type: 'set',
      loggedInUser: { loggedIn: false, pubkey: '', npub: '' },
      profileBeingViewed: { selected: false, pubkey: '', npub: '' },
    })
    navigate('/')
  }
  console.log('rerender ActiveHeaderDropdownLoggedIn')

  const myProfileRoute="#/profile?pubkey="+activeUser?.pubkey
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <Avatar />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
          Pretty Good Apps
        </CDropdownHeader>
        <CDropdownItem
          href="#"
          onClick={() => {
            console.log('home')
          }}
        >
          <CIcon icon={cilHome} className="me-2" />
          Home
        </CDropdownItem>
        <CDropdownItem
          href="#/helloWorld"
          onClick={() => {
            console.log('helloWorld')
          }}
        >
          <CIcon icon={cilBuilding} className="me-2" />
          Hello World
        </CDropdownItem>
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Apps</CDropdownHeader>
        <CDropdownItem href="#/grapevine">
          <CIcon icon={cibWikipedia} className="me-2" />
          Grapevine
        </CDropdownItem>
        <CDropdownItem href="#/graperank">
          <CIcon icon={cibTwitter} className="me-2" />
          GrapeRank
        </CDropdownItem>
        <CDropdownItem href="#/hopstr">
          <CIcon icon={cibApple} className="me-2" />
          Hopstr
        </CDropdownItem>
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem href={myProfileRoute}>
          <CIcon icon={cilUser} className="me-2" />
          My Profile
        </CDropdownItem>
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Settings</CDropdownHeader>
        <CDropdownItem onClick={() => handleLogout()}>
          <CIcon icon={cilArrowThickFromLeft} className="me-2" />
          Logout
        </CDropdownItem>
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">PGFT</CDropdownHeader>
        <CDropdownItem href="#/about">
          <CIcon icon={cilInfo} className="me-2" />
          About
        </CDropdownItem>
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Under Development</CDropdownHeader>
        <CDropdownItem href="#/dashboard">
          <CIcon icon={cilSitemap} className="me-2" />
          Apps Homepage
        </CDropdownItem>
        <CDropdownItem href="#/worldviews">
          <CIcon icon={cilGlobeAlt} className="me-2" />
          Worldviews
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
