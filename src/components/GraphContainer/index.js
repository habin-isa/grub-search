import React, { useState, useEffect, createRef } from 'react';
import * as S from './styles';
import { renderChart, modifiedChart } from './chart';
import * as d3 from 'd3';
import * as d3Require from 'd3-require';

const GraphContainer = ({ similarVenues }) => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  const data = {
    nodes: [],
    links: []
  };

  const chartInput = createRef();

  useEffect(
    () => {
      console.log('similarVenues', similarVenues);
      const myNode = document.getElementById('chartId');
      myNode.innerHTML = '';
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
          const chartData = renderChart(data, d3.select('.chartData'));
          // const chartData = modifiedChart(data, d3.select('.chartData'));

          console.log('renderChart: ', chartData);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [similarVenues]
  );

  return (
    <S.Wrapper>
      <div id="chartId" className="chartData"></div>
    </S.Wrapper>
  );
};

export default GraphContainer;
