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

interface TubeParametricProps {
  equation: (...any) => { x: number; y: number; z: number }
}
function TubeParametric({ equation }: TubeParametricProps) {
  const meshRef = useRef()
  const {
    scale,
    a,
    tubularSegments,
    radius,
    radialSegments,
    closed,
    modifier,
    wireframe,
  } = useControls('Material', {
    wireframe: false,
    scale: {
      value: 500,
      step: 10,
      min: 0,
    },
    a: {
      value: 3,
      step: 0.1,
    },
    modifier: {
      value: 12,
      step: 1,
      min: 0,
    },
    tubularSegments: {
      value: 600,
      step: 10,
      min: 1,
    },
    radius: {
      value: 64,
      step: 1,
      min: 1,
    },
    radialSegments: {
      value: 8,
      step: 1,
      min: 20,
    },
    closed: false,
  })
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
    flatShading
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
  const tubeSettings = useMemo(
    () => ({
      tubularSegments: tubularSegments,
      radius: radius,
      radialSegments: radialSegments,
      closed: closed,
    }),
    [tubularSegments, radius, radialSegments, closed]
  )

  let tubeGeometry = useMemo(() => {
    // @ts-ignore
    class CustomSinCurve extends THREE.Curve {
      scale: number
      constructor(scale = 1) {
        super()

        this.scale = scale
      }

      getPoint(t, optionalTarget = new THREE.Vector3()) {
        let theta = THREE.MathUtils.degToRad(t * 360 * modifier)
        const tx = t * equation(theta, a).x
        const ty = t * -equation(theta, a).y
        const tz = t * equation(theta, a).z
        return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale)
      }
    }
    const path = new CustomSinCurve(scale)
    const geometry = new THREE.TubeGeometry(
      // @ts-ignore
      path,
      tubeSettings.tubularSegments,
      tubeSettings.radius,
      tubeSettings.radialSegments,
      tubeSettings.closed
    )
    return geometry
  }, [
    scale,
    tubeSettings.tubularSegments,
    tubeSettings.radius,
    tubeSettings.radialSegments,
    tubeSettings.closed,
    modifier,
    equation,
    a,
  ])

  return (
    <>
      <mesh ref={meshRef} geometry={tubeGeometry}>
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
          shininess={shininess}
          flatShading={flatShading}
          wireframe={wireframe}
          roughness={roughness}
          reflectivity={reflectivity}
          attach='material'
        />
      </mesh>
    </>
  )
}

export default TubeParametric
