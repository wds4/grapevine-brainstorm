import React, { useEffect, useRef, useState } from 'react'
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network'
import { noProfilePicUrl } from '../../../const'

export let nodes = new DataSet([
  {
    id: 1,
    group: 'npubs',
    label: 'Curated List:\nRegular (Not Spam)\nNostr Users',
    physics: false,
    fixed: true,
    x: -350,
    y: 0,
  },
  {
    id: 2,
    group: 'npubs',
    label: 'Curated List:\nNostr Devs',
    physics: false,
    fixed: true,
    x: 0,
    y: 0,
  },
  {
    id: 3,
    group: 'things',
    label: 'Curated List:\nTrusted eCash Mints',
    physics: false,
    fixed: true,
    x: 350,
    y: 0,
    color: {
      background: '#EFEFEF',
      border: 'purple',
      hover: { background: 'white', border: 'green' },
    },
  },
])

export let edges = new DataSet([
  {
    id: 1,
    from: 1,
    to: 1,
    label: 'Attestations: Not Spam',
    selfReference: { size: 55, angle: 1.5, renderBehindTheNode: 100 },
  },
  { id: 2, from: 1, to: 2, label: 'Attestations: Nostr Devs' },
  { id: 3, from: 2, to: 3, label: 'Attestations: eCash Mints' },
  {
    id: 4,
    from: 1,
    to: 3,
    width: 1,
    smooth: { type: 'curvedCCW' },
    arrows: {
      from: { enabled: true },
      to: { enabled: true },
    },
    label: 'Attestations: eCash Mints',
  },
])

export let data = {
  nodes,
  edges,
}

export let network = {}

export const groups = {
  npubs: {
    shape: 'circularImage',
    image: 'https://i.nostr.build/XB9LA18KI2PYCFZK.png',
    brokenImage: noProfilePicUrl,
    color: 'green',
  },
  things: {
    shape: 'square',
    color: 'white',
    border: 'red',
  },
}

export const options = {
  interaction: { hover: true },
  nodes: {
    size: 50,
    font: '22px',
    color: {
      border: 'purple',
    },
  },
  edges: {
    width: 8,
    font: { align: 'top', size: '22' },
    hoverWidth: 6,
    arrows: {
      to: {
        enabled: true,
        type: 'arrow',
      },
      middle: {
        enabled: false,
        type: 'arrow',
      },
      from: {
        enabled: false,
        type: 'circle', // or could do bar; however, it looks odd with arrowStrikethrough false
      },
    },
  },
  groups: groups,
}

const Graphic = () => {
  const domNode = useRef(null)

  const [nodeInformationBox, setNodeInformationBox] = useState('')
  const [edgeInformationBox, setEdgeInformationBox] = useState('')

  network = useRef(null)

  useEffect(() => {
    network.current = new Network(domNode.current, data, options)
    network.current.fit()

    network.current.on('click', function (params) {
      const nodes_arr = params.nodes
      const numNodes = nodes_arr.length
    })

    // EDGES
    network.current.on('hoverEdge', function (params) {
      setNodeInformationBox('')
      const edgeID = params.edge
      const edge = edges.get(edgeID)
      const { id } = edge
      // console.log(`selectEdge event triggered; edgeID: ${edgeID}`)

      if (id == 1) {
        let ratingsInfo = ''
        ratingsInfo += `Not Spam attestations are derived by interpretation of follows and mutes as attestations that npubs are (or are not) real, regular users (as opposed to spam).`
        setEdgeInformationBox(ratingsInfo)
      }
      if (id == 2) {
        let ratingsInfo = ''
        ratingsInfo += `Nostr Dev attestations are derived by interpretation of NIP-51 lists entitled: Nostr Devs as attestations that the referenced npubs are Nostr Devs.`
        setEdgeInformationBox(ratingsInfo)
      }
      if (id == 3 || id == 4) {
        let ratingsInfo = ''
        ratingsInfo += `eCash Mints attestations are derived by interpretation of (what raw data are we gonna use??) as attestations that the indicated mints are trustworthy.`
        setEdgeInformationBox(ratingsInfo)
      }
    })
    network.current.on('deselectEdge', function (params) {})

    // NODES
    network.current.on('hoverNode', function (params) {
      setEdgeInformationBox('')
      const nodeID = params.node
      const node = nodes.get(nodeID)
      const { id } = node
      console.log(`selectNode event triggered; name: ${nodeID}`)
      if (id == 1) {
        let curatedListInfo = ''
        curatedListInfo += `The Not Spam List is calculated using Not Spam attestations. All npubs, with the exception of the Seed User (you), are presumed to be spam until proven otherwise. This means that follows from bots are ignored by default.`
        setNodeInformationBox(curatedListInfo)
      }
      if (id == 2) {
        let curatedListInfo = ''
        curatedListInfo += `The Nostr Dev List is calculated using Nostr Devs attestations.`
        setNodeInformationBox(curatedListInfo)
      }
      if (id == 3) {
        let curatedListInfo = ''
        curatedListInfo += `The Trusted eCash Mints List is calculated using eCash Mints attestations `
        curatedListInfo += `and is curated by Nostr Devs as well as regular (not spam) users. `
        curatedListInfo += `Nostr Devs have more say than regular (not spam) users, as indicated by relative thickness of the arrows.`
        setNodeInformationBox(curatedListInfo)
      }
    })
    network.current.on('deselectNode', function (params) {
      // jQuery("#usernameContainer").html("none")
    })
  }, [domNode, network, data, options])

  return (
    <>
      <center>
        <h2>
          Worldview:
          <br />
          Curation of Trusted eCash Mints by your Grapevine
        </h2>
        <br />
        <p>Hover over a node or an edge to learn how the Grapevine curates data for you.</p>
        <div
          style={{
            height: '400px',
            width: '1000px',
            border: '2px solid purple',
          }}
          ref={domNode}
        />
        <div
          style={{
            display: 'inline-block',
            width: '1000px',
            textAlign: 'left',
            padding: '10px',
            fontSize: '22px',
          }}
        >
          {edgeInformationBox}
          {nodeInformationBox}
        </div>
      </center>
    </>
  )
}
export default Graphic
