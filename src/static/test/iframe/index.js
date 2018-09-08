// console.log( 2, document.body )

const canvas = document.getElementById( 'myCanvas' )
const draw = new window.Draw( canvas )

draw.addElement( "line", {
	source: {
		x: 0,
		y: 0
	},
	target: {
		x: 100,
		y: 100
	},
	showSegments: true
} )

draw.render()