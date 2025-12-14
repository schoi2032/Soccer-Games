import { usePlane } from '@react-three/cannon'

const Pitch = () => {
    // Static ground body
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, 0, 0],
        material: { friction: 0.1, restitution: 0.5 }
    }))

    return (
        <group>
            {/* Grass Mesh */}
            <mesh ref={ref} receiveShadow>
                <planeGeometry args={[20, 30]} />
                <meshStandardMaterial color="#2d5a27" roughness={0.8} />
            </mesh>

            {/* Decorative Lines */}
            <PitchLines />
        </group>
    )
}

const PitchLines = () => {
    // Simple white lines slightly above ground to prevent z-fighting
    const Line = ({ args, position, rotation = [-Math.PI / 2, 0, 0] }) => (
        <mesh position={position} rotation={rotation} receiveShadow>
            <planeGeometry args={args} />
            <meshStandardMaterial color="white" />
        </mesh>
    )

    return (
        <group position={[0, 0.01, 0]}>
            {/* Center Circle */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[3, 3.1, 32]} />
                <meshStandardMaterial color="white" />
            </mesh>

            {/* Center Line */}
            <Line args={[18, 0.1]} position={[0, 0, 0]} />

            {/* Side Lines */}
            <Line args={[0.1, 30]} position={[-9, 0, 0]} />
            <Line args={[0.1, 30]} position={[9, 0, 0]} />

            {/* End Lines */}
            <Line args={[18, 0.1]} position={[0, 0, -15]} />
            <Line args={[18, 0.1]} position={[0, 0, 15]} />

            {/* Penalty Areas (Simplified) */}
            <Line args={[10, 0.1]} position={[0, 0, -10]} />
            <Line args={[0.1, 5]} position={[-5, 0, -12.5]} />
            <Line args={[0.1, 5]} position={[5, 0, -12.5]} />

            <Line args={[10, 0.1]} position={[0, 0, 10]} />
            <Line args={[0.1, 5]} position={[-5, 0, 12.5]} />
            <Line args={[0.1, 5]} position={[5, 0, 12.5]} />
        </group>
    )
}

export default Pitch
