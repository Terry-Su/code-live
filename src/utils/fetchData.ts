import '../utils/fetch.js'

export function fetchText( url: string ) {
  return fetch( url ).then( function( response ) {
    try {
      return response.text()
    } catch ( e ) {
      return null
    }
  } )
}
