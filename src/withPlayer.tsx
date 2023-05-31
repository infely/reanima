import { useFrameProps } from './index.js'
import React, { useEffect, useRef, useState } from 'react'

export default function withPlayer<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    const tick = useRef<number | undefined>(undefined)
    const [value, setValue] = useState(0)
    const [isPlaying, setPlaying] = useState(false)

    const useFrame = ({ durationInFrames }: useFrameProps) => {
      durationInFrames ??= 60
      if (tick.current === undefined) tick.current = 100 / durationInFrames
      const frame = Math.round((value / 100) * durationInFrames)
      return frame
    }

    useEffect(() => {
      if (!isPlaying) return
      if (value >= 100) {
        setPlaying(false)
        return
      }

      requestAnimationFrame(() => {
        setValue(v => v + (tick?.current ?? 1))
      })
    }, [isPlaying, value])

    const toggle = () => {
      if (!isPlaying && value >= 100) setValue(0)
      setPlaying(v => !v)
    }

    const onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      if (isPlaying) setPlaying(false)
      setValue(parseInt(value))
    }

    return (
      <>
        <Component {...props} useFrame={useFrame} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            width: 128,
            height: 20,
            padding: 4,
            paddingLeft: 8,
            paddingRight: 8,
            borderRadius: 8
          }}
        >
          <svg viewBox="0 0 32 32" style={{ width: 16, height: 16, cursor: 'pointer' }} onClick={toggle}>
            {!isPlaying && <path d="M0 0 L32 16 L0 32 Z" />}
            {isPlaying && (
              <>
                <path d="M0 0 L12 0 L12 32 L0 32 Z" />
                <path d="M20 0 L32 0 L32 32 L20 32 Z" />
              </>
            )}
          </svg>
          <input type="range" onChange={onChange} value={value} style={{ width: 104 }} />
        </div>
      </>
    )
  }
}
