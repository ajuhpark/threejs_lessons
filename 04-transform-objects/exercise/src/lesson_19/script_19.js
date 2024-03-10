import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap from 'gsap'
console.log(gsap)
/**
 * Debug
 */
const gui = new GUI()

const parameters = {
    materialColor: '#ffeded',
}

gui
    .addColor(parameters, 'materialColor')
    .onChange(() => {
        material.color.set(parameters.materialColor)
        particlesMaterial.color.set(parameters.materialColor)
    }
        )

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes helper - shows the axes
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

/**
 * Objects
 */

// Texture
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('/textures/lesson_19_textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter // nearest assigns it to nearest color in jpg


// Material
const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
})

// Meshes
const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60), 
    material,
    // material.wireframe = false
    // new THREE.MeshBasicMaterial({
    //     color: '#ff0000',
    //     wireframe: true
    // })
)

const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32), 
    material,
    // material.wireframe = true
)

const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16), 
    material,
    // material.wireframe = true
)

// Creating variable for below
const objectsDistance = 4

// Use this to position the meshes on the y axis
mesh1.position.y = - objectsDistance * 0
mesh2.position.y = - objectsDistance * 1
mesh3.position.y = - objectsDistance * 2

mesh1.position.x = 2
mesh2.position.x = -2
mesh3.position.x = 2

scene.add(mesh1, mesh2, mesh3)

const sectionMeshes = [ mesh1, mesh2, mesh3 ]

/**
 * Particles
 */

// Geometry
const particlesCount = 200
const positions = new Float32Array(particlesCount * 3)

for(let i = 0; i < particlesCount; i++){
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10 // x 
    positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * sectionMeshes.length // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 // z 
}

const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))


//Material
const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor, 
    sizeAttenuation: true, 
    size: 0.03
})

//Points 
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)



/**
 * Lights
 */

const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)


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

// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
// field of view is 35 degrees. Field of view is vertical. 
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera) // now the camera is inside the group


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Scroll
 */

// use a let because you're updating this value.
let scrollY = window.scrollY
let currentSection = 0

window.addEventListener('scroll', () => {
    // console.log('user is scrolling')
    scrollY = window.scrollY
    // console.log(scrollY)

    const newSection = Math.round(scrollY / sizes.height)
    // console.log(newSection)

    if(newSection != currentSection){
        currentSection = newSection
        // console.log('changed', currentSection)

        //gsap
        gsap.to(
            sectionMeshes[currentSection].rotation,
            {
                duration: 1.5, 
                ease: 'power2.inOut',
                x: '+=6',
                y: '+=3',
                z: '+=1.5'

            }
        )
    }
})

/**
 * 
 */

const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) => {
    // console.log(event)

    /** This listens to the mousemove event on window
     * and updates those values. 
     * Then we divide by the width and height of the viewport.
     * Then we subtract 0.5 so it'll be a value from -0.5 to 0.5
     * instead of 0 to 1.
     */
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
    // console.log(cursor)
})



/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
    
    // console.log(deltaTime)

    // Animate camera

    /* negative scrollY because the scrollY values 
    increase but position needs to go down.

    Our scene is going down like 8 units. So when we do 
    a big scroll like 1000 pixels, it goes down very fast.
    So we divide by 'sizes.height' (size of the viewport).
    So that should equal 1 when you get down to bottom of html. 

    Then you multiply it by the objectsDistance which is the units
    between the 4 of them. 
    */
    camera.position.y = - scrollY / sizes.height * objectsDistance

    // creating parallaxX and parallaxY variables and
    // putting them in the camera.
    const parallaxX = cursor.x * 0.3
    const parallaxY = - cursor.y * 0.3
    /* now camera is moving inside the group in code below.
    We're calculating distance from actual position to the destination
    and we'll multiply that by a number like 0.1. So it's adding a 
    tenth every time it moves.
    But also, we're going to change it to * 5 * deltaTime to have it 
    match all screen fps */
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 4 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 4 * deltaTime


    
    // Animate Meshes
    for(const mesh of sectionMeshes){
        mesh.rotation.y += deltaTime * 0.12
        mesh.rotation.x += deltaTime * 0.2
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()