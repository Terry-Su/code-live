import { notNil } from "./lodash"
export function getUrlSearchParams() {
  const url = new URL( location.href )
  if ( url && url.searchParams ) {
    let res = {}
    for ( const [ key, value ] of url.searchParams as any ) {
      res[ key ] = value
    }
    return res
  }
}
export function getUrlSearchParamsValue( key: string ) {
  const url = new URL( location.href )
  if ( url && url.searchParams ) {
    return url.searchParams.get( key )
  }
}

export function loadScript( src: string, callback?: any ) {
  const script = document.createElement( "script" )
  script.src = src
  script.onload = callback || function() {}
  document.head.appendChild( script )
}


export function emptyString( str: string ) {
  return notNil( str ) && str.trim() === ''
}