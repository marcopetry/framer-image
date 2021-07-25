import { Box } from '@material-ui/core'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useStepper } from './hooks/useStepper'

import FastForwardIcon from '@material-ui/icons/FastForward'
import FastRewindIcon from '@material-ui/icons/FastRewind'
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import { LinearProgressWithLabel } from './components/LinearProgress'
import { Image } from './components/Image'
import { useToggle } from './hooks/useToggle'

export const Framer = ({ fps = 1, frames = [] }) => {
  const timerId = useRef(null)

  const [step, prevStep, nextStep, setExactlyStep] = useStepper(frames.length)
  const [paused, setPaused] = useToggle(false)

  const timer = useCallback(
    () =>
      (timerId.current = setInterval(() => {
        nextStep()
      }, 1000 / fps)),
    [nextStep, fps]
  )

  useEffect(() => {
    if (step >= frames.length - 1) {
      clearInterval(timerId.current)
      setPaused()
      return
    }
    // return () => clearInterval(timerId.current)
  }, [step, frames.length, setPaused])

  useEffect(() => {
    if (paused) {
      clearInterval(timerId.current)
    } else {
      timer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused])

  const ImagesLoaded = useMemo(() => frames.map((img) => <Image img={img} />), [frames])

  const labelProgress = useMemo(() => {
    const seconds = ((step + 1) % 60) / fps
    return `${Math.round((step + 1) / 60)}:${seconds < 10 ? `0${seconds}` : seconds}`
  }, [step, fps])

  const handleClickPart = useCallback(
    (frameInterval) => {
      setExactlyStep(frameInterval)
      setPaused()
    },
    [setExactlyStep, setPaused]
  )

  const handleNext = useCallback(() => {
    if (step >= frames.length - 1) {
      setExactlyStep(0)
    }
    setPaused()
  }, [step, setExactlyStep, setPaused, frames])

  return (
    <Box flexDirection="column">
      <Box width={640} height={480} border="1px solid">
        {ImagesLoaded[step]}
      </Box>
      <Box marginTop={5}>
        <LinearProgressWithLabel
          value={(100 / frames.length) * (step + 1)}
          label={labelProgress}
          zonaClickable={frames.length}
          onClick={handleClickPart}
        />
      </Box>

      <Box justifyContent="space-around" display="flex" marginTop={5}>
        <FastRewindIcon onClick={prevStep} />
        {paused || step >= frames.length - 1 ? (
          <PlayArrowIcon onClick={handleNext} />
        ) : (
          <PauseIcon onClick={() => setPaused()} />
        )}
        <FastForwardIcon onClick={nextStep} />
      </Box>
    </Box>
  )
}
