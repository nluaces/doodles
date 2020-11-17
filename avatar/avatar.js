// rotating flag variable
let isSpinning = true;

const skin = "#F5D6C0"
// create illo
let illo = new Zdog.Illustration({
  // set canvas with selector
  element: '.zdog-canvas',
  zoom: 10,
  dragRotate: true,
});


// add circle
let head = new Zdog.Shape({
  addTo: illo,
  stroke: 12,
  color: skin,
});

let eyebrow = new Zdog.Ellipse({
  addTo: head,
  diameter: 2,
  quarters: 2, // semi-circle
  translate: { x: -3, y: -1, z: 4.5 },
  // rotate semi-circle to point up
  rotate: { z: -Zdog.TAU/4 },
  color: 'black',
  stroke: 0.5,
  // hide when front-side is facing back
  backface: false,
});

eyebrow.copy({
  translate: { x: 3, y: -1, z: 4.5 },
});

// render shapes in order added
var eyeGroup = new Zdog.Group({
  addTo: head,
  translate: { x: -3, y: 1, z: 4.5 },
  backface: false,
});
// eye white first
new Zdog.RoundedRect({
  addTo: eyeGroup,
  width: 4,
  height: 3,
  color: 'white',
  stroke: 0.25,
  fill: true,
});
// then iris
let iris = new Zdog.Ellipse({
  addTo: eyeGroup,
  diameter: 1,
  color: 'black'
});

var rightEyeGroup = new Zdog.Group({
  addTo: head,
  translate: { x: 3, y: 1, z: 4.5 },
  backface: false,
});
// eye white first
new Zdog.RoundedRect({
  addTo: rightEyeGroup,
  width: 4,
  height: 3,
  color: 'white',
  stroke: 0.25,
  fill: true,
});
// then iris
new Zdog.Ellipse({
  addTo: rightEyeGroup,
  diameter: 1,
  color: 'black'
});

new Zdog.Ellipse({
  addTo: head,
  diameter: 3,
  quarters: 2,
  translate: { y: 3, z: 4.5 },
  rotate: { z: Zdog.TAU/4 },
  closed: true,
  color: 'pink',
  stroke: 0.5,
  fill: true,
  backface: false,
});

  // hair cap
  new Zdog.Hemisphere({
    addTo: head,
    diameter: 13,
    color: "#0D0000",
    stroke: 1.5,
    translate: { y: -1 },
    rotate: { x: Zdog.TAU/8 * 3, y: 0 },
  });

  // hair locks
  new Zdog.RoundedRect({
    width: 2,
    height: 20,
    cornerRadius: 5,
    addTo: head,
    translate: { y: 6, x: -0.25, z: -8 },
    rotate: { y: Zdog.TAU/2 },
    fill: true,
    color: "#0D0000",
    stroke: 2,
  });



function animate() {
  // rotate
  if ( isSpinning ) {
    illo.rotate.y += 0.02;
  }
  illo.updateRenderGraph();
  requestAnimationFrame( animate );
}
animate();