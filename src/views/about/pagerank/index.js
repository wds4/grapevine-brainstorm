import React from 'react'

const AboutRageRank = () => {
  console.log('rendering About component')
  return (
    <>
      <center>
        <h3>About PageRank</h3>
      </center>
      <div style={{ marginTop: '50px' }}>
        <p>
          PageRank is the simple, powerful and revolutionary algorithm that put Google on the map.
        </p>
        <p>
          PageRank is one example of a centrality algorithm, designed to calculate an{' '}
          <i>importance score</i> from a graph. In the case of Google, PageRank calculates an
          importance score for each (urls) based upon the hyperlinks from one url to another. When
          one url (url A) sends a hyperlink to another url (url B), the PageRank score of url B gets
          a boost. Imprtantly, the amount of the boost depends upon the importance score of url A.
          The score is then used to stratify the results of internet keyword searches. The results
          were almost like magic, with the amount of spam returned from keyword searches reduced
          significantly.
        </p>
        <p>
          For nostr, the natural way to implement PageRank is to use it to calculate importance
          scores of npubs based upon follows. Here, we use the{' '}
          <a
            target="_blank"
            href="https://neo4j.com/docs/graph-data-science/current/algorithms/page-rank/"
            rel="noreferrer"
          >
            neo4j Graph Data Science
          </a>{' '}
          to calculate personalized PageRank scores, and use this as one method for calculating a
          nostr "web of trust."
        </p>
      </div>

      <div style={{ marginTop: '50px' }}>
        <center>
          <h4>Uses for PageRank in nostr</h4>
        </center>
        <p>
          PageRank will be a useful tool for stratification of search results, in much the same way
          that it is used by Google. One of the advantages is that the algorithm is well understood
          and widely used. By allowing personalized Web of Trust relays that calculate personalized
          PageRank scores, we can begin to give users the tools to "be your own Google."
        </p>
      </div>

      <div style={{ marginTop: '50px' }}>
        <center>
          <h4>Shortcomings of PageRank</h4>
        </center>
        <p>
          The biggest problem with PageRank is that it was designed in a fiat world, for fiat ends.
          More specifically: PageRank is a popularity contest.
        </p>
        <p>
          This made sense for Google, whose monetization model is advertising. Urls that drive
          traffic are good for advertising. Influencers are their bread and butter.
        </p>
        <p>
          GrapeRank is designed to estimate the intrinsic value of any given npub, in any given
          context, independent of that npub's popularity. It is designed for use by the sovereign
          individual, not big tech.
        </p>
        <p>
          For more information, see this article:{' '}
          <a
            target="_blank"
            href="https://habla.news/a/naddr1qvzqqqr4gupzq576k3ee24ptfhuun4dn9y6yqwm4ru9gstnfhwxa3fnqmuaftupdqqxnzdes8q6rwv3hxs6rjvpe2k4lwm"
            rel="noreferrer"
          >
            The Pretty Good way to calculate a user's influence within your web of trust
          </a>.
        </p>
      </div>
    </>
  )
}

export default AboutRageRank
