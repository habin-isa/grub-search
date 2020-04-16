import React, { useState, useEffect, createRef } from 'react';
import * as S from './styles';
import { modifiedChart } from './chart';
import * as d3 from 'd3';
import * as d3Require from 'd3-require';
import { array, number, object } from 'prop-types';

const GraphContainer = ({ similarVenues, stopChart, seedVenue, newVenues, sortedData }) => {
  const data = {
    nodes: [],
    links: []
  };
  const chartInput = createRef();

  const totalVenues = similarVenues.concat(newVenues);
  const newVenuesLength = newVenues.length;

  useEffect(
    () => {
      const myNode = document.getElementById('chartId');
      myNode.innerHTML = '';
      d3Require.require('d3@5');

      if (totalVenues.length > 0) {
        data.nodes.push({
          id: seedVenue.name,
          group: 0
        });
        {
          totalVenues.map((venue, i) => {
            data.nodes.push({
              id: venue.name,
              group: i + 1
            });
          });
        }

        const datalength = similarVenues.length + 1;
        for (var i = 0; i < datalength; i++) {
          data.links.push({
            source: data.nodes[0].id,
            target: data.nodes[i].id,
            value: 3
          });
        }
        for (var i = datalength + 1; i < data.nodes.length; i++) {
          data.links.push({
            source: data.nodes[1].id,
            target: data.nodes[i].id,
            value: 3
          });
        }

        const chartData = modifiedChart(sortedData, data, newVenuesLength, d3.select('.chartData'));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [totalVenues]
  );

  return (
    <S.Wrapper>
      <div id="chartId" className="chartData" />
    </S.Wrapper>
  );
};

GraphContainer.propTypes = {
  similarVenues: array,
  stopChart: number,
  sortedData: object
};

GraphContainer.defaultProps = {
  similarVenues: [],
  stopChart: 0,
  sortedData: {}
};

export default GraphContainer;
