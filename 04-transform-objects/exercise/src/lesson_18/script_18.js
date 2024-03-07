import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes helper - shows the axes
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

/**
 * Test cube
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube)

/**
 * Galaxy
 */
const parameters = {}
parameters.count = 100000
parameters.size = 0.01
parameters.radius = 5
parameters.branches = 4
parameters.spin = 1
parameters.randomness = 0.2
parameters.randomnessPower = 3
parameters.insideColor = '#c18b7b'
parameters.outsideColor = '#1b3984'


// this is so the points will clear when you change them in gui
// effects are in the function.
let geometry = null
let material = null 
let points = null 

const generateGalaxy = () => {
    // console.log('generate the galaxy')

    /**
     * Erase old galaxy
     */
    if(points !== null)
    {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    /**
     * Geometry
     */
    geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    for(let i = 0; i < parameters.count; i++){
        const i3 = i * 3

        //Position

        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin // we want particles closer to center to have less spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1)
        /** Math.random() < 0.5 ? 1 : -1
         * That part above is so we can also get negative values. 
         * If the random value is less than 0.5, we get 1. If not, we get -1. 
         * It's multiplied by 1 or -1.
         */
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1)


        
        // const randomX = (Math.random() - 0.5) * parameters.randomness * radius
        // const randomY = (Math.random() - 0.5) * parameters.randomness * radius
        // const randomZ = (Math.random() - 0.5) * parameters.randomness * radius




        // if(i < 20){
        //     console.log(i, branchAngle)
        // }

        positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX// for x 
        positions[i3 + 1] = 0 + randomY // for y
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ// for z 

        // positions[i3 + 1] = (Math.random() - 0.5) * 3 // for y
        // positions[i3 + 2] = (Math.random() - 0.5) * 3 // for z 
        // positions[i3 + 0] = (Math.random() - 0.5) * 3 // for x 

        // Color 
        const mixedColor = colorInside.clone() //cloning creates a new instance of without changing mixedColor
        mixedColor.lerp(colorOutside, radius / parameters.radius)

        colors[i3 + 0] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b

    }
    // console.log(positions)

    geometry.setAttribute(
        'position', 
        new THREE.BufferAttribute(positions, 3) // 3 specifies how many values per vertex
    )

    geometry.setAttribute(
        'color', 
        new THREE.BufferAttribute(colors, 3) // 3 specifies rgb
    )

    /**
     * Material
     */
    material = new THREE.PointsMaterial({
        size: parameters.size, 
        sizeAttenuation: true,
        depthWrite: false, 
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })

    /**
     * Points
     */
    points = new THREE.Points(geometry, material)
    scene.add(points)


}

generateGalaxy()

/**
 * GUI
 */
gui.add(parameters, 'count').min(100).max(100000).step(100).onFinishChange(generateGalaxy)
gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.0001).onFinishChange(generateGalaxy)
gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)


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
camera.position.z = 3
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