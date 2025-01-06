import React from 'react'

const AboutGrapeRank = () => {
  console.log('rendering About component')
  return (
    <>
      <center>
        <h3>About GrapeRank</h3>
      </center>
      <div>
        <p>You can think of GrapeRank as an improvement over PageRank.</p>
        <p>
          PageRank is the algorithm that launched Google in 1998. A simple idea, but one that
          changed the world.
        </p>
        <p>
          The disadvantage of PageRank is that it is designed for the fiat world. The monetization
          model for Google is advertising. As such, the PageRank score is designed to be a measure of
          popularity.
        </p>
        <center>"Be your own Google"</center>
        <p>
          As a sovereign individual, I care more about inherent worth than I do about popularity.
        </p>
        <p>GrapeRank has several advantages over PageRank:</p>
        <li>
          GrapeRank can harness whatever data is available. This is achieved via the process of{' '}
          <i>interpretation</i>.
        </li>
        <li>GrapeRank scores are context-specific.</li>
      </div>
      <div>
        <p>
          The process of <i>interpretation</i>{' '}
        </p>
      </div>
    </>
  )
}

export default AboutGrapeRank
