import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import { Vector3 } from 'three'
import { useControls } from '../hooks/useControls'
import { useGameStore } from '../store/gameStore'
import { useTeamStore } from '../store/teamStore'

const Player = (props) => {
    const { forward, backward, left, right, sprint } = useControls()
    const { camera } = useThree()
    const setPlayerState = useGameStore(state => state.setPlayerState)

    // Get stats from active squad
    const activePlayer = useTeamStore(state => state.getActivePlayerStats())

    // Stats Mapping (0-100 to Physics units)
    // Speed: 50 -> 4, 100 -> 10
    const baseSpeed = 4 + (activePlayer.speed - 50) * 0.12
    const sprintSpeed = baseSpeed * 1.5

    // Physics body
    const [ref, api] = useSphere(() => ({
        mass: 1,
        position: [0, 2, 0],
        args: [0.5], // Collision sphere size
        fixedRotation: true,
        linearDamping: 0.9,
        ...props
    }))

    const velocity = useRef([0, 0, 0])
    useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [api.velocity])

    const pos = useRef([0, 0, 0])
    useEffect(() => api.position.subscribe((p) => (pos.current = p)), [api.position])

    // Visual State
    const [facing, setFacing] = useState(0) // Rotation Y

    useFrame(() => {
        // Movement Logic
        const currentSpeed = sprint ? sprintSpeed : baseSpeed
        const direction = new Vector3()

        const frontVector = new Vector3(0, 0, Number(backward) - Number(forward))
        const sideVector = new Vector3(Number(left) - Number(right), 0, 0)

        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(currentSpeed)

        api.velocity.set(direction.x, velocity.current[1], direction.z)

        // Calculate rotation based on movement
        if (direction.length() > 0.1) {
            const angle = Math.atan2(direction.x, direction.z)
            setFacing(angle)
        }

        // Sync state
        if (pos.current) {
            setPlayerState(pos.current, [direction.x, 0, direction.z])
        }

        // Camera Follow
        if (pos.current) {
            camera.position.lerp(
                new Vector3(pos.current[0], pos.current[1] + 8, pos.current[2] + 12),
                0.1
            )
            camera.lookAt(pos.current[0], pos.current[1], pos.current[2])
        }
    })

    return (
        <group ref={ref}>
            {/* Humanoid Visuals (Children of the physics body? No, Cannon handles ref positioning) */}
            {/* Note: In Cannon-React, children of ref move with body */}

            {/* Visual Container to handle rotation independently if needed, but for now simple rot */}
            <group rotation={[0, facing, 0]}>

                {/* Torso */}
                <mesh position={[0, 0, 0]} castShadow>
                    <boxGeometry args={[0.5, 0.6, 0.25]} />
                    <meshStandardMaterial color={activePlayer.role === 'GK' ? 'yellow' : 'red'} />
                </mesh>

                {/* Head */}
                <mesh position={[0, 0.55, 0]}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="#ffdbac" /> {/* Skin tone */}
                </mesh>

                {/* Legs (Visual only, static) */}
                <mesh position={[-0.15, -0.4, 0]}>
                    <boxGeometry args={[0.15, 0.4, 0.15]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                <mesh position={[0.15, -0.4, 0]}>
                    <boxGeometry args={[0.15, 0.4, 0.15]} />
                    <meshStandardMaterial color="white" />
                </mesh>

                {/* Direction Indicator (Hidden in game usually, but useful for now) */}
                {/* <mesh position={[0, 0, 0.5]}>
                    <boxGeometry args={[0.1, 0.1, 0.5]} />
                    <meshStandardMaterial color="yellow" />
                 </mesh> */}
            </group>
        </group>
    )
}

export default Player
