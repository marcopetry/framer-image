import React, { useCallback, useEffect, useRef } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

export const LinearProgressWithLabel = ({ label, onClick, zonaClickable, ...props }) => {
  const linearRef = useRef()

  const handleClick = useCallback(
    (clickX) => {
      const zoneClicked = clickX - linearRef.current.offsetLeft
      const intervalZone = linearRef.current.offsetWidth / zonaClickable
      const intervalClicked = Math.floor(zoneClicked / intervalZone)
      if (onClick) {
        onClick(intervalClicked)
      }
    },
    [onClick, linearRef, zonaClickable]
  )

  useEffect(() => {
    console.log({ linearRef })
  }, [])

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box width="100%" mr={1}>
        <LinearProgress
          variant="determinate"
          ref={linearRef}
          {...props}
          onClickCapture={(event) => handleClick(event.clientX)}
        />
      </Box>
      <Box minWidth={50}>
        <Typography variant="body2" color="textSecondary">{`${label}`}</Typography>
      </Box>
    </Box>
  )
}
