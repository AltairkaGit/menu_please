import { ReactNode, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

export const useBackButton = (leftButton: ReactNode) => {
  const { setLeftButton } : any = useOutletContext<ReactNode>()

  useEffect(() => {
    setLeftButton(leftButton)
  }, [setLeftButton, leftButton])
}