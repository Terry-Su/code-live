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