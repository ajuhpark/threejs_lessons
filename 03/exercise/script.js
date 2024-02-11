import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')
console.log(canvas)

// Scene
const scene = new THREE.Scene()

// Object 
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000}) //can add wireframe: true after color to get the cube wireframe.
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


//Sizes
const size = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 3 //this is moving us back on the z axis
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(size.width, size.height)

//asking renderer to take a picture from scene point of view
renderer.render(scene,camera)


