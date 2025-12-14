import { useState, useEffect } from 'react'

export const useControls = () => {
    const [movement, setMovement] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        shoot: false,
        sprint: false
    })

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.code) {
                case 'ArrowUp':
                case 'KeyW':
                    setMovement(m => ({ ...m, forward: true }))
                    break
                case 'ArrowDown':
                case 'KeyS':
                    setMovement(m => ({ ...m, backward: true }))
                    break
                case 'ArrowLeft':
                case 'KeyA':
                    setMovement(m => ({ ...m, left: true }))
                    break
                case 'ArrowRight':
                case 'KeyD':
                    setMovement(m => ({ ...m, right: true }))
                    break
                case 'Space':
                    setMovement(m => ({ ...m, shoot: true }))
                    break
                case 'ShiftLeft':
                    setMovement(m => ({ ...m, sprint: true }))
                    break
            }
        }

        const handleKeyUp = (e) => {
            switch (e.code) {
                case 'ArrowUp':
                case 'KeyW':
                    setMovement(m => ({ ...m, forward: false }))
                    break
                case 'ArrowDown':
                case 'KeyS':
                    setMovement(m => ({ ...m, backward: false }))
                    break
                case 'ArrowLeft':
                case 'KeyA':
                    setMovement(m => ({ ...m, left: false }))
                    break
                case 'ArrowRight':
                case 'KeyD':
                    setMovement(m => ({ ...m, right: false }))
                    break
                case 'Space':
                    setMovement(m => ({ ...m, shoot: false }))
                    break
                case 'ShiftLeft':
                    setMovement(m => ({ ...m, sprint: false }))
                    break
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return movement
}
