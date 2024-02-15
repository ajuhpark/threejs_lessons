import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

console.log(OrbitControls)

/**
 * Cursor
 */
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => 
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
    // console.log(cursor.y)
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects as a group
 */
const group = new THREE.Group()
// group.position.y = 0
group.position.x = 1.5
group.position.y = 1.5
group.position.z = 3


group.scale.y = 1
group.rotation.y = 0

scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true})
)
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0X00ff00, wireframe: true})
)
cube2.position.x = - 2
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0X0000ff, wireframe: true})
)
cube3.position.x = 2
group.add(cube3)

/* Previous Object for one cube

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Scale 
// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5
mesh.scale.set(2, 0.5, 0.5)

// Rotation 
mesh.rotation.reorder('YXZ') //this changes the Y first so there's no Gimbal lock
mesh.rotation.x = Math.PI * .25
mesh.rotation.y = Math.PI * .25

// Position
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1
mesh.position.set(0.7, -0.6, 1)
*/

// Axes helper - shows the axes
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const aspectRatio = sizes.width / sizes.height

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, .1, 100)
// const camera = new THREE.OrthographicCamera(
//     - 1 * aspectRatio, 
//     1 * aspectRatio, 
//     1, 
//     - 1, 
//     0.1, 
//     100 )

// camera.position.x = 2.5
// camera.position.y = 3
camera.position.z = 10
camera.lookAt(group.position)
scene.add(camera)
// camera.lookAt(new THREE.Vector3(3, 0, 0))
// camera.lookAt(mesh.position)
// console.log(mesh.position.distanceTo(camera.position))

/* Controls - the two parameters for OrbitControls is your camera 
that you want to update and the DOM element that the mouse events 
are being applied to. */ 
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.target.y = 2
// controls.update()

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// Time
let time = Date.now()

// Clock 
const clock = new THREE.Clock()
// gsap.to(group.position, { duration: 1, delay: 1, x: 2})
// gsap.to(group.position, { duration: 1, delay: 2, x: 0})


//Animations
const tick = () =>
{
    //Clock 
    const elapsedTime = clock.getElapsedTime()
    // console.log(elapsedTime)

    // Time
    // const currentTime = Date.now()
    // const deltaTime = currentTime - time
    // time = currentTime
    // console.log(deltaTime)

    // Update objects
    // group.position.x -= 0.01
    // group.rotation.y += 0.0005 * deltaTime
    // group.rotation.y = elapsedTime
    // group.rotation.y = elapsedTime
    // group.position.y = Math.sin(elapsedTime)
    // group.position.x = Math.cos(elapsedTime)
    // camera.position.y = Math.sin(elapsedTime) *2
    // camera.position.x = Math.cos(elapsedTime) *2
    // camera.lookAt(group.position)

    // Update Camera
    // camera.position.x = cursor.x * 10
    // camera.position.y = cursor.y * 10
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5

    // camera.lookAt(new THREE.Vector3())
    camera.lookAt(group.position)

    // Update controls - this updates the damping controls above.
    controls.update()

    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)

}

tick()