const canvas = document.getElementById( "myCanvas" )
const draw = new window.Draw( canvas )

draw.addElement( "line", {
  source: {
    x: 30,
    y: 15
  },
  target: {
    x: 230,
    y: 15
  },
  showSegments: true
} )

draw.addElement( "polyline", {
  points: [
    {
      x: 30,
      y: 50
    },
    {
      x: 80,
      y: 230
    },
    {
      x: 130,
      y: 50
    },
    {
      x: 180,
      y: 230
    },
    {
      x: 230,
      y: 50
    }
  ],
  showSegments: true
} )

draw.render()