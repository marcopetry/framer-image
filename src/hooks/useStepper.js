import { useCallback, useState } from 'react'

export const useStepper = (maxFrames) => {
  const [step, setStep] = useState(0)

  const nextStep = useCallback(() => {
    if (step < maxFrames - 1) {
      setStep((oldFrame) => oldFrame + 1)
    }
  }, [setStep, step, maxFrames])

  const prevStep = useCallback(() => {
    if (step > 0) {
      setStep((oldFrame) => oldFrame - 1)
    }
  }, [setStep, step])

  const exactlyStep = useCallback(
    (stepParam) => {
      setStep(stepParam)
    },
    [setStep]
  )

  return [step, prevStep, nextStep, exactlyStep]
}
