import * as THREE from 'three'
import { Vector3 } from 'three'
import { Scene } from 'three'

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

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})

//camera.lookAt(new THREE.Vector3(0,-1,0))

renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    // Rotate the group of cubes
    group.rotation.y = elapsedTime
    group.position.y = Math.cos(elapsedTime) * 0.5
    group.position.x = Math.sin(elapsedTime) * 0.5
    group.position.z = Math.sin(elapsedTime) * 0.5 -1

    // Render the scene
    renderer.render(scene, camera)

    // Call again on next frame
    window.requestAnimationFrame(tick)
}

tick()


