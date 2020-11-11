// Made with Zdog modified from https://codepen.io/desandro/pen/RerqWW

var illoElem = document.querySelector('.illo');
var illoSize = 128;
var minWindowSize = Math.min( window.innerWidth - 20, (window.innerHeight - 60) );
var zoom = 5;
illoElem.setAttribute( 'width', illoSize * zoom );
illoElem.setAttribute( 'height', illoSize * zoom );

var isSpinning = true;
var TAU = Zdog.TAU;
var sceneStartRotation = { y: -TAU/8 };

var illo = new Zdog.Illustration({
  element: illoElem,
  zoom: zoom,
  rotate: sceneStartRotation,
  dragRotate: true,
  onDragStart: function() {
    isSpinning = false;
  },
});

var quarterTurn = Math.sin( TAU/8 );

// ----- colors ----- //

var beigeDark = '#F96';
var beigeLight = '#FC9';
var skinDark = '#F66';
var skinMedium = '#F88';
var skinLight = '#F2C6A0';
var navy = '#036';
var midnight = '#003';
var auburn = '#903';
var red = '#C33';
var sky = '#09D';
var offWhite = '#FFD';
var white = 'white';
var blueDark = '#66C';
var bluePale = '#CCF';
var darkBrown = "#0D0000"
var darkGreen = "#025920"
var black = "#000000"
var purple = "#38024D"
var grey = "#3C4E59"
var teal = "#022840"
var turquoise = "#0E7373"
var lightOrange = "#0E7373"
var yellow = "#FEAD34"

// -- models --- //

var ground = new Zdog.Anchor({
  addTo: illo,
  translate: { y: 56 },
});


// lady
( function() {

  var lady = new Zdog.Anchor({
    addTo: ground,
    translate: { x : 24, z: 12 },
  });

  var hips = new Zdog.Shape({
    addTo: lady,
    translate: { y: -38 },
    stroke: 15,
    color: grey,
  });

  var torsoAnchor = new Zdog.Anchor({
    addTo: hips,
    rotate: { x: -TAU/8 },
  });

  var torso = new Zdog.Rect({
    width: 1,
    height: 5,
    addTo: torsoAnchor,
    translate: { y: -9 },
    stroke: 8,
    color: yellow,
  });

  // ----- lady head ----- //

  var neck = new Zdog.Shape({
    path: [ {}, { y: -2 }],
    addTo: torso,
    translate: { y: -7 },
    stroke: 4,
    color: skinLight,
  });


  var head = new Zdog.Anchor({
    addTo: neck,
    translate: { y: -6 },
    rotate: { x: TAU/8 },
  });

  // hair cap
  new Zdog.Hemisphere({
    addTo: head,
    diameter: 11,
    color: darkBrown,
    stroke: 1.5,
    translate: { y: -1 },
    rotate: { x: TAU/8 * 3, y: 0 },
  });
  // face
  new Zdog.Hemisphere({
    addTo: head,
    diameter: 9,
    color: skinLight,
    backface: darkBrown,
    stroke: 0.5,
    translate: { y: -0.95 },
    rotate: { x: TAU/8 * 3, y: TAU/2 },
  });
  // smile
  new Zdog.Ellipse({
    addTo: head,
    diameter: 3,
    quarters: 1,
    translate: { y: 0.5, z: 4 },
    rotate: { z: TAU * 3/8 },
    color: skinDark,
    closed: false,
    stroke: 0.5,
  });

  // hair locks
  new Zdog.RoundedRect({
    width: 6,
    height: 20,
    cornerRadius: 3,
    addTo: head,
    translate: { y: 5, x: 4.5, z: -2 },
    rotate: { y: TAU/4 },
    fill: true,
    color: darkBrown,
    stroke: 2,
  });


  // glasses
  var glasses = new Zdog.Group({
    addTo: head,
    translate: { y: -1, z: 5 },
  });

  var lens = new Zdog.Ellipse({
    diameter: 4,
    addTo: glasses,
    translate: { x: -2.5 },
    stroke: false,
    fill: false,
  });
  lens.copy({
    translate: { x: 2.5 },
  });

  var glassesRim = lens.copy({
    stroke: 1,
    fill: false,
    color: purple,
  });
  glassesRim.copy({
    translate: { x: 2.5 },
  });



  // ----- lady arms ----- //

  var leftWrist = { z: 14, y: -14 };

  var leftArm = new Zdog.Shape({
    path: [
      { z: -0, y: 0 },
      { z: 12, y: -2 }, // elbow
      leftWrist,
      // hack for z-sort probs
      { move: { x: 16, z: -16 } },
    ],
    addTo: torso,
    translate: { x: 5, y: -3 },
    closed: false,
    color: yellow,
    stroke: 4,
  });

  // leftHand
  var leftHand = new Zdog.Shape({
    path: [ { x: -1, z: -0.5 } ],
    addTo: leftArm,
    translate: leftWrist,
    color: skinLight,
    stroke: 6,
  });

  var phoneAnchor = new Zdog.Anchor({
    addTo: leftHand,
    translate: { x: -2, y: -0, z: -4 },
    rotate: { x: TAU/8 },
  });

  var phoneBack = new Zdog.Group({
    addTo: phoneAnchor,
  });
  var phoneFront = new Zdog.Group({
    addTo: phoneAnchor,
    translate: { z: -0.5 },
  });
  // back phone panel
  var phonePanel = new Zdog.RoundedRect({
    width: 4,
    height: 8,
    cornerRadius: 1,
    addTo: phoneBack,
    stroke: 0.5,
    color: bluePale,
    fill: true,
  });
  // phone logo dot
  new Zdog.Ellipse({
    diameter: 1.25,
    addTo: phoneBack,
    translate: { y: -1 },
    fill: true,
    stroke: false,
    color: sky,
  });
  // phone camera dot
  new Zdog.Shape({
    addTo: phoneBack,
    translate: { x: -1, y: -3 },
    color: midnight,
    stroke: 0.5,
  });

  // z-sort hack
  new Zdog.Shape({
    path: [ { z: 16 } ],
    addTo: phoneBack,
    visible: false,
  });

  // phone front
  phonePanel.copy({
    addTo: phoneFront,
    color: midnight,
  });

  var rightWrist = { y: 24 };

  var rightArm = leftArm.copy({
    path: [
      { y: 0 },
      rightWrist,
    ],
    translate: { x: -4, y: -3 },
    rotate: { z: TAU/16, x: TAU/32 },
    color: yellow,
  });

  var rightHandPosition = new Zdog.Vector( rightWrist ).add({ x: -0.5, z: -1 });

  var rightHand = leftHand.copy({
    path: [{}],
    addTo: rightArm,
    translate: rightHandPosition,
    color: skinLight,
  });

  var suitCase = new Zdog.Anchor({
    addTo: rightHand,
    translate: { y: 12 },
    rotate: { y: TAU/4 }
  });

  var suitCaseFrontPanel = new Zdog.RoundedRect({
    addTo: suitCase,
    width: 24,
    height: 14,
    cornerRadius: 2,
    translate: { z: 3 },
    color: darkGreen,
    fill: true,
  });
  suitCaseFrontPanel.copy({
    translate: { z: -3 },
    color: darkGreen,
  });

  var suitCaseTopPanel = new Zdog.Rect({
    addTo: suitCase,
    width: 20,
    height: 5,
    translate: { y: -7 },
    rotate: { x: TAU/4 },
    stroke: 0.5,
    fill: true,
    color: darkGreen,
  });
  suitCaseTopPanel.copy({
    translate: { y: 7 },
  });
  var suitCaseSidePanel = suitCaseTopPanel.copy({
    width: 5,
    height: 10,
    translate: { x: 12 },
    rotate: { y: TAU/4 },
  });
  suitCaseSidePanel.copy({
    translate: { x: -12 },
  });
  // suit case filler
  new Zdog.Rect({
    addTo: suitCase,
    width: 20,
    height: 10,
    stroke: 4,
    color: darkGreen,
  });
  // suit case handle
  var suitCaseHandle = new Zdog.Shape({
    addTo: suitCase,
    path: [
      {},
      { arc: [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
      ]},
      { x: 1, y: 3 },
    ],
    translate: { x: 3, y: -11 },
    stroke: 1.5,
    color: midnight,
    closed: false,
  });
  suitCaseHandle.copy({
    scale: { x: -1 },
    translate: { x: -3, y: -11 },
  });

  // ---- leg ---- //

  // left leg
  var leftAnkle = { y: 28 };
  var leftLeg = new Zdog.Shape({
    addTo: hips,
    path: [ { y: 0 }, leftAnkle ],
    translate: { x: 3.5, y: 4, z: 0 },
    stroke: 7,
    rotate: { x: -TAU/8 },
    color: grey,
  });

  // right thigh
  var rightKnee = { y: 16 };
  var rightThigh = new Zdog.Shape({
    addTo: hips,
    path: [ { y: 0 }, rightKnee ],
    translate: { x: -3.5, y: 4, z: 0 },
    stroke: 7,
    rotate: { x: TAU/8 },
    color: grey,
  });
  // rightShin
  var rightAnkle = { y: 10 };
  var rightShin = new Zdog.Shape({
    addTo: rightThigh,
    path: [ { y: 0 }, rightAnkle ],
    translate: rightKnee,
    stroke: 7,
    rotate: { x: -TAU/8 },
    color: grey,
  });

  // lady feet
  var rightFoot = new Zdog.Shape({
    addTo: rightShin,
    path: [ { y: 2 }, { y: 8 } ],
    translate: rightAnkle,
    stroke: 4,
    color: skinLight,
  });
  // heel
  new Zdog.Shape({
    addTo: rightFoot,
    path: [ { x: -1 }, { x: 1 } ],
    translate: { y: 5, z: -3 },
    stroke: 4,
    color: black,
  });
  // sole edge
  var soleEdge = new Zdog.Shape({
    addTo: rightFoot,
    path: [
      { x: -2, z: -2 },
      { arc: [
        { x: -2, z: -2, y: 5 },
        { x: 0, z: 2, y: 5 }
      ]},
    ],
    translate: { y: 6 },
    stroke: 2,
    fill: false,
    closed: false,
    color: black,
  });
  soleEdge.copy({
    scale: { x: -1 },
  });

  // heel spike
  new Zdog.Shape({
    addTo: rightFoot,
    path: [ {}, { y: 5 } ],
    translate: { y: 6, z: -4 },
    stroke: 2,
    color: black,
  });
  rightFoot.copyGraph({
    addTo: leftLeg,
    translate: leftAnkle,
    color: skinMedium,
  });

})();


// ----- animate ----- //

var ticker = 0;
var cycleCount = 240;

function animate() {
  // update
  if ( isSpinning ) {
    var progress = ticker / cycleCount;
    var theta = Zdog.easeInOut( progress % 1 ) * TAU;
    illo.rotate.y = -theta + sceneStartRotation.y;
    ticker++;
  }

  illo.updateRenderGraph();
  requestAnimationFrame( animate );
}

animate();


