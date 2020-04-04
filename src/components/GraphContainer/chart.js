import * as d3 from 'd3';

export const renderChart = (data, graphDiv) => {
  console.log('puppi', data);

  const height = 400;
  const width = 400;
  const links = data.links.map((d) => Object.create(d));
  const nodes = data.nodes.map((d) => Object.create(d));

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      'link',
      d3.forceLink(links).id((d) => d.id)
    )
    .force('link', d3.forceLink(links).distance(100))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2));

  if (data === []) {
    simulation.alpha(0.5).restart();
  }

  const drag = (simulation) => {
    const dragstarted = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = (d) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };

    const dragended = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    return d3
      .drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  };

  const svg = graphDiv.append('svg').attr('viewBox', [0, 0, width, height]);

  const link = svg
    .append('g')
    .attr('stroke', '#999')
    .attr('strokeOpacity', 0.6)
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('strokeWidth', 500);

  const node = svg
    .append('g')
    .attr('stroke', '#fff')
    .attr('strokeWidth', 1.5)
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('r', 10)
    .attr('fill', function(d) {
      return color(d.group);
    })
    .call(drag(simulation));

  const texts = svg
    .selectAll('.texts')
    .data(nodes)
    .enter()
    .append('text')
    .attr('dx', 12)
    .attr('dy', '0.35em')
    .text(function(d) {
      return d.group;
    });

  simulation.on('tick', () => {
    link
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);

    node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

    texts
      .attr('x', function(d) {
        return d.x;
      })
      .attr('y', function(d) {
        return d.y;
      });
  });

  // invalidation.then(() => simulation.stop());
  return svg.node();
  // if (data === []) {
  //   return null;
  // } else {
  // }
};
