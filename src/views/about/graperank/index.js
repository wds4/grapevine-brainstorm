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

      <div style={{ marginTop: '50px' }}>
        <center>
          <h4>Algorithm</h4>
        </center>
      </div>

      <div style={{ marginTop: '50px' }}>
        <p>
          The input to GrapeRank is a graph. Each node is a pubkey. Edges point from one node to
          another and are either FOLLOWS and MUTES. (Reports will be implemented in a future
          iteration.)
        </p>
        <p>
          The end goal of the GrapeRank algorithm is to calculate a set of numbers associated with
          each pubkey. Those numbers are:
          <li>INFLUENCE</li>
          <li>AVERAGE</li>
          <li>INPUT (aka "weights" or "sum of weights")</li>
          <li>CONFIDENCE</li>
        </p>
        <p>
          INITIALIZATION. The scores for each and every pubkey are initialized as follows:
          <li>INFLUENCE = AVERAGE = INPUT = CONFIDENCE = 0</li>
        </p>
        <p>
          One user (YOU) is selected as the seed user. For the seed user, GrapeRank scores are FIXED
          as follows:
          <li>INFLUENCE = AVERAGE = CONFIDENCE = 1</li>
          <li>INPUT = 999 (in theory, input is infinite for the seed user)</li>
        </p>
        <p>
          The scores for the seed user are fixed; for all other users, the scores are updated via an
          series of iterations.
        </p>
        <p>ITERATIONS</p>
        <p>
          Cycle through each pubkey, one at a time, and calculate:
          <li>
            AVERAGE: Gather together all FOLLOWS and all MUTES for the user in question. Each FOLLOW
            and MUTE is interpreted as a "rating" of 1 or 0 (respectively), with the author of each
            follow or mute interpreted as the "rater". Each rating is assigned a weight according to
            the weighted average equation (below).
          </li>
          <li>INPUT: The sum over all WEIGHTs when calculating the AVERAGE.</li>
          <li>
            CONFIDENCE: a number between 0 and 1 (o % and 100 %). It is a function of INPUT. If
            INPUT is zero, then CONFIDENCE is zero. The bigger the INPUT, the closer the CONFIDENCE
            gets to 1 (100 %). The max value of 100 % is approached asymptotically. In theory, it
            takes an infinite amount of INPUT to achieve a CONFIDENCE of 100 %. In practice, most
            real users reach a CONFIDENCE above 90% after only a handful of high quality followers.
            Most active nostr users reach a CONFIDENCE of above about 98 % or 99 %. The speed with
            which the CONFIDENCE approaches 100 % as INPUT goes from 0 to infinity is controlled by
            a parameter called RIGOR which can be adjusted in the settings.
          </li>
          <li>
            INFLUENCE = AVERAGE * CONFIDENCE. An influence score near 1 means: highly likely to be a
            real user. An influence score close to 0 means: NOT verified to be a real user.
          </li>
        </p>
        <p>Weighted Average calculation</p>
        <li>WEIGHT = ATTENUATION FACTOR * INFLUENCE * X</li>
        <li>INFLUENCE is the INFLUENCE score of the rater, a number between 0 and 1</li>
        <li>
          X is the weight of the rating-type, and is a number between 0 and 1. For a FOLLOW, it
          defaults to 0.03. For a MUTE, it defaults to 0.50.
        </li>
        <li>
          ATTENUATION FACTOR is a number between 0 and 1, set to 0.85 by default. If you are
          inherently skeptical of pubkeys that are a large number of hops away on the graph, you
          decrease this variable.
        </li>
        <p>
          Many of the above parameters are "open to interpretation" and can therefore be adjusted in
          the settings page.
        </p>
        <p>
          Iterate through all pubkeys multiple times until, in theory, all values converge (in
          practice, until any changes between one iteration and the next are below some cutoff).
        </p>
      </div>
    </>
  )
}

export default AboutGrapeRank
