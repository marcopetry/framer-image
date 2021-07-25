import React from 'react'

import Box from '@material-ui/core/Box'

import { imagesUrls } from './images'
import { Framer } from './Framer'

function App() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" width={1} height={1} position="absolute">
      <Framer fps={0.2} frames={imagesUrls} />
    </Box>
  )
}

export default App
