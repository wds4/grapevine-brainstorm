import React from 'react'

const AboutApp = () => {
  return (
    <>
      <center>
        <h3>About Hopstr and the Follows Network</h3>
      </center>
      <center>
        <div style={{ marginTop: '40px', marginBottom: '40px', width: '500px', textAlign: 'left' }}>
          <p>The Follows Network is one type of Web of Trust.</p>
          <p>
            It is composed of the nostr profiles you follow, the ones they follow, and so on. The
            maximum number of allowed "hops" can be restricted or unrestricted.
          </p>
          <p>
            As of Jan 2025, the unrestricted Follows Network for most users extends as far away as 7-8
            hops and is composed of over 175,000 npubs.
          </p>
          <p>
            Our service keeps track of kind 3 notes (follows) and maintains a graph database of nostr
            profiles and their follow relationships. This tool allows for efficient determination of
            any user's Follows Network. It can also be used for efficient calculation of the shortest
            follows path between any two npubs.
          </p>
        </div>
      </center>
    </>
  )
}

export default AboutApp
