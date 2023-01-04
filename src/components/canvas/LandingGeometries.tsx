import { useEffect, useRef, useState } from 'react';
import {
  useCursor,
  RoundedBox,
  ScrollControls,
  Scroll,
} from '@react-three/drei';
import { motion as motion3d } from 'framer-motion-3d';
import { primaryColor } from 'customTheme';
import {
  MotionConfig,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from 'framer-motion';
import { Mesh } from 'three';
import { useFrame, useThree } from '@react-three/fiber';

const pages = 3;

export default function LandingGeometries() {
  const { scrollYProgress } = useScroll();
  const { viewport } = useThree();

  const springYProgress = useSpring(scrollYProgress, {
    stiffness: 175,
    damping: 50,
    restDelta: 0.001,
  });

  const fromToPage = (from, to) => {
    const pageSize = 1 / pages;

    return [from * pageSize, to * pageSize];
  };

  const useTransformByPage = (page, transform) => {
    const [from, to] = fromToPage(page, page + 1);

    return useTransform<number, number>(
      springYProgress,
      page === 0 ? [from, to] : [from, (to + from) / 2, to],
      transform
    );
  };

  const useXTransformByPage = (page, transform) => {
    const x = useTransformByPage(page, transform);

    return useTransform(x, (y) => y * viewport.width);
  };

  const useYTransformByPage = (page, transform) => {
    const y = useTransformByPage(page, transform);

    return useTransform(y, (y) => y * viewport.height - viewport.height * page);
  };

  const transforms = {
    sphere: {
      positionX: useXTransformByPage(0, [0, 0.1]),
      positionY: useYTransformByPage(0, [0.35, 0.5]),
    },
    torus: {
      positionX: useXTransformByPage(0, [-0.3, -0.6]),
      positionY: useYTransformByPage(0, [-0.25, -1.5]),
      rotationX: useTransformByPage(0, [0, 10]),
      rotateYWhenHovered: 1,
      rotateXWhenHovered: 1,
    },
    cone: {
      positionX: useXTransformByPage(0, [-0.3, -1]),
      positionY: useYTransformByPage(0, [0.25, 0.5]),
      rotationX: useTransformByPage(0, [0, 10]),
    },
    icoshedron: {
      positionX: useXTransformByPage(0, [0.3, 0.6]),
      positionY: useYTransformByPage(0, [-0.25, -1.5]),
      rotationX: useTransformByPage(0, [0, 5]),
    },
    roundedBox: {
      positionX: useXTransformByPage(0, [0.35, 0.65]),
      positionY: useYTransformByPage(0, [0.2, 0.5]),
      rotationX: useTransformByPage(0, [2, 7]),
    },
    torusKnot: {
      positionX: useXTransformByPage(1, [0.2, 0.2, 0.2]),
      positionY: useYTransformByPage(1, [-0.3, 0, 0.3]),
      rotationX: useTransformByPage(1, [-3, 0, 3]),
    },
  };

  useFrame(({ camera }) => {
    camera.position.y =
      springYProgress.get() * -(viewport.height * (pages - 1));
  });

  // useEffect(() => {
  //   console.log(
  //     `Viewport Width: ${
  //       viewport.width
  //     }, torusKnotY: ${transforms.torusKnot.positionY.get()}`
  //   );
  //   transforms.torusKnot.positionY.on('change', () =>
  //     console.log(
  //       `Viewport Width: ${
  //         viewport.width
  //       }, torusKnotY: ${transforms.torusKnot.positionY.get()}`
  //     )
  //   );
  // }, []);

  return (
    <MotionConfig transition={{ duration: 2, type: 'spring' }}>
      <CustomGeometry type="sphere" {...transforms.sphere} />
      <CustomGeometry type="torus" {...transforms.torus} />
      <CustomGeometry type="cone" {...transforms.cone} />
      <CustomGeometry type="icosahedron" {...transforms.icoshedron} />
      <CustomGeometry type="roundedBox" {...transforms.roundedBox} />
      <CustomGeometry type="torusKnot" {...transforms.torusKnot} />

      {/* <mesh position={[0, -7.673269879789604, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="white" />
      </mesh> */}

      <ambientLight intensity={0.5} color="white" />
      <directionalLight color="white" position={[0, 0, 1]} intensity={0.75} />
    </MotionConfig>
  );
}

type CustomGeometryProps = {
  type:
    | 'sphere'
    | 'torus'
    | 'cone'
    | 'icosahedron'
    | 'roundedBox'
    | 'torusKnot';
  positionX?: MotionValue<number>;
  positionY?: MotionValue<number>;
  positionZ?: MotionValue<number>;
  rotationX?: MotionValue<number>;
  rotationY?: MotionValue<number>;
  rotationZ?: MotionValue<number>;
  scaleWhenHovered?: number;
  scaleXWhenHovered?: number;
  scaleYWhenHovered?: number;
  scaleZWhenHovered?: number;
  rotateXWhenHovered?: number;
  rotateYWhenHovered?: number;
  rotateZWhenHovered?: number;
};

const CustomGeometry = ({
  type,
  positionX,
  positionY,
  positionZ,
  rotationX,
  rotationY,
  rotationZ,
  scaleWhenHovered,
  scaleXWhenHovered,
  scaleYWhenHovered,
  scaleZWhenHovered,
  rotateXWhenHovered,
  rotateYWhenHovered,
  rotateZWhenHovered,
}: CustomGeometryProps) => {
  const geometryRef = useRef<Mesh>();
  const [hovered, hover] = useState(false);
  useCursor(hovered);

  const material = (
    <meshPhysicalMaterial roughness={0.5} color={primaryColor} />
  );

  const meshProps = {
    'position-x': positionX,
    'position-y': positionY,
    'position-z': positionZ,
    'rotation-x': rotationX,
    'rotation-y': rotationY,
    'rotation-z': rotationZ,
    whileHover: {
      ...(scaleXWhenHovered || scaleYWhenHovered || scaleZWhenHovered
        ? {
            scaleX: scaleXWhenHovered,
            scaleY: scaleYWhenHovered,
            scaleZ: scaleZWhenHovered,
          }
        : { scale: scaleWhenHovered ?? 1.2 }),
      rotateX: rotateXWhenHovered,
      rotateY: rotateYWhenHovered,
      rotateZ: rotateZWhenHovered ?? 1,
    },
  };

  const wrapGeometry = (geometry: JSX.Element) => (
    <motion3d.mesh
      ref={geometryRef}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...meshProps}
    >
      {geometry}
      {material}
    </motion3d.mesh>
  );

  switch (type) {
    case 'sphere':
      return wrapGeometry(<sphereGeometry args={[0.75, 64, 64]} />);
    case 'torus':
      return wrapGeometry(<torusGeometry args={[0.4, 0.2, 20, 50]} />);
    case 'cone':
      return wrapGeometry(<coneGeometry args={[0.5, 0.8, 20]} />);
    case 'icosahedron':
      return wrapGeometry(<icosahedronGeometry args={[0.7, 0]} />);
    case 'torusKnot':
      return wrapGeometry(
        <torusKnotGeometry args={[1, 0.02, 1000, 8, 7, 23]} />
      );
    case 'roundedBox':
      return (
        // @ts-ignore
        <AnimatedRoundedBox
          args={[1, 1, 1]}
          radius={0.2}
          smoothness={8}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          {...meshProps}
        >
          {material}
        </AnimatedRoundedBox>
      );
  }
};

/* @ts-ignore */
const AnimatedRoundedBox = motion3d(RoundedBox);
/* @ts-ignore */
