export function getUrlSearchParamsValue( key: string ) {
  const url = new URL( location.href )
  if ( url && url.searchParams ) {
    return url.searchParams.get( key )
  }
}