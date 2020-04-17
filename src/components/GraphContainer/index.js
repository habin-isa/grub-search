import React, { useEffect, createRef } from 'react';
import * as S from './styles';
import { modifiedChart } from './chart';
import * as d3 from 'd3';
import * as d3Require from 'd3-require';
import { object } from 'prop-types';

const GraphContainer = ({ initialData }) => {
  const chartInput = createRef();

  useEffect(
    () => {
      const myNode = document.getElementById('chartId');
      myNode.innerHTML = '';
      d3Require.require('d3@5');

      const chartData = modifiedChart(initialData, d3.select('.chartData'));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialData]
  );

  return (
    <S.Wrapper>
      <div id="chartId" className="chartData" />
    </S.Wrapper>
  );
};

GraphContainer.propTypes = {
  initialData: object
};

GraphContainer.defaultProps = {
  initialData: {}
};

export default GraphContainer;
