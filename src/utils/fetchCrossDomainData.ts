import { loadScript } from "./js"

export default function( url, callbackName ): any {
  return new Promise( ( resolve, reject ) => {
    try {
      loadScript( url, () => {
        const data = ( window as any )[ callbackName ]()
        resolve( data )
      } )
    } catch ( e ) {
      reject( e )
    }
  } )
}