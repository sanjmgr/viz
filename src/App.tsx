import { ParentSize } from '@visx/responsive'
import React from 'react'
import { GradientCard } from './components'
import './style.css'

const App = () => {
  return (
    <div className='app'>
      <h3>React + D3js makes it easy to visualize complex data</h3>
      <ParentSize parentSizeStyles={{ width: '70vw', height: '60vh' }}>
        {({ width, height }) => <GradientCard width={width} height={height} />}
      </ParentSize>
    </div>
  )
}
export default App
