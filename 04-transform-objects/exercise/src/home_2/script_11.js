import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
- Create 3 Meshes composed of 3 different geometries (sphere, plane, torus)
- use the same MeshBasicMaterial on all 3
- Move the sphere on the left and the torus on the right
*/

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 *  Objects
 */

// Objects as a group

const group = new THREE.Group()
group.position.x = 1.5
group.position.y = 1.5
group.position.z = 1

group.scale.y = 1
group.rotation.y = 0

scene.add(group)

// Individual objects
const geometry_1 = new THREE.BoxGeometry(1, 1, 1)
const material_1 = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh_1 = new THREE.Mesh(geometry_1, material_1)

const cube1 = mesh_1

cube1.position.x = 0
cube1.position.y = 1
cube1.position.z = 1

group.add(cube1)

const geometry_2 = new THREE.BoxGeometry(1, 1, 1)
const material_2 = new THREE.MeshBasicMaterial({ color: 0X00ff00, wireframe: true })
const mesh_2 = new THREE.Mesh(geometry_2, material_2)

const cube2 = mesh_2

cube2.position.x = 1
cube2.position.y = 1
cube2.position.z = 1

cube2.position.x = - 2
group.add(cube2)

const geometry_3 = new THREE.BoxGeometry(1, 1, 1)
const material_3 = new THREE.MeshBasicMaterial({ color: 0X0000ff, wireframe: true })
const mesh_3 = new THREE.Mesh(geometry_3, material_3)

const cube3 = mesh_3

cube3.position.x = 1
cube3.position.y = 1
cube3.position.z = 1

cube3.position.x = 2
group.add(cube3)

// Axes helper - shows the axes
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 9
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()