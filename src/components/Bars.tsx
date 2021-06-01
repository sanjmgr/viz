import { GradientTealBlue } from '@visx/gradient'
import { Group } from '@visx/group'
import letterFrequency, {
  LetterFrequency,
} from '@visx/mock-data/lib/mocks/letterFrequency'
import { scaleBand, scaleLinear } from '@visx/scale'
import { Bar } from '@visx/shape'
import React, { useMemo } from 'react'

const data = letterFrequency
const top = 120

// accessors
const letters = (d: LetterFrequency) => d.letter
const frequency = (d: LetterFrequency) => Number(d.frequency) * 100

type BarsProps = {
  width: number
  height: number
  evt?: boolean
}
export const Bars = ({ width, height, evt = false }: BarsProps) => {
  const WIDTH = width
  const HEIGHT = height - top

  // Scale, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, WIDTH],
        round: true,
        domain: data.map(letters),
        padding: 0.4,
      }),
    [WIDTH]
  )

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [HEIGHT, 0],
        domain: [0, Math.max(...data.map(frequency))],
        round: true,
      }),
    [HEIGHT]
  )

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <GradientTealBlue id='teal' />
      <rect width={width} height={height} fill='url(#teal)' rx='10' />
      <Group top={top * 0.5}>
        {data.map(d => {
          const letter = letters(d)
          const barWidth = xScale.bandwidth()
          const barHeight = HEIGHT - (yScale(frequency(d)) ?? 0)
          const barX = xScale(letter)
          const barY = HEIGHT - barHeight

          return (
            <Bar
              key={`bar-${letter}`}
              x={barX}
              y={barY}
              height={barHeight}
              width={barWidth}
              fill='rgba(23, 233, 217, .5)'
              onClick={() => {
                if (evt) alert(`clicked: ${JSON.stringify(Object.values(d))}`)
              }}
            />
          )
        })}
      </Group>
    </svg>
  )
}
