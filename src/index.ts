import { useEffect, useState } from 'react'

export { interpolate } from './lib/interpolate.js'
export { interpolateColors } from './lib/interpolateColors.js'
export { Easing } from './lib/easing.js'

export interface useFrameProps {
  durationInFrames?: number
}

export const useFrame = ({ durationInFrames }: useFrameProps = {}) => {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    if (durationInFrames !== undefined && frame >= durationInFrames) return

    requestAnimationFrame(() => {
      setFrame(frame => frame + 1)
    })
  }, [frame])

  return frame
}
