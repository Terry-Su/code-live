const browserSync = require( 'browser-sync' )
const path = require( 'path' )

const bs = browserSync.create()
const serverPath = path.resolve( __dirname, 'new' )

const serverconfig = {
	server: {
		baseDir  : serverPath,
		directory: true,
	},
	files: [
		// `${serverPath}/src/**`,
		`${serverPath}/**`,
	],
	port: 9000,
	open: false,
}


function init() {
	try {
		bs.init( serverconfig )
	} catch( e ) {
		init()
	}
}

init()


