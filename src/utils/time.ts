/**
 * Format: year-month-day hour:minute:second
 */
export function getFormattedDateString( theDate ) {
    try {
      // console.log( 'theDate', theDate )
      const year = theDate.getFullYear()
      const month = theDate.getMonth() + 1
      const date = theDate.getDate()
      const hour = theDate.getHours()
      const minute = theDate.getMinutes()
      const second = theDate.getSeconds()
  
      return `${ getTwoNumberString( year ) }-${ getTwoNumberString( month ) }-${ getTwoNumberString( date ) }--${ getTwoNumberString( hour ) }-${ getTwoNumberString( minute ) }-${ getTwoNumberString( second ) }`
    } catch ( e ) {
      console.log( e )
      return ''
    }
  
    function getTwoNumberString( number ) {
      return number >= 10 ? `${number}` : `0${number}` 
    }
  }
  