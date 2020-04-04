import React, { useState, useEffect } from 'react';
// , { useEffect, useState, useReducer }
import * as S from './styles';
import { renderChart } from './chart';
import * as d3 from 'd3';
import * as d3Require from 'd3-require';

const GraphContainer = ({ similarVenues }) => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  const data = {
    nodes: [],
    links: []
  };

  useEffect(
    () => {
      d3Require.require('d3@5');
      if (similarVenues.length > 0) {
        {
          similarVenues.map((venue, i) => {
            data.nodes.push({
              id: venue.name,
              group: venue.name,
              key: venue.id,
              size: 20
            });
          });
          setNodes(data.nodes);
        }
        const length = data.nodes.length;
        if (length > 1) {
          for (var i = 1; i < length; i++) {
            data.links.push({
              source: data.nodes[i - 1].id,
              target: data.nodes[i].id,
              value: 3
            });
          }
          setLinks(data.links);
          renderChart(data);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [similarVenues]
  );

  return (
    <S.Wrapper>
      <S.Title>Graph Container</S.Title>
    </S.Wrapper>
  );
};

export default GraphContainer;