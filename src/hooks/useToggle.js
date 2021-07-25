import { useCallback, useState } from 'react'

export const useToggle = (initialToggle = false) => {
  const [toggle, setToggle] = useState(initialToggle)

  const handleToggle = useCallback(() => {
    setToggle((oldtoggle) => !oldtoggle)
  }, [setToggle])

  return [toggle, handleToggle]
}
