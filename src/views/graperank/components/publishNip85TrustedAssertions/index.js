import * as React from 'react'
import { useNdk, useNewEvent, useSigner } from 'nostr-hooks'
import { CButton, CFormSwitch } from '@coreui/react'
import { timeout } from 'src/helpers'
import PulseLoader from 'react-spinners/PulseLoader'
import Confetti from 'react-confetti'
import { useWindowDimensions } from 'src/helpers/windowDimensions'
import NDK, { NDKEvent, NDKNip07Signer, NDKRelay, NDKRelaySet } from '@nostr-dev-kit/ndk'
import { customNDK } from '../../../../App'

/*
Publishes Trusted Assertions using Vitor's proposed NIP-85
see:
https://github.com/vitorpamplona/nips/blob/user-summaries/85.md

One 30382 event per pubkey

*/

const PublishTrustedAssertions = ({
  activatePublishingScript,
  tableGetFilteredRowModel,
  pubkey,
}) => {
  const { height, width } = useWindowDimensions()

  const hasenpfeffrRelaySet = NDKRelaySet.fromRelayUrls(['wss://relay.hasenpfeffr.com'], customNDK)

  const { signer } = useSigner()
  const { createNewEvent } = useNewEvent()
  const [numNip85Events, setNumNip85Events] = React.useState(0)

  async function publishTestEvent() {
    const event = createNewEvent()
    event.kind = 1
    event.content = 'testing relaySet again'
    signer.sign(event)
    console.log(`qwerty` + JSON.stringify(event, null, 4))
    event.publish(hasenpfeffrRelaySet)
  }

  async function publishAssertion({ oNextRow }) {
    const pk = oNextRow.original.pubkey
    const influence = oNextRow.original.influence
    const personalizedPageRank = oNextRow.original.personalizedPageRank
    const degreeOfSeparation = oNextRow.original.degreeOfSeparation
    const rank = Math.round(influence * 100)
    if (rank > 0) {
      const event = createNewEvent()
      event.kind = 30382
      const aTags = [
        ['d', pk],
        ['rank', rank.toString()],
        ['personalized_grapeRank', influence.toString()],
        ['personalized_pageRank', personalizedPageRank.toString()],
        ['dos', degreeOfSeparation.toString()],
      ]
      event.tags = aTags
      signer.sign(event)
      event.publish(hasenpfeffrRelaySet)
      return true
    } else {
      return false
    }
  }

  async function publishTrustedAssertions() {
    const aRows = tableGetFilteredRowModel().rows
    let numNonzeroPubkeys = 0
    for (let x = 0; x < Math.min(aRows.length); x++) {
      const oNextRow = aRows[x]
      const added = await publishAssertion({ oNextRow })
      if (added) {
        numNonzeroPubkeys++
        setNumNip85Events(numNonzeroPubkeys)
      }
    }
    console.log(`number of 30382 events: ` + numNonzeroPubkeys)
  }

  async function declareTrustedServiceProvider() {
    const event = createNewEvent()
    event.kind = 10040
    const aTags = [
      ['30382:rank', pubkey, 'wss://relay.hasenpfeffr.com'],
      ['30382:personalized_grapeRank', pubkey, 'wss://relay.hasenpfeffr.com'],
      ['30382:personalized_pageRank', pubkey, 'wss://relay.hasenpfeffr.com'],
      ['30382:dos', pubkey, 'wss://relay.hasenpfeffr.com'],
    ]
    event.tags = aTags
    signer.sign(event)
    console.log('event: ' + JSON.stringify(event, null, 4))
    event.publish(hasenpfeffrRelaySet)
  }

  React.useEffect(() => {
    if (activatePublishingScript) {
      publishTrustedAssertions()
      declareTrustedServiceProvider()
      // publishTestEvent()
    }
  }, [activatePublishingScript])

  if (numNip85Events == 0) {
    return (
      <>
        <div>
          <div style={{ display: 'inline-block' }}>
            <PulseLoader />
          </div>
          exporting Trusted Assertions
          <div style={{ display: 'inline-block' }}>
            <PulseLoader />
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <Confetti width={width} height={height} />
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '26px' }}>🔥 Exported {numNip85Events} Trusted Assertions 🔥</div>
        <div>Your personalized WoT scores are now available for access by clients!!</div>
      </div>
    </>
  )
}

const PublishNip85TrustedAssertionsFullElement = ({
  tableConfig,
  tableGetFilteredRowModel,
  pubkey,
}) => {
  console.log(`rerender PublishNip85TrustedAssertionsElement`)

  const [displayPublishNip85Button, setDisplayPublishNip85Button] = React.useState('block')
  const [activatePublishingScript, setActivatePublishingScript] = React.useState(false)

  const [showNip85InfoButton, setShowNip85InfoButton] = React.useState('hide')
  const toggleShowNip85Info = React.useCallback(
    (e) => {
      if (showNip85InfoButton == 'hide') {
        setShowNip85InfoButton('show')
      }
      if (showNip85InfoButton == 'show') {
        setShowNip85InfoButton('hide')
      }
    },
    [showNip85InfoButton],
  )

  async function processButtonClick() {
    setDisplayPublishNip85Button('none')
    await timeout(10)
    setActivatePublishingScript(true)
  }
  if (displayPublishNip85Button == 'block') {
    return (
      <>
        <div
          style={{
            display: tableConfig.displayPublishButton,
            marginBottom: '20px',
          }}
        >
          <div style={{ textAlign: 'center', display: displayPublishNip85Button }}>
            <CButton
              color="primary"
              onClick={() => {
                processButtonClick()
              }}
            >
              publish Trusted Assertions
            </CButton>
          </div>
          <CFormSwitch
            onChange={(e) => toggleShowNip85Info(e)}
            label="What are Trusted Assertions?"
            id="formSwitchShowInfo"
          />
          <div
            className={showNip85InfoButton}
            style={{
              marginBottom: '10px',
              border: '1px solid grey',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            <p>
              Publish your personalized WoT scores as Trusted Assertions according to the{' '}
              <a
                target="_blank"
                href="https://github.com/vitorpamplona/nips/blob/user-summaries/85.md"
                rel="noreferrer"
              >
                NIP-85
              </a>{' '}
              protocol. This will create one kind 30382 event for each pubkey whose GrapeRank score
              is above 0.01. Each event contains that pubkey's personalized GrapeRank, personalized
              PageRank and degrees-of-separation scores as calculated from your perspective.
            </p>
            <p style={{ color: 'purple', fontSize: '20px' }}>
              Pester your favorite nostr client developers and ask them to put these scores to good
              use!
            </p>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <div
        style={{
          display: tableConfig.displayPublishButton,
          border: '1px solid grey',
          marginBottom: '20px',
        }}
      >
        <PublishTrustedAssertions
          activatePublishingScript={activatePublishingScript}
          tableGetFilteredRowModel={tableGetFilteredRowModel}
          pubkey={pubkey}
        />
      </div>
    </>
  )
}

export default PublishNip85TrustedAssertionsFullElement
