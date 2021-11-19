import React, { useMemo, useRef, useState } from 'react'
import { useLoader, useFrame, useThree, Canvas } from '@react-three/fiber'
import {
  useHelper,
  useAspect,
  useProgress,
  Stage,
  useTexture,
  Line,
} from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva'
import parametricEquations from '@/helpers/parametricEquations'

interface LineParametricProps {
  equation: (...any) => { x: number, y: number, z: number };
}
function LineParametric({ equation }: LineParametricProps) {
  const meshRef = useRef()
  const {
    pointSize,
    modifier,
    a
  } = useControls('Parametric', {
    wireframe: false,
    pointSize: {
      value: 1000,
      step: 100,
    },
    a: {
      value: 1,
      step: 0.01,
      min: 0,
    },
    modifier: {
      value: 1,
      step: 0.01,
      min: 0,
    }
  })
  const {color} = useControls('Material', {
    color: 'blue'
  })
  // let parametricShape = new THREE.Shape()
  let points = useMemo(() => {
    let points = []
    for (let i = 0; i < pointSize; i++) {
      let prevPoint = points[i - 1] || points[points.length - 1]
      let theta = THREE.MathUtils.degToRad(i)
      let x = equation(theta, a).x * modifier
      let y = -equation(theta, a).y * modifier
      let z = equation(theta, a).z * modifier
      points.push(new THREE.Vector3(x, y, z))
    }
    return points
  }, [a, equation, modifier, pointSize])
  return (
    <>
        <Line ref={meshRef}
        position={[0, 0, 10]} points={points} color={color} />
    </>
  )
}

export default LineParametric
