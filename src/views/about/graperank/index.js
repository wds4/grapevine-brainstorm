import React from 'react'

const AboutGrapeRank = () => {
  console.log('rendering About component')
  return (
    <>
      <center>
        <h3>About GrapeRank</h3>
      </center>
      <div style={{ marginTop: '50px' }}>
        <p>
          To address the problems of bots and spam, the GrapeRank score is designed to distinguish
          "real" nostr users ("not-spam, not-a-bot") from unverified accounts.
        </p>
        <p>GrapeRank scores are calculated using follows (kind 3) and mutes (kind 10000).</p>

        <p>
          The GrapeRank score has 4 parameters: influence, confidence, average score, and weight,
          with influence being the principal output.
        </p>
        <p>
          The GrapeRank INFLUENCE score is a real number that ranges from 0 (unverified; presumed
          bot or spam) to 1 (a real user). A score of 0.4 is suggested as a reasonable cutoff
          between verified and unverified npubs, but may be adjusted based on experience.
        </p>
      </div>
      <div style={{ marginTop: '50px' }}>
        <center>
          <h4>Use cases</h4>
        </center>
      </div>

      <div style={{ marginTop: '50px' }}>
        <p>
          The baseline ("not-a-bot") GrapeRank score:
          <li>
            <b>build your follows list</b>, especially useful for new users
          </li>
          <li>
            <b>alternative nostr feed</b>: top-scoring npubs not already in your follows list
          </li>
          <li>
            <b>sort your followers</b>, perhaps decide which of them to follow back!
          </li>
          <li>
            identify <b>imposter accounts</b> quickly and easily
          </li>
        </p>
        <p>
          Future, contextual GrapeRank scores, which will incorporate data from a diverse range of
          inputs (beyond just follows and mutes), will have context-specific use cases.
        </p>
      </div>
      <div style={{ marginTop: '50px' }}>
        <center>
          <h4>
            What makes GrapeRank better than PageRank, follows count, or various other WoT algos and
            scores?
          </h4>
        </center>
      </div>

      <div style={{ marginTop: '50px' }}>
        <p>Simply put: PageRank is fiat. GrapeRank is cyberpunk.</p>
        <p>
          Unlike PageRank or follows counts, the GrapeRank score is not just another popularity
          contest.
        </p>
        <p>
          The GrapeRank algorithm can see beyond follows of follows and find high quality npubs that
          are 3, 4, or more hops away.
        </p>
        <p>
          It only takes a small handful of trusted follows for newcomers to nostr to gain
          visibility.
        </p>
        <p>
          It only takes one or a small handful of mutes by trusted users to weed out the spam from
          your Grapevine.
        </p>
        <p>
          Future versions of GrapeRank will incorporate reports, zaps, labels, badges, and other
          indicators. Each new source of data will improve the ability to discover high quality
          needles in the haystack as well as to weed out bad actors.
        </p>
        <p>GrapeRank can produce scores with any desired context.</p>
        <p>
          The GrapeRank INFLUENCE score is specfically designed to be useful for calculations that
          require context-specific <b>weights</b>, e.g. <b>weighted averages, tallying votes</b>,
          etc.
        </p>
      </div>
    </>
  )
}

export default AboutGrapeRank
