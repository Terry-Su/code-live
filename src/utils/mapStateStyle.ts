import { connect } from "dva"
import injectSheet from 'react-jss'


export default function mapStateStyle( styles: any = {}, stateFn: any = props => props ) {
  return component =>  connect( stateFn )( injectSheet( styles )( component ) )
}
