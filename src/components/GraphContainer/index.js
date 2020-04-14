import React, { useState, useEffect, createRef } from 'react';
import * as S from './styles';
import { modifiedChart } from './chart';
import * as d3 from 'd3';
import * as d3Require from 'd3-require';
import { array, number } from 'prop-types';

const GraphContainer = ({ similarVenues, stopChart, seedVenue }) => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  const data = {
    nodes: [],
    links: []
  };

  const chartInput = createRef();

  useEffect(
    () => {
      const myNode = document.getElementById('chartId');
      myNode.innerHTML = '';
      d3Require.require('d3@5');

      if (similarVenues.length > 0) {
        data.nodes.push({
          id: seedVenue.name,
          group: seedVenue.name,
          key: seedVenue.id,
          size: 20
        });
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
          console.log({ nodes });
        }
        const length = data.nodes.length;
        if (length > 1) {
          for (var i = 1; i < length; i++) {
            data.links.push({
              source: data.nodes[0].id,
              target: data.nodes[i].id,
              value: 3
            });
          }
          setLinks(data.links);
          console.log({ links });
          const chartData = modifiedChart(data, d3.select('.chartData'), stopChart);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [similarVenues]
  );

  return (
    <S.Wrapper>
      <div id="chartId" className="chartData" />
    </S.Wrapper>
  );
};

GraphContainer.propTypes = {
  similarVenues: array,
  stopChart: number
};

GraphContainer.defaultProps = {
  similarVenues: [],
  stopChart: 0
};

export default GraphContainer;
