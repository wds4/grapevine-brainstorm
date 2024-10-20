import React, { useMemo } from 'react'
import { useProfile } from 'nostr-hooks'

const ProblemComponent = () => {
  const { profile } = useProfile({ pubkey: 'e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f' });
  // THIS FETCHES PROFILE CORRECTLY BUT CAUSES RERENDERS ABOUT 1 PER SECOND
  /*
  const pubkey = useMemo(
    () => 'e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f',
    [],
  )
  */
  // const pubkey = 'e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f'
  // const { profile } = useProfile({pubkey})


  // THIS ALSO FETCHES PROFILE CORRECTLY BUT CAUSES RERENDERS ABOUT 1 PER SECOND
  /*
  const params = { pubkey: 'e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f' }
  const { profile } = useProfile(params)
  */

  // THIS FETCHES PROFILE CORRECTLY BUT WITHOUT CAUSING RERENDERS

  /*
  const params = useMemo(
    () => ({ pubkey: 'e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f' }),
    [],
  )
  const { profile } = useProfile(params)
  */

  /* THE LESSON:
  Two things needed to be done to solve the problem of constant rerendering
  1. pass params into useProfile instead of { pubkey } (where params.pubkey = pubkey)
  2. Wrap params into useMemo
  */

  console.log('render ProblemComponent')

  return (
    <div>
      <p>name: {profile?.name}</p>
      <p>displayName: {profile?.displayName}</p>
      <p>website: {profile?.website}</p>
      <p>banner: {profile?.banner}</p>
      <p>about: {profile?.about}</p>
      <p>image: {profile?.image}</p>
    </div>
  )
}

export default ProblemComponent



// if (!profile) return <div>no profile</div>

/*
<center>
<h3>nostr-hooks: useProfile</h3>
</center>
<p>
This page uses the useProfile function from nostr-hooks to fetch a profile using a hardcoded
pubkey.
</p>
<p>
Problem: This component gets rerendered over and over, as seen in the javascript console
where <i>rerender TestPageBody, Test Page 3</i> is logged with each rerender.
</p>
<p>
Solution: See test page 4, where I employ an asynchronous function: asyncFetchProfile. (Did
I just reinvent the wheel?)
</p>
<hr />
<div>
<div>{JSON.stringify(params)}</div>
<p>name: {profile?.name}</p>
<p>displayName: {profile?.displayName}</p>
<p>website: {profile?.website}</p>
<p>banner: {profile?.banner}</p>
<p>about: {profile?.about}</p>
<p>image: {profile?.image}</p>
</div>
*/
