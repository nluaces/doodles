// tutorial.js

// rotating flag variable
let isSpinning = true;

// create illo
let illo = new Zdog.Illustration({
  // set canvas with selector
  element: '.zdog-canvas',
  zoom: 3,
  dragRotate: true,
  // stop rotation when dragging starts
    onDragStart: function() {
      isSpinning = false;
    },
});

// add circle
new Zdog.Ellipse({
  addTo: illo,
  diameter: 80,
  stroke: 20,
  color: '#636',
});

// square
new Zdog.Rect({
  addTo: illo,
  width: 80,
  height: 80,
  // position further back
  translate: { z: -40 },
  stroke: 12,
  color: '#E62',
  fill: true,
});

// update & render
illo.updateRenderGraph();

function animate() {
  // rotate
  if ( isSpinning ) {
    illo.rotate.y += 0.02;
  }
  illo.updateRenderGraph();
  requestAnimationFrame( animate );
}
animate();
