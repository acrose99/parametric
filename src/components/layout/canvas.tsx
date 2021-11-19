import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  Preload,
  Stage,
} from '@react-three/drei'
import ViginetteBackground from '../../components/layout/viginetteBackground/Shader/viginetteBackground'
import useStore from '@/helpers/store'
import { useEffect, useRef } from 'react'
import { useControls } from 'leva'
const LControl = () => {
  const dom = useStore((state) => state.dom)
  const control = useRef(null)

  useEffect(() => {
    if (control) {
      dom.current.style['touch-action'] = 'none'
    }
  }, [dom, control])
  // @ts-ignore
  return <OrbitControls position={[0,0,5]} ref={control} domElement={dom.current} />
}
const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)
  const values = useControls('Canvas', {
    'Use Viginette': true,
  })
  return (
    <Canvas
      mode='concurrent'
      style={{
        position: 'absolute',
        top: 0,
      }}
      onCreated={(state) => {
        state.events.connect(dom.current)
        // let gl = state.gl
        // gl.clearColor()
        // gl.setClearAlpha(0)
      }}
      camera={{
        far: 250000000,
      }}
    >
      <LControl />
      <Preload all />
      {values['Use Viginette'] ?  <ViginetteBackground /> : null}
      {children}
    </Canvas>
  )
}

export default LCanvas
