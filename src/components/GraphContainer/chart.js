import * as d3 from 'd3';

export const modifiedChart = (initialData, graphDiv) => {
  const height = 400;
  const width = 400;
  const svg = graphDiv.append('svg').attr('viewBox', [0, 0, width, height]);
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const nodes = [];
  const links = [];

  var simulation = d3
    .forceSimulation(nodes)
    .force('charge', d3.forceManyBody())
    // .force('charge', d3.forceManyBody().strength(50))
    .force('link', d3.forceLink(links).distance(150))
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
    // push first node
    // create invisible link for first node
    if (nodes.length === 0 && initialData.secondResponse !== undefined) {
      nodes.push(initialData.seed[0]);
      links.push({
        source: nodes[0],
        target: nodes[0]
      });
    }
    restart();
  }, 1000);

  d3.timeout(function() {
    // push first response nodes
    // push first response links (nodes[0] -> first response nodes)
    if (initialData.firstResponse !== undefined) {
      {
        initialData.firstResponse.map((venue) => {
          nodes.push(venue);
          links.push({
            source: nodes[0],
            target: venue
          });
        });
      }
    }
    restart();
  }, 3000);

  d3.timeout(function() {
    // push second response nodes
    // push second response links (first response nodes [i] -> second response nodes)
    if (initialData.secondResponse !== undefined) {
      {
        initialData.secondResponse.map((group, index) => {
          for (var i = 0; i < group.length; i++) {
            nodes.push(group[i]);
          }
          group.map((venue) => {
            links.push({
              source: initialData.firstResponse[index],
              target: venue
            });
          });
        });
      }
    }
    restart();
  }, 5000);

  // d3.timeout(function() {
  // 	// push all initialData.nodes into nodes array
  // 	// push initialData.firstResponse links into links array
  // 	if (nodes.length === 0 && initialData.secondResponse !== undefined) {
  // 		nodes.push(initialData.seed[0]);
  // 		{
  // 			initialData.firstResponse.map((venue) => {
  // 				nodes.push(venue);
  // 				links.push({
  // 					source: initialData.seed[0],
  // 					target: venue
  // 				});
  // 			});
  // 		}
  // 		{
  // 			initialData.secondResponse.map((group, index) => {
  // 				for (var i = 0; i < group.length; i++) {
  // 					nodes.push(group[i]);
  // 				}
  // 				group.map((venue) => {
  // 					links.push({
  // 						source: initialData.firstResponse[index],
  // 						target: venue
  // 					});
  // 				});
  // 			});
  // 		}
  // 	}
  // 	restart();
  // }, 1000);

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
    // console.log('simulation nodes', nodes);
    // console.log('simulation links', links);
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
