import * as d3 from 'd3';

export const modifiedChart = (sortedData, data, newVenuesLength, graphDiv) => {
  const height = 400;
  const width = 400;
  const svg = graphDiv.append('svg').attr('viewBox', [0, 0, width, height]);
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const nodes = [];
  const links = [];

  console.log('puppi 1', data);
  console.log('newVenuesLength', newVenuesLength);
  console.log('sortedData in chart', sortedData);

  var simulation = d3
    .forceSimulation(nodes)
    // .force('charge', d3.forceManyBody())
    // .force('charge', d3.forceManyBody().strength(50))
    .force('link', d3.forceLink(links).distance(50))
    // .force('x', d3.forceX())
    // .force('y', d3.forceY())
    .alphaTarget(1)
    .on('tick', ticked);

  var g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')'),
    link = g
      .append('g')
      .attr('stroke', '#000')
      .attr('stroke-width', 1.5)
      .selectAll('.link'),
    node = g
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('.node');

  restart();

  d3.timeout(function() {
    if (nodes.length === 0) {
      nodes.push(data.nodes[0]);
      links.push({ source: data.nodes[0], target: data.nodes[0] });
      restart();
    }
  }, 1000);

  // pushes each new node from data.nodes
  // pushes each new link from data.links
  d3.interval(
    function() {
      const marker = data.nodes.length - newVenuesLength;
      if (nodes.length !== data.nodes.length) {
        for (var i = 0; i < data.nodes.length; i++) {
          nodes.push(data.nodes[i]);
          if (i < marker) {
            links.push({ source: data.nodes[0], target: data.nodes[i] });
          } else {
            links.push({ source: data.nodes[1], target: data.nodes[i] });
          }
        }
      }
      restart();
    },
    3000,
    d3.now()
  );

  function restart() {
    // Apply the general update pattern to the nodes.
    node = node.data(nodes, function(d) {
      return d.id;
    });

    node
      .exit()
      .transition()
      .attr('r', 0)
      .remove();

    node = node
      .enter()
      .append('circle')
      .attr('fill', function(d) {
        return color(d.id);
      })
      .call(function(node) {
        node.transition().attr('r', 8);
      })
      .merge(node);

    // Apply the general update pattern to the links.
    link = link.data(links, function(d) {
      return d.source.id + '-' + d.target.id;
    });

    // Keep the exiting links connected to the moving remaining nodes.
    link
      .exit()
      .transition()
      .attr('stroke-opacity', 0)
      .attrTween('x1', function(d) {
        return function() {
          return d.source.x;
        };
      })
      .attrTween('x2', function(d) {
        return function() {
          return d.target.x;
        };
      })
      .attrTween('y1', function(d) {
        return function() {
          return d.source.y;
        };
      })
      .attrTween('y2', function(d) {
        return function() {
          return d.target.y;
        };
      })
      .remove();

    link = link
      .enter()
      .append('line')
      .call(function(link) {
        link.transition().attr('stroke-opacity', 1);
      })
      .merge(link);

    // Update and restart the simulation.
    simulation.nodes(nodes);
    simulation.force('link').links(links);
    simulation.alpha(1).restart();
  }

  function ticked() {
    node
      .attr('cx', function(d) {
        return d.x;
      })
      .attr('cy', function(d) {
        return d.y;
      });

    link
      .attr('x1', function(d) {
        return d.source.x;
      })
      .attr('y1', function(d) {
        return d.source.y;
      })
      .attr('x2', function(d) {
        return d.target.x;
      })
      .attr('y2', function(d) {
        return d.target.y;
      });
    simulation.stop();

    // texts
    // 	.attr('x', function(d) {
    // 		return d.x;
    // 	})
    // 	.attr('y', function(d) {
    // 		return d.y;
    // 	});
  }
  // console.log('puppi nodes', nodes);
  // console.log('puppi links', links);
  return svg.node();
};
