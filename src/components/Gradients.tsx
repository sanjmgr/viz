import {
  GradientDarkgreenGreen,
  GradientLightgreenGreen,
  GradientOrangeRed,
  GradientPinkBlue,
  GradientPinkRed,
  GradientPurpleOrange,
  GradientPurpleRed,
  GradientTealBlue,
  LinearGradient,
  RadialGradient,
} from '@visx/gradient'
import { Bar } from '@visx/shape'
import React, { FC, Fragment } from 'react'

const defaultMargin = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}

const Gradients: FC<{ id: string }>[] = [
  GradientPinkRed,
  ({ id }) => <RadialGradient id={id} from='#55bdd5' to='#4f3681' r='80%' />,
  GradientOrangeRed,
  GradientPinkBlue,
  ({ id }) => (
    <LinearGradient id={id} from='#351CAB' to='#621A61' rotate='-45' />
  ),
  GradientLightgreenGreen,
  GradientPurpleOrange,
  GradientTealBlue,
  GradientPurpleRed,
  GradientDarkgreenGreen,
]

type GradientProps = {
  width: number
  height: number
  margin?: typeof defaultMargin
}

export const GradientCard = ({
  height,
  width,
  margin = defaultMargin,
}: GradientProps) => {
  const numColumns = width > 600 ? 5 : 2
  const numRows = Gradients.length / numColumns
  const columnWidth = Math.max(width / numColumns, 0)
  const rowHeight = Math.max((height - margin.bottom) / numRows, 0)

  return (
    <svg width={width} height={height}>
      {Gradients.map((Gradient, index) => {
        const columnIndex = index % numColumns
        const rowIndex = Math.floor(index / numColumns)
        const id = `gradient-${index}-${rowIndex}${columnIndex}`
        return (
          <Fragment key={id}>
            {/** Like SVG <defs />, Gradients are rendered with an id */}
            <Gradient id={id} />
            {/** And are then referenced for a style attribute. */}
            <Bar
              fill={`url(#${id})`}
              x={columnIndex * columnWidth}
              y={rowIndex * rowHeight}
              width={columnWidth}
              height={rowHeight}
              stroke='#ffffff'
              strokeWidth={8}
              rx={14}
            />
          </Fragment>
        )
      })}
    </svg>
  )
}
