import getModels from "../utils/getModels"

const files = require.context( '.', false, /\.ts$/ )


export default getModels( files )