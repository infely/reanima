import { Easing, interpolate, interpolateColors, useFrame } from '..'
import withPlayer from '../withPlayer'

// const Logo = (() => {                         // prod: uncomment this line
const Logo = withPlayer(({ useFrame }: any) => { // prod: comment this line
  const durationInFrames = 300
  const frame = useFrame({ durationInFrames })

  const c0 = interpolateColors(frame, [0, durationInFrames], ['#00d8ff', '#00d8ff80'])
  const c1 = interpolateColors(frame, [0, durationInFrames], ['white', '#00d8ff40'])
  const c2 = interpolateColors(frame, [0, durationInFrames], ['#fff', '#00d8ff60'])
  const c3 = interpolateColors(frame, [0, durationInFrames], ['#ffffff', '#00d8ff80'])
  const options = { easing: Easing.elastic(1.5) }
  const d1 = interpolate(frame, [0, durationInFrames], [0, 240], options)
  const d2 = interpolate(frame, [0, durationInFrames], [0, -240], options)
  const d3 = interpolate(frame, [0, durationInFrames], [0, 360], options)
  const opacity = interpolate(frame, [0, durationInFrames], [0, 1])

  return (
    <>
      <svg
        viewBox="0 0 36 36"
        fill="none"
        style={{ width: 128, height: 128, transform: 'rotate(90deg)', transformOrigin: 'center' }}
      >
        <circle cx={18} cy={18} r={3} fill={c0} />
        {[
          [c1, d1],
          [c2, d2],
          [c3, d3]
        ].map(([color, deg]: any, key) => (
          <ellipse
            key={key}
            cx={18}
            cy={18}
            rx={6}
            ry={17}
            strokeWidth={2}
            stroke={color}
            style={{ transform: `rotate(${deg}deg)`, transformOrigin: 'center' }}
          />
        ))}
      </svg>
      <div style={{ opacity }}>reanima</div>
    </>
  )
})

export default function App() {
  return <Logo />
}
