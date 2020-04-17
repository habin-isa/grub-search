import React, { useEffect } from 'react';
import * as S from './styles';
import { modifiedChart } from './chart';
import * as d3 from 'd3';
import * as d3Require from 'd3-require';
import { object, number } from 'prop-types';

const GraphContainer = ({ initialData, stopChart }) => {
  useEffect(() => {
    const myNode = document.getElementById('chartId');
    myNode.innerHTML = '';
    d3Require.require('d3@5');
    // eslint-disable-next-line
    const chartData = modifiedChart(initialData, d3.select('.chartData'));
  }, [initialData]);

  return (
    <S.Wrapper>
      <div id="chartId" className="chartData" />
    </S.Wrapper>
  );
};

GraphContainer.propTypes = {
  initialData: object,
  stopChart: number
};

GraphContainer.defaultProps = {
  initialData: {},
  stopChart: 0
};

export default GraphContainer;
