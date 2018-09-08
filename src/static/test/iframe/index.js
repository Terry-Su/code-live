fetchDraw(() => {
	// Start here
	const canvas = document.getElementById('myCanvas')
	const draw = new window.Draw(canvas)


	draw.addElement("line", {
		source: {
			x: 30,
			y: 15
		},
		target: {
			x: 230,
			y: 15
		},
		showSegments: true
	})

	draw.addElement('polyline', {
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
			},
		],
		showSegments: true
	})
	
	draw.render()
})

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// Ignore following util
	function fetchDraw(callback){loadScript("https://drawjs.github.io/CDN/iframes/drawExamples/common.js",() => loadDraw( callback ));};function loadScript(src,callback){const script=document.createElement("script");script.src=src;script.onload=callback||function(){};document.head.appendChild(script);}
	
