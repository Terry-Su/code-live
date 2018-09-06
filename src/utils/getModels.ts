export default function( files ): any {
  const models = {}
  files.keys().forEach( key => {
    if ( key === "./index.ts" ) return
    models[ key.replace( /(\.\/|\.ts)/g, "" ) ] = files( key ).default
  } )
  return models
}
