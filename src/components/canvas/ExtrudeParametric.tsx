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

interface ExtrudeParametricProps {
  equation: (...any) => { x: number; y: number; z: number }
}
function ExtrudeParametric({ equation }: ExtrudeParametricProps) {
  const meshRef = useRef()
  const {
    wireframe,
    pointSize,
    modifier,
    a,
    curveSegments,
    steps,
    depth,
    bevelEnabled,
    bevelThickness,
    bevelSize,
    bevelSegments,
    bevelOffset,
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
    },
    curveSegments: {
      value: 1,
      step: 1,
    },
    steps: {
      value: 1,
      step: 1,
    },
    depth: {
      value: 0.5,
      step: 0.1,
    },
    bevelEnabled: {
      value: true,
    },
    bevelThickness: {
      value: 1,
      step: 0.1,
    },
    bevelSize: {
      value: 0.5,
      step: 0.1,
    },
    bevelSegments: {
      value: 5,
      step: 1,
      min: 0,
    },
    bevelOffset: {
      value: 0,
      step: 0.1,
      min: 0,
    },
  })
  const extudeSettings = useMemo(
    () => ({
      curveSegments: curveSegments,
      steps: steps,
      depth: depth,
      bevelEnabled: bevelEnabled,
      bevelThickness: bevelThickness,
      bevelSize: bevelSize,
      bevelSegments: bevelSegments,
    }),
    [
      curveSegments,
      steps,
      depth,
      bevelEnabled,
      bevelThickness,
      bevelSize,
      bevelSegments,
    ]
  )
  const {
    color,
    emissive,
    emissiveIntensity,
    metalness,
    transmission,
    clearcoat,
    specular,
    opacity,
    shininess,
    roughness,
    reflectivity,
    flatShading,
  } = useControls('Material', {
    color: { value: 'blue' },
    emissive: '#62236f',
    emissiveIntensity: {
      value: 0.5,
      step: 0.1,
    },
    metalness: {
      value: 1,
      step: 0.1,
      min: 0,
      max: 1,
    },
    transmission: {
      value: 1,
      step: 0.1,
      min: 0,
      max: 1,
    },
    clearcoat: {
      value: 1,
      step: 0.1,
      min: 0,
      max: 1,
    },
    specular: '#b0ef',
    opacity: {
      value: 1,
      step: 0.1,
      min: 0,
      max: 1,
    },
    shininess: {
      value: 1,
      step: 0.1,
      min: 0,
      max: 1,
    },
    roughness: {
      value: 0,
      step: 0.1,
      min: 0,
      max: 1,
    },
    reflectivity: {
      value: 1,
      step: 0.1,
      min: 0,
      max: 1,
    },
    flatShading: false,
  })
  let points = useMemo(() => {
    let points = []
    for (let i = 0; i < pointSize; i++) {
      // let prevPoint = points[i - 1] || points[points.length - 1]
      let theta = THREE.MathUtils.degToRad(i)
      let x = equation(theta, a).x * modifier
      // let cpx = prevPoint ? prevPoint.x + x : x
      let y = -equation(theta, a).y * modifier
      // let cpy = prevPoint ? prevPoint.y + y : y
      let z = equation(theta, a).z * modifier
      points.push(new THREE.Vector3(x, y, z))
      // parametricShape.quadraticCurveTo(cpx, cpy, x, y)
    }
    return points
  }, [a, equation, modifier, pointSize])

  let parametricShape = useMemo(() => {
    let parametricShape = new THREE.Shape().setFromPoints(points)
    return parametricShape
  }, [points])
  const extrudeGeometry = useMemo(
    () => new THREE.ExtrudeBufferGeometry(parametricShape, extudeSettings),
    [extudeSettings, parametricShape]
  )
  return (
    <>
      <mesh ref={meshRef} geometry={extrudeGeometry}>
        <meshPhysicalMaterial
          side={THREE.DoubleSide}
          color={color}
          // @ts-ignore
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
          metalness={metalness}
          transmission={transmission}
          clearcoat={clearcoat}
          specularColor={specular}
          opacity={opacity}
          flatShading={flatShading}
          shininess={shininess}
          wireframe={wireframe}
          roughness={roughness}
          reflectivity={reflectivity}
          attach='material'
        />
      </mesh>
    </>
  )
}

export default ExtrudeParametric
