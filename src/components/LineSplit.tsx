import { curveCardinal } from '@visx/curve'
import { LinearGradient } from '@visx/gradient'
import { scaleLinear } from '@visx/scale'
import { LinePath, SplitLinePath } from '@visx/shape'
import { useMemo } from 'react'
import { generateSinePoints } from '../utils'

type LineSplitProps = {
  width: number
  height: number
  margin?: { top: number; right: number; bottom: number; left: number }
  numberOfWaves?: number
  pointsPerWave?: number
  numberOfSegments?: number
}

type Point = { x: number; y: number }
const getX = (d: Point) => d.x
const getY = (d: Point) => d.y

const background = '#351CAB'
const backgroundLight = '#621A61'
const foreground = '#b7e6a5'

export const LineSplit = ({
  width,
  height,
  numberOfWaves = 10,
  pointsPerWave = 100,
  numberOfSegments = 8,
}: LineSplitProps) => {
  const data: Point[] = useMemo(
    () =>
      generateSinePoints({
        width,
        height,
        numberOfWaves,
        pointsPerWave,
      }),
    [width, height, numberOfWaves, pointsPerWave]
  )

  const dividedData = useMemo(() => {
    const segmentLength = Math.floor(data.length / numberOfSegments)
    return new Array(numberOfSegments)
      .fill(null)
      .map((_, i) => data.slice(i * segmentLength, (i + 1) * segmentLength))
  }, [numberOfSegments, data])

  const getScaledX = useMemo(() => {
    const xScale = scaleLinear({ range: [0, width], domain: [0, width] })
    return (d: Point) => xScale(getX(d)) ?? 0
  }, [width])

  const getScaledY = useMemo(() => {
    const yScale = scaleLinear({ range: [0, height], domain: [height, 0] })
    return (d: Point) => yScale(getY(d)) ?? 0
  }, [height])

  return width < 10 ? null : (
    <svg height={height} width={width}>
      <LinearGradient
        id='linear'
        from={background}
        to={backgroundLight}
        rotate='-45'
      />
      <rect
        x='0'
        y='0'
        width={width}
        height={height}
        fill='url(#linear)'
        rx='10'
      />

      <g transform={`translate(${0}, ${-height * 0.5})`}>
        <LinePath
          data={data}
          x={getScaledX}
          y={getScaledY}
          stroke='#FFF'
          strokeWidth={8}
          strokeOpacity={0.15}
          curve={curveCardinal}
        />
        <SplitLinePath
          segments={dividedData}
          x={getScaledX}
          y={getScaledY}
          curve={curveCardinal}
          styles={[
            { stroke: foreground, strokeWidth: 3 },
            { stroke: '#fff', strokeWidth: 2, strokeDasharray: '9, 5' },
            { stroke: '#6078EA', strokeWidth: 2 },
          ]}
        >
          {({ index, segment, styles }) =>
            /** overlay circles to a couple of the segments */
            index === numberOfSegments - 1 || index === 2 ? (
              segment.map(({ x, y }, i) =>
                i % 8 === 0 ? (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={10 * (i / segment.length)}
                    stroke={styles?.stroke}
                    fill='transparent'
                    strokeWidth={1}
                  />
                ) : null
              )
            ) : (
              <LinePath
                key={`line-${index}`}
                data={segment}
                x={(d: Point) => d.x || 0}
                y={(d: Point) => d.y || 0}
                {...styles}
              />
            )
          }
        </SplitLinePath>
      </g>
    </svg>
  )
}
