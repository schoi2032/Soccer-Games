import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { OrbitControls, Environment, PerspectiveCamera, Sky } from '@react-three/drei'
import { Suspense } from 'react'
import Pitch from './Pitch'
import Goal from './Goal'
import Player from './Player'
import Ball from './Ball'
import GoalDetector from './GoalDetector'

const GameScene = () => {
    return (
        <Canvas shadows className="w-full h-full">
            {/* Camera and Controls */}
            <PerspectiveCamera makeDefault position={[0, 10, 15]} fov={50} />
            {/* <OrbitControls /> Removed to allow custom camera logic in Player */}

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[10, 20, 10]}
                intensity={1.5}
                castShadow
                shadow-mapSize={[2048, 2048]}
            />
            <Sky sunPosition={[100, 20, 100]} />
            <Environment preset="park" />

            {/* Physics World */}
            <Physics gravity={[0, -9.81, 0]}>
                <Suspense fallback={null}>
                    <Pitch />
                    <Goal position={[0, 0, -14]} rotation={[0, 0, 0]} />
                    <GoalDetector position={[0, 1, -14.5]} side="home" />

                    <Goal position={[0, 0, 14]} rotation={[0, Math.PI, 0]} />
                    <GoalDetector position={[0, 1, 14.5]} side="away" />

                    <Player />
                    <Ball />
                </Suspense>
            </Physics>
        </Canvas>
    )
}

export default GameScene

