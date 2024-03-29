import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'

/**
 * Debug
 */
const gui = new GUI()

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

//MeshDepthMaterial - if you zoom in, it gets light
const material_4 = new THREE.MeshDepthMaterial()

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

//MeshLambertMaterial - This material requires lights
const material_5 = new THREE.MeshLambertMaterial()

// const material_5 = new THREE.MeshBasicMaterial({ color: 0X0000ff, wireframe: true })
const mesh_5 = new THREE.Mesh(geometry_5, material_5)

const cube5 = mesh_5

cube5.position.x = 0
cube5.position.y = 3
cube5.position.z = 1

group.add(cube5)


//Cube 6

const geometry_6 = new THREE.CapsuleGeometry( .5, .25, 4, 8 )

//MeshPhongMaterial - this is like MeshLambertMaterial but it has light reflection.
const material_6 = new THREE.MeshPhongMaterial()
material_6.shininess = 80
material_6.specular = new THREE.Color(0x1188ff)

// const material_6 = new THREE.MeshBasicMaterial({ color: 0X0000ff, wireframe: true })
const mesh_6 = new THREE.Mesh(geometry_6, material_6)

const cube6 = mesh_6

cube6.position.x = -2
cube6.position.y = 3
cube6.position.z = 1

group.add(cube6)

//Cube 7

const geometry_7 = new THREE.CapsuleGeometry( .5, .25, 4, 8 )

//MeshToonMaterial
const material_7 = new THREE.MeshToonMaterial()

// const material_7 = new THREE.MeshBasicMaterial({ color: 0X0000ff, wireframe: true })
const mesh_7 = new THREE.Mesh(geometry_7, material_7)
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false
material_1.gradientMap = gradientTexture

const cube7 = mesh_7

cube7.position.x = 2
cube7.position.y = 5
cube7.position.z = 1

group.add(cube7)

//Cube 8

const geometry_8 = new THREE.SphereGeometry(.65, 64, 64)

//MeshStandardMaterial
const material_8 = new THREE.MeshStandardMaterial()
material_8.metalness = 1
material_8.roughness = 1
material_8.map = doorColorTexture
material_8.aoMap = doorAmbientOcclusionTexture //this image creates shade where it's dark
material_8.aoMapIntensity = 1
material_8.displacementMap = doorHeightTexture //this one makes it more 3d according to image
material_8.displacementScale = 0.05
material_8.metalnessMap = doorMetalnessTexture
material_8.roughnessMap = doorRoughnessTexture
material_8.normalMap = doorNormalTexture  // fakes the normal orientation and adds detail regardless of subdivision
material_8.normalScale.set(0.5,0.5)
material_8.alphaMap = doorAlphaTexture

gui.add(material_8, 'metalness').min(0).max(1).step(0.0001)
gui.add(material_8, 'roughness').min(0).max(1).step(0.0001)


// const material_8 = new THREE.MeshBasicMaterial({ color: 0X0000ff, wireframe: true })
const mesh_8 = new THREE.Mesh(geometry_8, material_8)

const cube8 = mesh_8

cube8.position.x = 0
cube8.position.y = 5
cube8.position.z = 1

group.add(cube8)

//Cube 9

const geometry_9 = new THREE.ConeGeometry( .5, 1, 32)

//MeshPhysicalMaterial - same as StandardMaterial but access to more features
const material_9 = new THREE.MeshPhysicalMaterial()
material_9.metalness = 0
material_9.roughness = 0
// material_9.map = doorColorTexture
// material_9.aoMap = doorAmbientOcclusionTexture //this image creates shade where it's dark
// material_9.aoMapIntensity = 1
// material_9.displacementMap = doorHeightTexture //this one makes it more 3d according to image
// material_9.displacementScale = 0.05
// material_9.metalnessMap = doorMetalnessTexture
// material_9.roughnessMap = doorRoughnessTexture
// material_9.normalMap = doorNormalTexture  // fakes the normal orientation and adds detail regardless of subdivision
// material_9.normalScale.set(0.5,0.5)
// material_9.alphaMap = doorAlphaTexture

// added for physicalMaterial
// clearCoat
// material_9.clearcoat = 1
// material_9.clearcoatroughness = 0

gui.add(material_9, 'metalness').min(0).max(1).step(0.0001)
gui.add(material_9, 'roughness').min(0).max(1).step(0.0001)
// gui.add(material_9, 'clearcoat').min(0).max(1).step(0.0001)
// gui.add(material_9, 'clearcoatRoughness').min(0).max(1).step(0.0001)

// Sheen 
// material_9.sheen = 1
// material_9.sheenRoughness = 0.25
// material_9.sheenColor.set(1, 1, 1)

// gui.add(material_9, 'sheen').min(0).max(1).step(0.0001)
// gui.add(material_9, 'sheenRoughness').min(0).max(1).step(0.0001)
// gui.addColor(material_9, 'sheenColor')

// Iridscence - adds like the gasoline puddle reflection
// material_9.iridescence = 1
// material_9.iridescenceIOR = 1
// material_9.iridescenceThicknessRange = [ 100, 800 ]

// gui.add(material_9, 'iridescence').min(0).max(1).step(0.0001)
// gui.add(material_9, 'iridescenceIOR').min(0).max(2.333).step(0.0001)
// gui.add(material_9.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
// gui.add(material_9.iridescenceThicknessRange, '1').min(1).max(1000).step(1)

// Transmission - makes it like kind of transparent 
// this can work well if you turn everything off except for metalness and rougness
material_9.transmission = 1
//ior stands for index of refraction. 
// diamond: 2.417, water 1.333, Air, 1.000293
material_9.ior = 1.5 
material_9.thickness = 0.5

gui.add(material_9, 'transmission').min(0).max(1).step(0.0001)
gui.add(material_9, 'ior').min(1).max(10).step(0.0001)
gui.add(material_9, 'thickness').min(1).max(1).step(.0001)


// const material_9 = new THREE.MeshBasicMaterial({ color: 0X0000ff, wireframe: true })
const mesh_9 = new THREE.Mesh(geometry_9, material_9)

const cube9 = mesh_9

cube9.position.x = -2
cube9.position.y = 5
cube9.position.z = 1

group.add(cube9)

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.x = 7
pointLight.position.y = 7
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Environment map
 */

const rgbeLoader = new RGBELoader()
rgbeLoader.load('/textures/environmentMap/2k.hdr', (environmentMap) =>
{
    // console.log(environmentMap)
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = environmentMap
    scene.environment = environmentMap
})

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