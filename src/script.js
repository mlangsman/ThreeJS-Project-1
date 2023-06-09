import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'lil-gui'

// Debug
const gui = new dat.GUI()

const parameters = {
    color1: 0xff0000,
    color2: 0x00ff00,
    spin: () => {
        gsap.to(cube2.rotation, { duration: 1, y: cube2.rotation.y + Math.PI * 2 })
        gsap.to(cube1.rotation, { duration: 1, y: cube1.rotation.y - Math.PI * 2 })
    }
}


console.log(OrbitControls)

const group = new THREE.Group()
gui.add(group.position, 'y')

const scene = new THREE.Scene()
const axesHelper = new THREE.AxesHelper(2)
//scene.add(axesHelper)

// Add textures

/*
const image = new Image()
const texture = new THREE.Texture(image)
image.addEventListener('load', () => {
    texture.needsUpdate = true
})
image.src = '/door.jpg'
*/

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/Foliage_Lilypads_001_BaseColor.jpg')
texture.minFilter = THREE.NearestFilter


// Create objects

// Cube 1
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    //new THREE.SphereGeometry(0.5,32,32),
    new THREE.MeshBasicMaterial({ color: parameters.color1, wireframe: false})
)
cube1.position.set(-1, 0, 0)
group.add(cube1)

gui.add(cube1.material,'wireframe')

gui
    .addColor(parameters, 'color1')
    .onChange(() => {
        cube1.material.color.set(parameters.color1)
    })

// Cube 2
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: parameters.color2 })
)
cube2.position.set(1, 0, 0)
group.add(cube2)

gui
    .addColor(parameters, 'color2')
    .onChange(() => {
        cube2.material.color.set(parameters.color2)
    })

gui.add(parameters, 'spin')

// Cube3
const cube3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5,32,32),
    new THREE.MeshBasicMaterial({ map: texture, wireframe: false })
)
cube3.position.set(0, 0, 0)
group.add(cube3)

cube2.scale.set(0.5, 1.5, 1)
cube1.scale.set(0.5, 1.5, 1)


// Configure Group
group.rotateZ(Math.PI * 0.25)
group.rotateY(Math.PI * 1)
group.rotateX(Math.PI * 0.25)
scene.add(group)

// Canvas size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Handle resizing the window
window.addEventListener('resize', () => {
    console.log("Window resized")

    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})

// Fullscreen functionality
window.addEventListener('dblclick', () => {
    console.log('Double click')

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement) {
        if(canvas.requestFullscreen) {
            canvas.requestFullscreen() 
        }
        else if(canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    } else {
        if(document.exitFullscreen) {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }

})

const canvas = document.querySelector('canvas.webgl')

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100)
camera.position.z = 3
camera.lookAt(group.position)

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
//controls.target.z = 2
//controls.update()
controls.enableDamping = true
controls.autoRotate = true


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()

/*
    gsap.to(group.position,{
        duration: 1,
        delay: 1,
        x: 2
    })
*/

// Cursor
const cursor = {
    x: 0,
    y: 0
}

// Detect for the mouse moving
window.addEventListener('mousemove', (event) => {

    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)

    console.log(cursor.x, cursor.y)

})


const tick = () => {

    controls.update()
    const elapsedTime = clock.getElapsedTime()

    // Rotate the group of cubes

    //group.rotation.y = elapsedTime * 0.1
    //group.position.y = Math.cos(elapsedTime) * 0.5
    //group.position.x = Math.sin(elapsedTime) * 0.5
    //group.position.z = Math.sin(elapsedTime) * 0.5 -1

    // Render the scene
    renderer.render(scene, camera)

    // Call again on next frame
    window.requestAnimationFrame(tick)
}

tick()




