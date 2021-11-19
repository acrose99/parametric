import * as React from'react'
import {useLoader, useFrame, useThree, Canvas} from '@react-three/fiber'
import { useHelper, useAspect, useProgress, useTexture  } from '@react-three/drei'

 function Lights() {
     return (
       <>
         <directionalLight
           color={'blue'}
           intensity={5.5}
           position={[0, 1, 2]}
         />
         <spotLight
           // distance={100}
           decay={2}
           color={'purple'}
           intensity={5.5}
           position={[0, 5, 2]}
         />
         <spotLight
           // distance={100}
           decay={2}
           color={'pink'}
           intensity={5.5}
           position={[6, 2, 0]}
         />
         <spotLight
           // distance={100}
           decay={2}
           color={'pink'}
           intensity={5.5}
           position={[-6, 2, 0]}
         />
         <directionalLight
           color={'blue'}
           intensity={5.5}
           position={[0, 1, -2]}
         />
         <spotLight
           // distance={100}
           decay={2}
           color={'purple'}
           intensity={5.5}
           position={[0, 5, -2]}
         />
       </>
      )
}

 export default Lights
