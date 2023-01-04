import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';

export default function Scene({ children, ...props }) {
  return (
    <div className="h-screen w-screen fixed top-0 left-0 z-[1]">
      <Canvas {...props}>
        {children}
        <Preload all />
      </Canvas>
    </div>
  );
}
