# reanima

Animate react components with debug player that can rewind

1. Create animated component like:

```jsx
const Counter = () => {
  const frame = useFrame()
  const color = interpolateColors(frame, [0, 60], ['white', 'red'])

  return <div style={{ color }}>{frame}</div>
}
```

2. Wrap you component with debug player like:

```jsx
const counter = withPlayer(({ useFrame }) => {
  ...
})
```

3. Debug

<div align="center">
  <img width="256" src="media/demo.gif"><br>
  <br />
</div>

4. Remove `withPlayer` wrapper and you ready to deploy. **Profit!**
