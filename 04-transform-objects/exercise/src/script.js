import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'

/** 
 * Debug - instantiating lil-gui so we can use the dependency
 */
const gui = new GUI({
    // width: 280,
    title: 'Nice debug UI',
    closeFolders: false, 

})
// gui.close()
gui.hide()

// adding a toggle to hide, unhide debug
window.addEventListener('keydown', () =>
{
    if(event.key == 'h')
        gui.show(gui._hidden)
})
const debugObject = {}

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
debugObject.color = '#33E133'

const group = new THREE.Group()
// group.position.y = 0
group.position.x = 1.5
group.position.y = 1.5
group.position.z = 3


group.scale.y = 1
group.rotation.y = 0

scene.add(group)

/* One way of doing Arrays
const positionsArray = new Float32Array(9)

positionsArray[0] = 0
positionsArray[1] = 0
positionsArray[2] = 0

positionsArray[3] = 0
positionsArray[4] = 1
positionsArray[5] = 0

positionsArray[6] = 1
positionsArray[7] = 0
positionsArray[8] = 0
*/

/*another way to do array
const positionsArray = new Float32Array([
    0, 0, 0,
    0, 1, 0, 
    1, 0, 0
])
*/

const geometry = new THREE.BufferGeometry()
const count = 50
const positionsArray = new Float32Array(count * 3 * 3)

// filling the array with random values
for(let i = 0; i < count * 3 * 3; i++){
    positionsArray[i] = (Math.random() - 0.5) * 1.5
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)



const cube1 = new THREE.Mesh(
    // new THREE.BoxGeometry(1, 1, 1),
    // putting the new geometry var for the array here.
    geometry,
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true})
)
group.add(cube1)

const geometry_1 = new THREE.BoxGeometry(1, 1, 1)
const material_1 = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
const mesh_1 = new THREE.Mesh(geometry_1, material_1)

const cube2 = mesh_1
// const cube2 = new THREE.Mesh(
//     // new THREE.BoxGeometry(1, 1, 1),
//     geometry_1, 
//     // new THREE.MeshBasicMaterial({ color: 0X00ff00, wireframe: true})
//     material_1
// )
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

const cubeTweaks = gui.addFolder('Awesome cube')
// cubeTweaks.close()


// Adding gui
// gui.add(group.position, 'y', - 3, 3, 0.01)
cubeTweaks
    .add(group.position, 'y')
    .min(- 3)
    .max(3)
    .step(0.01)
    .name('elevation')

/*
lil-gui can only modify properties, not variables.
So you wouldn't be able to update a variable like below
let myVariable = 1337
gui.add(myVariable, '??')

But you can use some tricks to do so, such as creating 
an object whose purpose is to hold properties for 
lil-gui to be used on the object like below:

const myObject = {
    myVariable: 1337
}
gui.add(myObject, 'myVariable')
*/

cubeTweaks.add(group, 'visible')
cubeTweaks.add(material_1, 'wireframe')

cubeTweaks
    .addColor(material_1, 'color')
    .onChange(() => {
        // console.log(value.getHexString())
        material_1.color.set(debugObject.color)
        console.log(debugObject.color)
    })

debugObject.spin = () =>
{
    gsap.to(mesh_1.rotation, { y: mesh_1.rotation.y + Math.PI * 2 })
}
cubeTweaks.add(debugObject, 'spin')


debugObject.subdivision = 2
cubeTweaks
    .add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(() => 
    {
        // console.log('subdivision finished changing')
        mesh_1.geometry = new THREE.BoxGeometry(
            1, 1, 1, 
            debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
        )
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
    // console.log('window has been resized')

    // Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    // setting the pixel ratio here
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    /* For Safari, we need to use prefixed versions to make it work for 
    document.fullscreenElement, canvas.requestFullscreen, and 
    document.exitFullscreen*/
    if(!fullscreenElement){
        if(canvas.requestFullscreen){
            canvas.requestFullscreen()
            // console.log('go fullscreen')
        }
        else if (canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    } 
    else{
        if (document.exitFullscreen){
            document.exitFullscreen()
        }
        else if (document.webkitFullscreenElement)
        {
            document.exitFullscreen()
            // console.log('leave fullscreen')
        }
    }
})

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
// controls.enabled = false 
controls.enableDamping = true
// controls.target.y = 2
// controls.update()

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
/*the below sets the pixel ratio to the device pixel ratio.
Mine is 2. We're also setting a min so it doesn't go above 2.
Math.min parameters returns the smaller of the two*/
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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