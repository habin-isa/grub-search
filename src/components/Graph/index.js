import React, { useEffect, useState, useReducer } from 'react';
import * as S from './styles';
// import * as d3 from 'd3';
import { ForceGraph2D } from 'react-force-graph';

const Graph = ({ similarVenues }) => {
  const [showGraph, setShowGraph] = useState(0);
  const data = {
    nodes: [],
    links: []
  };

  const container = { width: 700, height: 400 };

  useEffect(() => {
    console.log('similarVenues:', similarVenues);
    if (similarVenues.length > 0) {
      {
        similarVenues.map((venue, i) => {
          data.nodes.push({
            id: venue.name,
            group: 1
          });
        });
      }
      console.log('data', data);
      const length = data.nodes.length;
      if (length > 1) {
        console.log('data.nodes.length', data.nodes.length);
        for (var i = 1; i < length; i++) {
          console.log('puppi');
          data.links.push({
            source: data.nodes[i - 1].id,
            target: data.nodes[i].id,
            value: 3
          });
          setShowGraph(1);
        }
        console.log('data:', data);
      }
    }
  });

  return (
    <S.Wrapper>
      <S.Title>Graph</S.Title>
      <div>showGraph: {showGraph}</div>
      <div>
        {showGraph === 1 ? (
          <div>
            ferrari
            <ForceGraph2D
              width={container.width}
              height={container.height}
              graphData={data}
              nodeLabel="id"
              nodeAutoColorBy="group"
              nodeOpacity={1}
              linkDirectionalParticles="value"
              linkDirectionalParticleSpeed={(d) => d.value * 0.002}
            />
          </div>
        ) : (
          'Only 1 similar venue'
        )}
      </div>
    </S.Wrapper>
  );
};

// prop graphData = object

export default Graph;
