import React, { useEffect, useRef } from 'react'
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network'
import { noProfilePicUrl } from '../../../const'

export let nodes = new DataSet([
  { id: 1, label: 'Node 1' },
  { id: 2, label: 'Node 2' },
  { id: 3, label: 'Node 3' },
  { id: 4, label: 'Node 4' },
  { id: 5, label: 'Node 5' },
  { id: 6, label: 'Node 6' },
  { id: 7, label: 'Node 7' },
  { id: 8, label: 'Node 8' },
])

export let edges = new DataSet([
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 4 },
  { from: 1, to: 5 },
  { from: 3, to: 6 },
  { from: 2, to: 7 },
  { from: 2, to: 8 },
])

export let data = {
  nodes,
  edges,
}

export let network = {}

export const groups = {
  user: {
    shape: 'circularImage',
    image: noProfilePicUrl,
    brokenImage: noProfilePicUrl,
  },
  instance: {
    shape: 'box',
    color: 'red',
  },
  ratingOfInstance: {
    color: 'green'
  },
  legend: {
    color: '#EFEFEF',
    borderWidth: 0,
  },
}

export const options = {
  autoResize: true,
  clickToUse: false,
  interaction: { hover: true },
  physics: {
    enabled: true,
  },
  nodes: {
    margin: 10,
    borderWidth: 1,
    color: { background: '#FFFFFF', border: '#000000' },
    widthConstraint: {
      minimum: 0,
      maximum: 100,
    },
  },
  edges: {
    hoverWidth: 5,
    selectionWidth: 5,
    scaling: {
      min: 1,
      max: 10,
      label: {
        enabled: false,
        min: 14,
        max: 30,
      },
      customScalingFunction(min, max, total, value) {
        if (max === min) {
          return 0.5;
        }
        const scale = 1 / (max - min);
        return Math.max(0, (value - min) * scale);
      },
    },
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
  /*
    var nodes_arr = [];
    var edges_arr = [];

    nodes = new DataSet(nodes_arr);
    edges = new DataSet(edges_arr);
    data = {
        nodes,
        edges
    };
    */

  const domNode = useRef(null)

  network = useRef(null)

  useEffect(() => {
    network.current = new Network(domNode.current, data, options)
    network.current.fit()

    network.current.on('click', function (params) {
      const nodes_arr = params.nodes
      const numNodes = nodes_arr.length
    })

    // EDGES
    network.current.on('selectEdge', function (params) {
      // console.log("selectEdge event triggered")
      const edges_arr = params.edges
      const numEdges = edges_arr.length
      if (numEdges == 1) {
        const edgeID = edges_arr[0]
      }
    })
    network.current.on('deselectEdge', function (params) {})

    // NODES
    network.current.on('selectNode', function (params) {
      // console.log("selectNode event triggered")
      const nodes_arr = params.nodes
      const numNodes = nodes_arr.length
      if (numNodes == 1) {
        const nodeID = nodes_arr[0]
        const node = nodes.get(nodeID)
        const { name } = node
        // drawScoreCalculationPanel(nodeID)
      }
    })
    network.current.on('deselectNode', function (params) {
      // jQuery("#usernameContainer").html("none")
    })
  }, [domNode, network, data, options])

  return (
    <>
      <div style={{ height: '500px', width: '700px', border: '1px solid purple' }} ref={domNode} />
    </>
  )
}
export default Graphic
