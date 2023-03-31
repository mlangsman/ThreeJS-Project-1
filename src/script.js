import * as THREE from 'three'
import gsap from 'gsap'

const group = new THREE.Group()
const scene = new THREE.Scene()
const axesHelper = new THREE.AxesHelper(2)
//scene.add(axesHelper)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube1.position.set(-1.5,0,0)
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
cube2.position.set(1.5,0,0)
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5,1,1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
cube3.position.set(0,0,0)
group.add(cube3)

group.scale.set(0.5,1.5,1)
group.rotateZ(Math.PI * 0.25)
group.rotateY(Math.PI * 1)
group.rotateX(Math.PI * 0.25)

scene.add(group)


const sizes = {
    width: 800,
    height: 600
}

const canvas = document.querySelector('canvas.webgl')

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100)
camera.position.z = 3
camera.lookAt(group.position)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})

//camera.lookAt(new THREE.Vector3(0,-1,0))

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

    
    const elapsedTime = clock.getElapsedTime()

    // Rotate the group of cubes
    
    group.rotation.y = elapsedTime
    //group.position.y = Math.cos(elapsedTime) * 0.5
    //group.position.x = Math.sin(elapsedTime) * 0.5
    //group.position.z = Math.sin(elapsedTime) * 0.5 -1
    
    camera.position.x = cursor.x
    camera.position.y = cursor.y
    //camera.position.x = Math.cos(elapsedTime) 
    //camera.position.y = Math.sin(elapsedTime) 
    //camera.lookAt(group.position)

    // Render the scene
    renderer.render(scene, camera)

    // Call again on next frame
    window.requestAnimationFrame(tick)
}

tick()




