import { useBox } from '@react-three/cannon'
import { useGameStore } from '../store/gameStore'

const GoalDetector = ({ position, side }) => {
    const goal = useGameStore(state => state.goal)

    // Trigger sensor
    useBox(() => ({
        isTrigger: true,
        position,
        args: [4.8, 2.4, 0.5], // Slightly smaller than goal to be inside
        onCollide: (e) => {
            // Check if it's the ball
            // In simple cannon, e.body is the other body. We'd check user data or name if set.
            // For MVP, assume anything colliding is ball (since player probably won't reach inside net easily or we don't care)
            // Better: Assuming Ball is the only thing we care about. 
            // We can debounce to avoid multiple counts.
            goal(side)
        }
    }))

    return null
}

export default GoalDetector
