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
 * Textures
 */
const loadingManager = new THREE.LoadingManager()

const textureLoader = new THREE.TextureLoader(loadingManager)
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

//textures used as map and matcap are supposed to be encoded in sRGB
doorColorTexture.colorSpace = THREE.SRGBColorSpace //this gets it to the correct color
matcapTexture.colorSpace = THREE.SRGBColorSpace
doorColorTexture.magFilter = THREE.NearestFilter //this magnifies small images


/**
 *  Objects
 */

// Objects as a group

const group = new THREE.Group()
group.position.x = 1.5
group.position.y = 0
group.position.z = 1

group.scale.y = 1
group.rotation.y = 0

scene.add(group)

// Individual objects

// Cube 1
// const geometry_1 = new THREE.BoxGeometry(1, 1, 1)
const geometry_1 = new THREE.PlaneGeometry(1, 1)
// const material_1 = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true })
// const material_1 = new THREE.MeshBasicMaterial({ map: doorColorTexture, wireframe: false })
const material_1 = new THREE.MeshBasicMaterial()
material_1.map = doorColorTexture
// material_1.color = new THREE.Color('green')
material_1.transparent = true
material_1.opacity = 0.7
// material_1.alphaMap = doorAlphaTexture
// material_1.side = THREE.DoubleSide



const mesh_1 = new THREE.Mesh(geometry_1, material_1)

const cube1 = mesh_1

cube1.position.x = 0
cube1.position.y = 1
cube1.position.z = 1

group.add(cube1)

// Cube 2


const geometry_2 = new THREE.SphereGeometry(.65, 32, 16)
// const material_2 = new THREE.MeshBasicMaterial({ color: 0X00ff00, wireframe: true })

// MeshNormalMaterial
const material_2 = new THREE.MeshNormalMaterial()
material_2.flatShading = true
const mesh_2 = new THREE.Mesh(geometry_2, material_2)

const cube2 = mesh_2

cube2.position.x = 1
cube2.position.y = 1
cube2.position.z = 1

cube2.position.x = - 2
group.add(cube2)


//Cube 3

const geometry_3 = new THREE.TorusGeometry( .5, .2, 16, 50 )

//MeshMatcapMaterial
const material_3 = new THREE.MeshMatcapMaterial()
material_3.matcap = matcapTexture

// const material_3 = new THREE.MeshBasicMaterial({ color: 0X0000ff, wireframe: true })
const mesh_3 = new THREE.Mesh(geometry_3, material_3)

const cube3 = mesh_3

// cube3.position.x = 1
cube3.position.y = 1
cube3.position.z = 1

cube3.position.x = 2
group.add(cube3)


//Cube 4

const geometry_4 = new THREE.ConeGeometry( .5, 1, 32)

//MeshMatcapMaterial
const material_4 = new THREE.MeshMatcapMaterial()
material_4.matcap = matcapTexture

// const material_4 = new THREE.MeshBasicMaterial({ color: 0X0000ff, wireframe: true })
const mesh_4 = new THREE.Mesh(geometry_4, material_4)

const cube4 = mesh_4

cube4.position.x = 2
cube4.position.y = 3
cube4.position.z = 1

group.add(cube4)

// Axes helper - shows the axes
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

//Cube 5

const geometry_5 = new THREE.CylinderGeometry( .5, .5, 1, 20)

//MeshMatcapMaterial
const material_5 = new THREE.MeshMatcapMaterial()
material_5.matcap = matcapTexture

// const material_5 = new THREE.MeshBasicMaterial({ color: 0X0000ff, wireframe: true })
const mesh_5 = new THREE.Mesh(geometry_5, material_5)

const cube5 = mesh_5

cube5.position.x = 0
cube5.position.y = 3
cube5.position.z = 1

group.add(cube5)

//Cube 6

const geometry_6 = new THREE.CapsuleGeometry( .5, .25, 4, 8 )

//MeshMatcapMaterial
const material_6 = new THREE.MeshMatcapMaterial()
material_6.matcap = matcapTexture

// const material_6 = new THREE.MeshBasicMaterial({ color: 0X0000ff, wireframe: true })
const mesh_6 = new THREE.Mesh(geometry_6, material_6)

const cube6 = mesh_6

cube6.position.x = -2
cube6.position.y = 3
cube6.position.z = 1

group.add(cube6)

//Cube 7

const geometry_7 = new THREE.CapsuleGeometry( .5, .25, 4, 8 )

//MeshMatcapMaterial
const material_7 = new THREE.MeshMatcapMaterial()
material_7.matcap = matcapTexture

// const material_7 = new THREE.MeshBasicMaterial({ color: 0X0000ff, wireframe: true })
const mesh_7 = new THREE.Mesh(geometry_7, material_7)

const cube7 = mesh_7

cube7.position.x = 2
cube7.position.y = 5
cube7.position.z = 1

group.add(cube7)

//Cube 8

const geometry_8 = new THREE.SphereGeometry(.65, 32, 16)

//MeshMatcapMaterial
const material_8 = new THREE.MeshMatcapMaterial()
material_8.matcap = matcapTexture

// const material_8 = new THREE.MeshBasicMaterial({ color: 0X0000ff, wireframe: true })
const mesh_8 = new THREE.Mesh(geometry_8, material_8)

const cube8 = mesh_8

cube8.position.x = 0
cube8.position.y = 5
cube8.position.z = 1

group.add(cube8)

//Cube 9

const geometry_9 = new THREE.ConeGeometry( .5, 1, 32)

//MeshMatcapMaterial
const material_9 = new THREE.MeshMatcapMaterial()
material_9.matcap = matcapTexture

// const material_9 = new THREE.MeshBasicMaterial({ color: 0X0000ff, wireframe: true })
const mesh_9 = new THREE.Mesh(geometry_9, material_9)

const cube9 = mesh_9

cube9.position.x = -2
cube9.position.y = 5
cube9.position.z = 1

group.add(cube9)

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
camera.position.y = 5
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

    // Update objects
    cube1.rotation.y = 0.1 * elapsedTime
    cube2.rotation.y = 0.1 * elapsedTime
    cube3.rotation.y = 0.1 * elapsedTime
    cube4.rotation.y = 0.1 * elapsedTime
    cube5.rotation.y = 0.1 * elapsedTime
    cube6.rotation.y = 0.1 * elapsedTime
    cube7.rotation.y = 0.1 * elapsedTime
    cube8.rotation.y = 0.1 * elapsedTime
    cube9.rotation.y = 0.1 * elapsedTime

    cube1.rotation.x = -0.15 * elapsedTime
    cube2.rotation.x = -0.15 * elapsedTime
    cube3.rotation.x = -0.15 * elapsedTime
    cube4.rotation.x = -0.15 * elapsedTime
    cube5.rotation.x = -0.15 * elapsedTime
    cube6.rotation.x = -0.15 * elapsedTime
    cube7.rotation.x = -0.15 * elapsedTime
    cube8.rotation.x = -0.15 * elapsedTime
    cube9.rotation.x = -0.15 * elapsedTime


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()