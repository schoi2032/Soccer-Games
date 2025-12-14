import { useBox } from '@react-three/cannon'

const Goal = ({ position, rotation }) => {
    // Goal Post dimensions
    const postHeight = 2.5
    const postWidth = 0.2
    const goalWidth = 5

    // Physics bodies for posts (Static)
    const [leftPost] = useBox(() => ({ type: 'Static', position: [position[0] - goalWidth / 2, position[1] + postHeight / 2, position[2]], args: [postWidth, postHeight, postWidth] }))
    const [rightPost] = useBox(() => ({ type: 'Static', position: [position[0] + goalWidth / 2, position[1] + postHeight / 2, position[2]], args: [postWidth, postHeight, postWidth] }))
    const [crossbar] = useBox(() => ({ type: 'Static', position: [position[0], position[1] + postHeight, position[2]], args: [goalWidth, postWidth, postWidth] }))

    // Net (Visual only for now, maybe simple physics later)
    // For now, we just make the posts visible

    return (
        <group position={position} rotation={rotation}>
            {/* Visuals matching physics */}
            {/* We need to reverse transform here or just rely on physics debug mesh? 
           Actually, useBox returns a ref that syncs mesh to body. 
           But since we passed position to useBox, the ref will be at that world position.
           Wait, if we use the ref on a mesh inside a group that is also positioned, we might double transform.
           Best practice: components manage their own world space via props or use relative.
           Since useBox sets world transform, we shouldn't parent it to a transformed group unless necessary.
           However, I passed absolute positions calculated from props. So I should just render meshes with refs.
       */}
        </group>
    )
}
// Actually, the above component logic is a bit flawed for reusability. 
// Better to make a "GoalStructure" that takes a position and handles internal offsets.
// Let's rewrite Goal to be simpler and functional.

const GoalPost = ({ position, args }) => {
    const [ref] = useBox(() => ({ type: 'Static', position, args }))
    return (
        <mesh ref={ref} castShadow>
            <boxGeometry args={args} />
            <meshStandardMaterial color="white" />
        </mesh>
    )
}

const SimpleGoal = ({ position, rotation }) => {
    // We need to calculate world positions for the parts based on the goal center position
    // This is tricky if we want rotation.
    // Easier approach: Use a compound body or just explicit positions?
    // Let's stick to simple implementation: Just render a group and use visual meshes, 
    // And for physics, maybe an invisible box for the back?
    // For MVP, just posts are fine.

    // Let's hardcode offsets for now assuming no complex rotation other than 0 or 180 (PI).
    // If rotation is PI, we flip Z.

    const isFlipped = rotation && rotation[1] !== 0;
    const zOffset = 0; // Center is on the line

    const w = 5;
    const h = 2.4;
    const d = 0.2; // post thickness

    // Calculate world pos
    const px = position[0];
    const py = position[1];
    const pz = position[2];

    return (
        <group>
            <GoalPost position={[px - w / 2, py + h / 2, pz]} args={[d, h, d]} />
            <GoalPost position={[px + w / 2, py + h / 2, pz]} args={[d, h, d]} />
            <GoalPost position={[px, py + h, pz]} args={[w + d, d, d]} />
        </group>
    )
}

export default SimpleGoal
