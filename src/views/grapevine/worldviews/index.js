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
    label: 'Curated List:\neCash Mints',
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
    label: 'Ratings: Not Spam',
    selfReference: { size: 55, angle: 1.5, renderBehindTheNode: 100 },
  },
  { id: 2, from: 1, to: 2, label: 'Ratings: Nostr Devs' },
  { id: 3, from: 2, to: 3, label: 'Ratings: eCash Mints' },
  {
    id: 4,
    from: 1,
    to: 3,
    width: 1,
    smooth: { type: 'diagonalCross' },
    arrows: {
      from: { enabled: true },
      to: { enabled: true },
    },
    endPointOffset: {
      from: -50,
      to: 5,
    },
    label: 'Ratings: eCash Mints',
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

  const [nodeInformationBox, setNodeInformationBox] = useState('click a node for info')
  const [edgeInformationBox, setEdgeInformationBox] = useState('click an edge for info')

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
        ratingsInfo += `Not Spam ratings are derived from follows and mutes.`
        setEdgeInformationBox(ratingsInfo)
      }
      if (id == 2) {
        let ratingsInfo = ''
        ratingsInfo += `Nostr Dev ratings are derived from NIP-51 lists entitled: Nostr Devs.`
        setEdgeInformationBox(ratingsInfo)
      }
      if (id == 3 || id == 4) {
        let ratingsInfo = ''
        ratingsInfo += `eCash Mints ratings are derived from (??).`
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
        curatedListInfo += `The Not Spam list is calculated using Not Spam ratings.`
        setNodeInformationBox(curatedListInfo)
      }
      if (id == 2) {
        let curatedListInfo = ''
        curatedListInfo += `The Nostr Dev list is calculated using Nostr Devs ratings.`
        setNodeInformationBox(curatedListInfo)
      }
      if (id == 3) {
        let curatedListInfo = ''
        curatedListInfo += `The eCash Mints list is calculated using eCash Mints ratings `
        curatedListInfo += `and is curated by nostr devs as well as regular (not spam) users. `
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
        <div
          style={{ height: '400px', width: '800px', border: '2px solid purple' }}
          ref={domNode}
        />
        <div
          style={{
            display: 'inline-block',
            width: '700px',
            textAlign: 'left',
            padding: '10px',
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
