import { ParentSize } from '@visx/responsive'
import React from 'react'
import { Bars, GradientCard } from './components'
import './style.css'

const App = () => {
  return (
    <div className='app'>
      <h3>React + D3js makes it easy to visualize complex data</h3>
      <ParentSize parentSizeStyles={{ width: '70vw', height: '55vh' }}>
        {({ width, height }) => (
          <>
            <Bars width={width} height={height} evt />
            <GradientCard width={width} height={height} />
          </>
        )}
      </ParentSize>
    </div>
  )
}
export default App
