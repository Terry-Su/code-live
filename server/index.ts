declare module NodeJS  {
  interface Global {
      __DEV__: any
  }
}

// Set `__DEV__` to true to indicate that current mode
// is development rather than production
global[ '__DEV__' ] = process.env.NODE_ENV === 'development' 

import runServer from './runServer'

runServer()
