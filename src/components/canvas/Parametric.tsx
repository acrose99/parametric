import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLoader, useFrame, useThree, Canvas } from '@react-three/fiber'
import {
  useHelper,
  useAspect,
  useProgress,
  Stage,
  Environment,
  useTexture,
  Line,
} from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva'
import parametricEquations from '@/helpers/parametricEquations'
import Lights from './Lights'
import LineParametric from './LineParametric'
import ExtrudeParametric from './ExtrudeParametric'
import TubeParametric from './TubeParametric'
interface ParametricProps {
  equation: (...any) => { x: number; y: number; z: number }
}
function Parametric(equation: ParametricProps) {
  const values = useControls('General', {
    parametricForm: {
      options: {
        Tube: <TubeParametric equation={equation.equation} />,
        Line: <LineParametric equation={equation.equation} />,
        Extrude: <ExtrudeParametric equation={equation.equation} />,
      },
    },
    rotation: true,
  })
  let parametric = React.useRef()
  useFrame(({ clock }) => {
    if (values.rotation && parametric.current) {
      // @ts-ignore
      parametric.current.rotation.x = parametric.current.rotation.y += 0.001
    }
  })
  return (
    <>
      <Stage
        contactShadow
        shadows
        // @ts-ignore
        background={true}
        adjustCamera
        intensity={1}
        environment='city'
        preset='rembrandt'
      >
        <mesh ref={parametric}>{values.parametricForm}</mesh>
        <Lights />
      </Stage>
    </>
  )
}
function Page() {
  let equation = useMemo(() => parametricEquations.Ellipse, [])
  return <Parametric equation={equation} />
}
export default Page
