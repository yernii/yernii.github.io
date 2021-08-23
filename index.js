import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

// import * as dat from 'dat.gui'
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()
//Fog
const fog = new THREE.Fog("#262837", 1, 90);

scene.fog = fog
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

//Group
const fullFrame = new THREE.Group();
scene.add(fullFrame);

const box = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1.5, 1.5, 1.5),
  new THREE.MeshStandardMaterial({ color: '#ac8e82' })
)
box.position.x = 12
box.position.y = 3;
box.position.z = -2;
scene.add(box)

const box1 = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1.5, 1.5, 1.5),
  new THREE.MeshStandardMaterial({ color: "#ac8e82" })
);
box1.position.x = 1;
box1.position.y = 3;
box1.position.z = 11;
scene.add(box1);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: '#a9c388' })
)
floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

// Particles
const particlesGeometry=new THREE.BufferGeometry()
const count=50000

const positions=new Float32Array(count*3)
for (let i=0; i<count*3;i++){
  positions[i]=(Math.random()-0.5)*100
}
particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions,3)
)
const particlesMaterial=new THREE.PointsMaterial({
  size:0.08,
  sizeAttenuation:true,
  color:'white'
})

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)
//Overlay needs to be finished
const overlayGeometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    // wireframe: true,
    transparent: true,
    uniforms:
    {
        uAlpha: { value: 1 }
    },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})


//Rectangle as a frame 
const texturePainting = new THREE.TextureLoader().load(
  "./2.jpeg"
);
const materialPainting = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  map: texturePainting,
});
const frame = new THREE.PlaneGeometry(15, 10);
const frameMesh = new THREE.Mesh(frame, materialPainting);
frameMesh.position.set(1, 5, -1);
frameMesh.rotation.y = Math.PI / 4;
fullFrame.add(frameMesh);

const backframe = new THREE.Mesh(
  new THREE.PlaneGeometry(16, 12),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
  })
);
backframe.position.set(0.9, 5, -1);
backframe.rotation.y = Math.PI / 4;
fullFrame.add(backframe);
fullFrame.position.set(-1, 0, 0)
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
moonLight.position.set(4, 5, - 2)
// gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
// gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

//Box light
const boxlight = new THREE.PointLight('#ff7d46', 1, 30)
boxlight.position.set(1, 3, 4)
scene.add(boxlight)

// Ghost

const ghost1 = new THREE.PointLight('#ff00ff', 3, 3)
ghost1.castShadow = true
ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7
scene.add(ghost1)


/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
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
camera.position.x = 12
camera.position.y = 3
camera.position.z = 12

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.enablePan=true

//Camera view limits
controls.minPolarAngle = 0.2; // radians
controls.maxPolarAngle = Math.PI / 2.1; // radians
controls.minDistance = 10;
controls.maxDistance = 40;

controls.minAzimuthAngle = Math.PI / 30;
controls.maxAzimuthAngle = Math.PI / 2;


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor("#262837");

/**
 * Animate
 */
const clock = new THREE.Clock()
const flag = true
const tick = () => {
  if (flag == true) {
    camera.position.x += 0.004;
  }
  const elapsedTime = clock.getElapsedTime();





  box.rotation.y += 0.02
  box.rotation.z += 0.02;

  box1.rotation.y += 0.02;
  box1.rotation.z += 0.02;

  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 6;
  ghost1.position.z = Math.sin(ghost1Angle) * 6;
  ghost1.position.y = Math.sin(elapsedTime * 4);


  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
