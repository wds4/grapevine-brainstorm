import * as React from 'react'
import { useNewEvent, useSigner } from 'nostr-hooks'

import { CButton } from '@coreui/react'
import { relayListFromKind3 } from '@nostr-dev-kit/ndk'

const PublishNip51List = ({ tableConfig, tableGetFilteredRowModel }) => {
  console.log(`rerender PublishNip51List`)
  const [numPubkeys, setNumPubkeys] = React.useState(3000)
  const { createNewEvent } = useNewEvent()
  const { signer } = useSigner()
  const makeNip51List = () => {
    const event = createNewEvent()
    event.kind = 30000

    const aRows = tableGetFilteredRowModel().rows
    const aTags = [
      ['P', 'tapestry'],
      ['wordType', 'influenceScoresList'],
      ['w', 'influenceScoresList'],
      [
        'description',
        'a list of nostr npubs and their associated Grapevine WoT Scores as calculated by the Tapestry Protocol',
      ],
    ]
    const dTag = ['d', 'influenceScoresList_' + numPubkeys]
    const titleTag = ['title', 'My Grapevine Recommended (GrapeRank ' + numPubkeys + ')']
    aTags.push(dTag)
    aTags.push(titleTag)
    for (let x = 0; x < Math.min(aRows.length, numPubkeys); x++) {
      const oNextRow = aRows[x]
      const pk = oNextRow.original.pubkey
      const influence = oNextRow.original.influence
      const personalizedPageRank = oNextRow.original.personalizedPageRank
      const degreeOfSeparation = oNextRow.original.degreeOfSeparation

      const aNextTag = ['p', pk, degreeOfSeparation, personalizedPageRank, influence]
      aTags.push(aNextTag)
    }
    event.tags = aTags
    signer.sign(event)
    console.log('event: ' + JSON.stringify(event, null, 4))
    event.publish()
  }
  return (
    <>
      <div style={{ display: tableConfig.displayPublishButton }}>
        <CButton color="primary" onClick={() => makeNip51List()}>
          publish list to nostr!
        </CButton>
        <div>
          Create a NIP-51 list composed of the top{' '}
          <input type="text" value={numPubkeys} onChange={(e) => setNumPubkeys(e.target.value)} />{' '}
          pubkeys that are currently depicted in the table below, as filtered and sorted. (Currently
          outputs to console in addition to publish; although be aware, most relays will not accept
          a list over about 800 or 900 pubkeys.)
        </div>
      </div>
    </>
  )
}

export default PublishNip51List
