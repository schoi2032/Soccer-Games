import { useSphere } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../store/gameStore'
import { useControls } from '../hooks/useControls'
import { Vector3 } from 'three'

const Ball = (props) => {
    const { shoot } = useControls()
    const playerPos = useGameStore(state => state.playerPos)

    const [ref, api] = useSphere(() => ({
        mass: 0.5,
        position: [0, 5, 5],
        args: [0.3],
        material: { restitution: 0.7, friction: 0.5 },
        linearDamping: 0.4,
        angularDamping: 0.4,
        ...props
    }))

    useFrame(() => {
        // Check distance to player
        const ballPos = new Vector3()
        // ref.current is the mesh, keeping track of position visually which syncs with physics
        if (ref.current) {
            ballPos.copy(ref.current.position)
        }

        if (!playerPos) return

        const pPos = new Vector3(playerPos[0], playerPos[1], playerPos[2])
        const dist = ballPos.distanceTo(pPos)

        // Dribbling Mechanics
        // If close (e.g. < 1.5m), gently push ball towards play direction + offset
        if (dist < 1.5) {
            // Shooting
            if (shoot) {
                // Shoot towards where player is facing (or forward if we had that)
                // Simple: Shoot in direction from player to ball, but added upward
                const shootDir = new Vector3().subVectors(ballPos, pPos).normalize()
                shootDir.y += 0.5 // Loft
                api.applyImpulse([shootDir.x * 10, shootDir.y * 10, shootDir.z * 10], [0, 0, 0])
            } else {
                // Dribbling (Magnet)
                // If ball is moving away too fast, damp it?
                // Or apply force towards "dribble point" in front of player
                // For now, let's just leave it as collision-based.
            }
        }
    })

    return (
        <mesh ref={ref} castShadow receiveShadow>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color="white" />
        </mesh>
    )
}

export default Ball
