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
//Overlay
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
// Experience, skills, etc buttons


// This code portion needs to be refractored to be cleaner!!
const torusgeometry = new THREE.TorusGeometry(0.5, 0.25, 4, 10);
const torusmaterial = new THREE.MeshBasicMaterial({ color:'white', wireframe: true });
const torus = new THREE.Mesh(torusgeometry, torusmaterial);
torus.position.set(6.5, 1, 14)
torus.rotation.set(0, 0.8, 0)
scene.add(torus);



const torusgeometry1 = new THREE.TorusGeometry(0.5, 0.25, 4, 10);
const torusmaterial1 = new THREE.MeshBasicMaterial({ color: 'white', wireframe: true });
const torus1 = new THREE.Mesh(torusgeometry1, torusmaterial1);
torus1.position.set(9, 1, 11.4)
torus1.rotation.set(0, 0.75, 0)

scene.add(torus1);
const torusgeometry2 = new THREE.TorusGeometry(0.5, 0.25, 4, 10);
const torusmaterial2 = new THREE.MeshBasicMaterial({ color: 'white', wireframe: true });
const torus2 = new THREE.Mesh(torusgeometry2, torusmaterial2);
torus2.position.set(14.2, 1, 6.1)
torus2.rotation.set(0, 0.75, 0)
scene.add(torus2);
const torusgeometry3 = new THREE.TorusGeometry(0.5, 0.25, 4, 10);
const torusmaterial3 = new THREE.MeshBasicMaterial({ color: 'white', wireframe: true });
const torus3 = new THREE.Mesh(torusgeometry3, torusmaterial3);
torus3.position.set(11.5, 1, 8.8)
torus3.rotation.set(0, 0.75, 0)
scene.add(torus3);
// Category text
const loader = new THREE.FontLoader();
loader.load(
  // resource URL
  './fonts/helvetiker_regular.typeface.json',

  // onLoad callback
  (font)=> {
    const textGeometry=new THREE.TextBufferGeometry(
      "Projects",
      {
        font:font,
        size:0.4,
        height:0.1,
        curveSegments:20,
        bevelEnabled:true,
        bevelThickness:0.015,
        bevelSize:0.02,
        bevelOffset:0,
        bevelSegments:50

      }
    )
    const textMaterial=new THREE.MeshBasicMaterial({color:'black'})
    const text=new THREE.Mesh(textGeometry,textMaterial)
    text.position.set(6.5, 0.2, 15)
    text.rotation.set(0, 0.8, 0)
    scene.add(text);
  }
);
const loader2 = new THREE.FontLoader();
loader2.load(
  // resource URL
  './fonts/helvetiker_regular.typeface.json',

  // onLoad callback
  (font) => {
    const textGeometry2 = new THREE.TextBufferGeometry(
      "Experience",
      {
        font: font,
        size: 0.4,
        height: 0.1,
        curveSegments: 20,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 50

      }
    )
    const textMaterial2 = new THREE.MeshBasicMaterial({ color: 'black' })
    const text2 = new THREE.Mesh(textGeometry2, textMaterial2)
    text2.position.set(11.5, 0.2, 9.8)
    text2.rotation.set(0, 0.8, 0)
    scene.add(text2);
  }
);
const loader1 = new THREE.FontLoader();
loader1.load(
  // resource URL
  './fonts/helvetiker_regular.typeface.json',

  // onLoad callback
  (font) => {
    const textGeometry1 = new THREE.TextBufferGeometry(
      "Skills",
      {
        font: font,
        size: 0.4,
        height: 0.1,
        curveSegments: 20,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 50

      }
    )
    const textMaterial1 = new THREE.MeshBasicMaterial({ color: 'black' })
    const text1 = new THREE.Mesh(textGeometry1, textMaterial1)
    text1.position.set(14.2, 0.2, 7.1)
    text1.rotation.set(0, 0.8, 0)
    scene.add(text1);
  }
);
const loader4 = new THREE.FontLoader();
loader4.load(
  // resource URL
  './fonts/helvetiker_regular.typeface.json',

  // onLoad callback
  (font) => {
    const textGeometry4 = new THREE.TextBufferGeometry(
      "Education",
      {
        font: font,
        size: 0.4,
        height: 0.1,
        curveSegments: 20,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 50

      }
    )
    const textMaterial4 = new THREE.MeshBasicMaterial({ color: 'black' })
    const text4 = new THREE.Mesh(textGeometry4, textMaterial4)
    text4.position.set(9, 0.2, 12.4)
    text4.rotation.set(0, 0.8, 0)
    scene.add(text4);
  }
);
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



  torus.rotation.z+=0.003
  torus1.rotation.z += 0.003
  torus2.rotation.z += 0.003
  torus3.rotation.z += 0.003


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

