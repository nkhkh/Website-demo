import * as THREE from "https://unpkg.com/three@0.125.2/build/three.module.js";
import { gsap } from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";
import { GLTFLoader } from "https://unpkg.com/three@0.125.2/examples/jsm/loaders/GLTFLoader.js";

gsap.registerPlugin(ScrollTrigger);

let stb = false;
// --- CONSTS

const COLORS = {
  background: "white",
  light: "#ffffff",
  sky: "#aaaaff",
  ground: "#002444",
};

let size = { width: 0, height: 0 };

// --- SCENES (All three.js scenes)
let scenes = {
  one: new THREE.Scene(),
  two: new THREE.Scene(),
  three: new THREE.Scene(),
  four: new THREE.Scene(),
  five: new THREE.Scene(),
};

// --- SCENES BACKGROUND
scenes.one.background = new THREE.Color(COLORS.background);
scenes.two.background = new THREE.Color("black");
scenes.three.background = new THREE.Color("black");
scenes.four.background = new THREE.Color("black");
scenes.five.background = new THREE.Color("black");

//---VIEWS (All three.js views whose job is to cover the screen when needed of the scene and each scene should be related to a section in HTML)
const views = [
  { height: 1, bottom: 0, scene: scenes.one, camera: null },
  { height: 0, bottom: 0, scene: scenes.two, camera: null },
  { height: 0, bottom: 0, scene: scenes.three, camera: null },
  { height: 0, bottom: 0, scene: scenes.four, camera: null },
  { height: 0, bottom: 0, scene: scenes.five, camera: null },
];

// --- RENDERER
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const container = document.querySelector(".canvas-container");
container.appendChild(renderer.domElement);

// --- CAMERAS (For each scene, there is a camera)
views.forEach((view) => {
  view.camera = new THREE.PerspectiveCamera(
    50,
    size.width / size.height,
    0.1,
    1000
  );
  view.camera.position.set(0, 0, 10);
  view.camera.lookAt(new THREE.Vector3(0, 0, 0));
  view.scene.add(view.camera);
});
views[2].camera.position.set(0, 0, 4);

// --- LIGHTS (For each scene, there is a light)
const light = new THREE.PointLight("#189AFF", 1500, 10, 4);
light.position.set(0, 0, -1);
light.castShadow = true;
scenes.one.add(light);

const l = new THREE.PointLight("#CFD6FF", 4, 10, 0);
l.position.set(-1, 0, 4);
l.castShadow = true;
scenes.one.add(l);

const ll = new THREE.PointLight("#15C1FF", 1, 12, 1);
ll.position.set(2, 0, 5);
ll.castShadow = true;
scenes.two.add(ll);

const lightl = new THREE.PointLight("#FF4C07", 1, 10, 5);
lightl.position.set(0, 1, -0.5);
lightl.castShadow = true;
lightl.power = 15;
scenes.two.add(lightl);

const lll = new THREE.PointLight("#15C1FF", 1, 12, 1);
lll.position.set(2, 0, 5);
lll.castShadow = true;
scenes.three.add(lll);

const lightll = new THREE.PointLight("#FF4C07", 1, 10, 5);
lightll.position.set(0, 1, -0.5);
lightll.castShadow = true;
lightll.power = 15;
scenes.three.add(lightll);

const lightlll = new THREE.DirectionalLight("white", 0.009);
lightlll.position.set(0, 0, 10);
scenes.four.add(lightlll);

const lightllll = new THREE.PointLight("#f9913d", 1, 0, -1);
lightllll.position.set(0, 0, -5);
scenes.four.add(lightllll);

const directionalLight = new THREE.PointLight("white", 2);
directionalLight.position.set(-3, 1.5, 10);
scenes.five.add(directionalLight);

const lightT = new THREE.PointLight("#189AFF", 1500, 10, 4);
lightT.position.set(0, 0, -1);
lightT.castShadow = true;
scenes.five.add(lightT);

const lT = new THREE.PointLight("#CFD6FF", 5, 10, 0);
lT.position.set(1, 0.5, 4);
lT.castShadow = true;
scenes.five.add(lT);

// --- PLANE (For scene one)

const plane = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshStandardMaterial({ color: "white" });
const floor = new THREE.Mesh(plane, floorMaterial);
floor.receiveShadow = true;
floor.position.set(0, 0, -3);
floor.receiveShadow = true;
floor.castShadow = true;
scenes.one.add(floor);

// --- SECOND PLANE (For scene one)
const pl = new THREE.PlaneGeometry(100, 100);
const f = new THREE.MeshStandardMaterial({ color: "black" });
const fl = new THREE.Mesh(pl, f);
fl.receiveShadow = true;
fl.position.set(0, 0, -3);
fl.receiveShadow = true;
fl.castShadow = true;
gsap.set(fl.position, { y: -100 });
scenes.one.add(fl);

//--- THIRD PLANE (For scene five)

const pll = new THREE.PlaneGeometry(100, 100);
const fTT = new THREE.MeshStandardMaterial({ color: "black" });
const fll = new THREE.Mesh(pll, fTT);
fll.receiveShadow = true;
fll.position.set(0, 0, -3);
fll.castShadow = true;
scenes.five.add(fll);

// --- ON RESIZE (resize function to make the canvas responsive)
const onResize = () => {
  if (window.innerWidth > window.innerHeight) {
    container.style.width = window.outerWidth + "px";
    container.style.height = window.outerHeight + "px";
  } else {
    container.style.width = window.outerWidth + "px";
    container.style.height = window.outerHeight + "px";
  }
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  views.forEach((view) => {
    view.camera.aspect = size.width / size.height;
    view.camera.updateProjectionMatrix();
  });
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};
window.addEventListener("resize", onResize);
onResize();

//--- OBJECTS (All objects that were needed for all scenes in one array to make it easier for access)
let object = [
  {
    name: "eight",
    group: new THREE.Group(),
    file: "assets/8.glb",
  },
  {
    name: "apple",
    group: new THREE.Group(),
    file: "assets/appleg.glb",
  },
  {
    name: "bird",
    group: new THREE.Group(),
    file: "assets/birda.glb",
  },
  {
    name: "door",
    group: new THREE.Group(),
    file: "assets/door.glb",
  },
  {
    name: "eye",
    group: new THREE.Group(),
    file: "assets/eye.glb",
  },
  {
    name: "fish",
    group: new THREE.Group(),
    file: "assets/bh.glb",
  },
  {
    name: "trumpet",
    group: new THREE.Group(),
    file: "assets/trumpet.glb",
  },
  {
    name: "umbrella",
    group: new THREE.Group(),
    file: "assets/umbrella.glb",
  },
  {
    name: "seight",
    group: new THREE.Group(),
    file: "assets/80.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "beight",
    group: new THREE.Group(),
    file: "assets/81.glb",
  },
  {
    name: "manequin1",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "logo",
    group: new THREE.Group(),
    file: "assets/logo.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
  {
    name: "manequin",
    group: new THREE.Group(),
    file: "assets/manequin.glb",
  },
];

// ---- LOADING OBJECTS (Loadung manager for all objects to make loading corrolated to the animation and not create any lag)
const loadingManager = new THREE.LoadingManager(() => {
  setupAnimation();
});

//--- LOADER
let models = {};
let loader = new GLTFLoader(loadingManager);
let clones = {};
loader.load(object[0].file, (gltf) => {
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  const objects = gltf.scene;
  objects.position.set(0, -0.05, -5);
  object[0].group.add(objects);
  models[object[0].name] = object[0].group;
  scenes.one.add(object[0].group);
});

loader.load(object[10].file, (gltf) => {
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  const objects = gltf.scene;
  objects.position.set(0, 0, 0);
  object[10].group.add(objects);
  models[object[10].name] = object[0].group;
  scenes.four.add(object[10].group);
});
loader.load(object[1].file, (gltf) => {
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  const objects = gltf.scene;
  objects.position.set(0, 0, 1);
  gsap.set(object[1].group.position, { y: -10 });
  object[1].group.add(objects);
  models[object[1].name] = object[1].group;
  scenes.one.add(object[1].group);
});

loader.load(object[2].file, (gltf) => {
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  const objects = gltf.scene;
  objects.position.set(0.4, -1, 1);
  object[2].group.add(objects);
  gsap.set(object[2].group.position, { y: -10 });
  models[object[2].name] = object[2].group;
  scenes.one.add(object[2].group);
});

loader.load(object[3].file, (gltf) => {
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  const objects = gltf.scene;
  objects.position.set(0, 0, 4);
  gsap.set(object[3].group.position, { y: -10 });
  objects.material = new THREE.MeshStandardMaterial({ color: "white" });
  object[3].group.add(objects);
  models[object[3].name] = object[3].group;
  scenes.one.add(object[3].group);
});
loader.load(object[4].file, (gltf) => {
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  const objects = gltf.scene;
  objects.scale.set(0.9, 0.9, 0.9);
  gsap.set(object[4].group.scale, { x: 0, y: 0, z: 0 });
  objects.position.set(0, 0, 0);
  object[4].group.add(objects);
  models[object[4].name] = object[4].group;
  scenes.one.add(object[4].group);
});
loader.load(object[5].file, (gltf) => {
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  const objects = gltf.scene;
  objects.scale.set(0.5, 0.5, 0.5);
  gsap.set(object[5].group.position, { y: -10 });
  objects.position.set(2, -1.5, 1);
  object[5].group.add(objects);
  models[object[5].name] = object[5].group;
  scenes.one.add(object[5].group);
});
loader.load(object[6].file, (gltf) => {
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  const objects = gltf.scene;
  objects.position.set(2, 3, 5);
  gsap.set(object[6].group.position, { y: -10 });
  object[6].group.add(objects);
  models[object[6].name] = object[6].group;
  scenes.one.add(object[6].group);
});
loader.load(object[7].file, (gltf) => {
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  const objects = gltf.scene;
  objects.position.set(0, 0, 1);
  gsap.set(object[7].group.position, { y: -10 });
  object[7].group.add(objects);
  models[object[7].name] = object[7].group;
  scenes.one.add(object[7].group);
});

loader.load(object[8].file, (gltf) => {
  const objects = gltf.scene;
  objects.position.set(0, 0, 0);
  objects.scale.set(0.5, 0.5, 0.5);
  object[8].group.add(objects);
  models[object[8].name] = object[8].group;
  scenes.two.add(object[8].group);
  let clone = object[8].group.clone();
  clones[object[8].name] = clone;
  scenes.three.add(clone);
});

loader.load(object[9].file, (gltf) => {
  const objects = gltf.scene;
  object[9].group.add(objects);
  object[9].group.position.set(-6.5, 2, 1);
  models[object[9].name] = object[9].group;
  scenes.four.add(object[9].group);
});

loader.load(object[39].file, (gltf) => {
  const objects = gltf.scene;
  object[39].group.add(objects);
  object[39].group.position.set(-6.5, 2, 5);
  models[object[39].name] = object[39].group;
  scenes.four.add(object[39].group);
});

loader.load(object[11].file, (gltf) => {
  const objects = gltf.scene;
  object[11].group.add(objects);
  object[11].group.position.set(-6.5, 2, -3);
  models[object[11].name] = object[11].group;
  scenes.four.add(object[11].group);
});

loader.load(object[12].file, (gltf) => {
  const objects = gltf.scene;
  object[12].group.add(objects);
  object[12].group.position.set(-6.5, -2, 1);
  models[object[12].name] = object[12].group;
  scenes.four.add(object[12].group);
});

loader.load(object[40].file, (gltf) => {
  const objects = gltf.scene;
  object[40].group.add(objects);
  object[40].group.position.set(-6.5, -2, 5);
  models[object[40].name] = object[12].group;
  scenes.four.add(object[40].group);
});

loader.load(object[13].file, (gltf) => {
  const objects = gltf.scene;
  object[13].group.add(objects);
  object[13].group.position.set(-6.5, -2, -3);
  models[object[13].name] = object[13].group;
  scenes.four.add(object[13].group);
});

loader.load(object[14].file, (gltf) => {
  const objects = gltf.scene;
  object[14].group.add(objects);
  object[14].group.position.set(-4.5, 0, 1);
  models[object[14].name] = object[14].group;
  scenes.four.add(object[14].group);
});

loader.load(object[41].file, (gltf) => {
  const objects = gltf.scene;
  object[41].group.add(objects);
  object[41].group.position.set(-4.5, 0, 5);
  models[object[41].name] = object[41].group;
  scenes.four.add(object[41].group);
});

loader.load(object[15].file, (gltf) => {
  const objects = gltf.scene;
  object[15].group.add(objects);
  object[15].group.position.set(-4.5, 0, -3);
  models[object[15].name] = object[15].group;
  scenes.four.add(object[15].group);
});

loader.load(object[16].file, (gltf) => {
  const objects = gltf.scene;
  object[16].group.add(objects);
  object[16].group.position.set(-4.5, -4, 1);
  models[object[16].name] = object[16].group;
  scenes.four.add(object[16].group);
});

loader.load(object[42].file, (gltf) => {
  const objects = gltf.scene;
  object[42].group.add(objects);
  object[42].group.position.set(-4.5, -4, 5);
  models[object[42].name] = object[42].group;
  scenes.four.add(object[42].group);
});

loader.load(object[17].file, (gltf) => {
  const objects = gltf.scene;
  object[17].group.add(objects);
  object[17].group.position.set(-4.5, -4, -3);
  models[object[17].name] = object[17].group;
  scenes.four.add(object[17].group);
});

loader.load(object[18].file, (gltf) => {
  const objects = gltf.scene;
  object[18].group.add(objects);
  object[18].group.position.set(-2.5, 2, 1);
  models[object[18].name] = object[18].group;
  scenes.four.add(object[18].group);
});

loader.load(object[43].file, (gltf) => {
  const objects = gltf.scene;
  object[43].group.add(objects);
  object[43].group.position.set(-2.5, 2, 5);
  models[object[43].name] = object[43].group;
  scenes.four.add(object[43].group);
});

loader.load(object[19].file, (gltf) => {
  const objects = gltf.scene;
  object[19].group.add(objects);
  object[19].group.position.set(-2.5, 2, -3);
  models[object[19].name] = object[19].group;
  scenes.four.add(object[19].group);
});

loader.load(object[20].file, (gltf) => {
  const objects = gltf.scene;
  object[20].group.add(objects);
  object[20].group.position.set(-2.5, -2, 1);
  models[object[20].name] = object[20].group;
  scenes.four.add(object[20].group);
});

loader.load(object[44].file, (gltf) => {
  const objects = gltf.scene;
  object[44].group.add(objects);
  object[44].group.position.set(-2.5, -2, 5);
  models[object[44].name] = object[44].group;
  scenes.four.add(object[44].group);
});

loader.load(object[21].file, (gltf) => {
  const objects = gltf.scene;
  object[21].group.add(objects);
  object[21].group.position.set(-2.5, -2, -3);
  models[object[21].name] = object[21].group;
  scenes.four.add(object[21].group);
});

loader.load(object[22].file, (gltf) => {
  const objects = gltf.scene;
  object[22].group.add(objects);
  object[22].group.position.set(-0.5, 3, 1);
  models[object[22].name] = object[22].group;
  scenes.four.add(object[22].group);
});

loader.load(object[45].file, (gltf) => {
  const objects = gltf.scene;
  object[45].group.add(objects);
  object[45].group.position.set(-0.5, 3, 5);
  models[object[45].name] = object[45].group;
  scenes.four.add(object[45].group);
});

loader.load(object[23].file, (gltf) => {
  const objects = gltf.scene;
  object[23].group.add(objects);
  object[23].group.position.set(-0.5, 3, -3);
  models[object[23].name] = object[23].group;
  scenes.four.add(object[23].group);
});

loader.load(object[24].file, (gltf) => {
  const objects = gltf.scene;
  object[24].group.add(objects);
  object[24].group.position.set(-0.5, -4, 1);
  models[object[24].name] = object[24].group;
  scenes.four.add(object[24].group);
});

loader.load(object[46].file, (gltf) => {
  const objects = gltf.scene;
  object[46].group.add(objects);
  object[46].group.position.set(-0.5, -4, 5);
  models[object[46].name] = object[46].group;
  scenes.four.add(object[46].group);
});

loader.load(object[25].file, (gltf) => {
  const objects = gltf.scene;
  object[25].group.add(objects);
  object[25].group.position.set(-0.5, -4, -3);
  models[object[25].name] = object[25].group;
  scenes.four.add(object[25].group);
});

loader.load(object[26].file, (gltf) => {
  const objects = gltf.scene;
  object[26].group.add(objects);
  object[26].group.position.set(1.5, 2, 1);
  models[object[26].name] = object[26].group;
  scenes.four.add(object[26].group);
});

loader.load(object[47].file, (gltf) => {
  const objects = gltf.scene;
  object[47].group.add(objects);
  object[47].group.position.set(1.5, 2, 5);
  models[object[47].name] = object[47].group;
  scenes.four.add(object[47].group);
});

loader.load(object[27].file, (gltf) => {
  const objects = gltf.scene;
  object[27].group.add(objects);
  object[27].group.position.set(1.5, 2, -3);
  models[object[27].name] = object[27].group;
  scenes.four.add(object[27].group);
});

loader.load(object[28].file, (gltf) => {
  const objects = gltf.scene;
  object[28].group.add(objects);
  object[28].group.position.set(1.5, -2, 1);
  models[object[28].name] = object[28].group;
  scenes.four.add(object[28].group);
});

loader.load(object[48].file, (gltf) => {
  const objects = gltf.scene;
  object[48].group.add(objects);
  object[48].group.position.set(1.5, -2, 5);
  models[object[48].name] = object[48].group;
  scenes.four.add(object[48].group);
});

loader.load(object[29].file, (gltf) => {
  const objects = gltf.scene;
  object[29].group.add(objects);
  object[29].group.position.set(1.5, -2, -3);
  models[object[29].name] = object[29].group;
  scenes.four.add(object[29].group);
});

loader.load(object[30].file, (gltf) => {
  const objects = gltf.scene;
  object[30].group.add(objects);
  object[30].group.position.set(3.5, 0, 1);
  models[object[30].name] = object[30].group;
  scenes.four.add(object[30].group);
});

loader.load(object[49].file, (gltf) => {
  const objects = gltf.scene;
  object[49].group.add(objects);
  object[49].group.position.set(3.5, 0, 5);
  models[object[49].name] = object[49].group;
  scenes.four.add(object[49].group);
});

loader.load(object[31].file, (gltf) => {
  const objects = gltf.scene;
  object[31].group.add(objects);
  object[31].group.position.set(3.5, 0, -3);
  models[object[31].name] = object[31].group;
  scenes.four.add(object[31].group);
});

loader.load(object[32].file, (gltf) => {
  const objects = gltf.scene;
  object[32].group.add(objects);
  object[32].group.position.set(3.5, -4, 1);
  models[object[32].name] = object[32].group;
  scenes.four.add(object[32].group);
});

loader.load(object[50].file, (gltf) => {
  const objects = gltf.scene;
  object[50].group.add(objects);
  object[50].group.position.set(3.5, -4, 5);
  models[object[50].name] = object[50].group;
  scenes.four.add(object[50].group);
});

loader.load(object[33].file, (gltf) => {
  const objects = gltf.scene;
  object[33].group.add(objects);
  object[33].group.position.set(3.5, -4, -3);
  models[object[33].name] = object[33].group;
  scenes.four.add(object[33].group);
});

loader.load(object[34].file, (gltf) => {
  const objects = gltf.scene;
  object[34].group.add(objects);
  object[34].group.position.set(5.5, 2, 1);
  models[object[34].name] = object[34].group;
  scenes.four.add(object[34].group);
});

loader.load(object[51].file, (gltf) => {
  const objects = gltf.scene;
  object[51].group.add(objects);
  object[51].group.position.set(5.5, 2, 5);
  models[object[51].name] = object[51].group;
  scenes.four.add(object[51].group);
});

loader.load(object[35].file, (gltf) => {
  const objects = gltf.scene;
  object[35].group.add(objects);
  object[35].group.position.set(5.5, 2, -3);
  models[object[35].name] = object[35].group;
  scenes.four.add(object[35].group);
});

loader.load(object[36].file, (gltf) => {
  const objects = gltf.scene;
  object[36].group.add(objects);
  object[36].group.position.set(5.5, -2, 1);
  models[object[36].name] = object[36].group;
  scenes.four.add(object[36].group);
});

loader.load(object[52].file, (gltf) => {
  const objects = gltf.scene;
  object[52].group.add(objects);
  object[52].group.position.set(5.5, -2, 5);
  models[object[52].name] = object[52].group;
  scenes.four.add(object[52].group);
});

loader.load(object[37].file, (gltf) => {
  const objects = gltf.scene;
  object[37].group.add(objects);
  object[37].group.position.set(5.5, -2, -3);
  models[object[37].name] = object[37].group;
  scenes.four.add(object[37].group);
});
loader.load(object[38].file, (gltf) => {
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  const objects = gltf.scene;
  objects.scale.set(2, 2, 2);
  object[38].group.add(objects);
  models[object[38].name] = object[38].group;
  scenes.five.add(object[38].group);
});
views[1].camera.position.set(0, 0, 4);
views[3].camera.position.set(0, 0, 8);
views[4].camera.position.set(0, 0, 5);

//--- ONMOUSE MOVE FUNCTION (this function detectes mouse coordination and lets you do whatever you want in correspondance to it)
var p = new THREE.Plane(new THREE.Vector3(0, 0, 10), 0);
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
var intersectPoint = new THREE.Vector3(); //for reuse
function onmousemove(event) {
  //get mouse coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, views[0].camera); //set raycaster
  raycaster.ray.intersectPlane(p, intersectPoint); // find the point of intersection
  object[4].group.rotation.y = intersectPoint.x / 10;
  object[4].group.rotation.x = -intersectPoint.y / 10;

  object[1].group.rotation.y = intersectPoint.x / 100;
  object[1].group.rotation.x = -intersectPoint.y / 100;

  object[2].group.rotation.y = intersectPoint.x / 100;
  object[2].group.rotation.x = -intersectPoint.y / 100;

  object[3].group.rotation.y = intersectPoint.x / 100;
  object[3].group.rotation.x = -intersectPoint.y / 100;

  object[5].group.rotation.y = intersectPoint.x / 101;
  object[5].group.rotation.x = -intersectPoint.y / 100;

  object[6].group.rotation.y = intersectPoint.x / 101;
  object[6].group.rotation.x = -intersectPoint.y / 100;

  object[7].group.rotation.y = intersectPoint.x / 101;
  object[7].group.rotation.x = -intersectPoint.y / 100;
}
window.addEventListener("mousemove", onmousemove, false);

//---Mouse light
var pa = new THREE.Plane(new THREE.Vector3(0, 0, 10), 0);
let ray = new THREE.Raycaster();
let mous = new THREE.Vector2();
var IP = new THREE.Vector3(); //for reuse
function OMM(event) {
  //get mouse coordinates
  mous.x = (event.clientX / window.innerWidth) * 2 - 1;
  mous.y = -(event.clientY / window.innerHeight) * 2 + 1;

  ray.setFromCamera(mous, views[1].camera); //set raycaster
  ray.ray.intersectPlane(pa, IP); // find the point of intersection
  lightl.position.set(-IP.x, IP.y, -0.5); // set the light position
}
window.addEventListener("mousemove", OMM, false);

//---Srcond eight movement
var p = new THREE.Plane(new THREE.Vector3(0, 0, 10), 0);
let ra = new THREE.Raycaster();
let mou = new THREE.Vector2();
var I = new THREE.Vector3(); //for reuse
function OMMM(event) {
  if (stb) {
    //get mouse coordinates
    mou.x = (event.clientX / window.innerWidth) * 2 - 1;
    mou.y = -(event.clientY / window.innerHeight) * 2 + 1;

    ra.setFromCamera(mou, views[2].camera); //set raycaster
    ra.ray.intersectPlane(p, I); // find the point of intersection
    clones[object[8].name].rotation.z = I.x + 10;
  }
}
window.addEventListener("mousemove", OMMM, false);

// ---FIRST ANIMATION, NEXT TRASITIONS TO SCROLL TRIGGER ANIMATIONS
const setupAnimation = () => {
  gsap.to(object[0].group.position, { duration: 2, z: 5 });
  gsap.to(floor.position, { duration: 5.5, y: 100 });
  gsap.to(fl.position, { duration: 5.5, y: 0 });
  setTimeout(() => {
    gsap.to(object[1].group.position, { duration: 2, y: 0, ease: "back" });
    gsap.to(object[2].group.position, { duration: 2.5, y: 0, ease: "back" });
    gsap.to(object[3].group.position, { duration: 3, y: 0, ease: "back" });
    gsap.to(object[5].group.position, { duration: 3.5, y: 0, ease: "back" });
    gsap.to(object[6].group.position, { duration: 4, y: 0, ease: "back" });
    gsap.to(object[7].group.position, { duration: 4.5, y: 0, ease: "back" });
    gsap.to(object[4].group.scale, { duration: 1, x: 1, y: 1, z: 1 });
  }, 2000);
  ScrollTrigger.matchMedia({
    "(prefers-reduced-motion: no-preference)": desktopAnimation(),
  });
};

//--- SCROLL TRIGGER ANIMATIONS
const desktopAnimation = () => {
  let section = 0;
  const tl = gsap.timeline({
    default: {
      duration: 1,
      ease: "power2.inout",
    },
    scrollTrigger: {
      trigger: ".page",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.1,
    },
  });
  tl.to(
    [
      object[1].group.position,
      object[2].group.position,
      object[3].group.position,
      object[5].group.position,
      object[6].group.position,
      object[7].group.position,
    ],
    { duration: 0.5, ease: "none", y: 7.2, section }
  );
  tl.to(views[1], { height: 1, bottom: 0, section, ease: "none", section });
  section += 1;
  tl.to(views[2], { height: 1, bottom: 0, section, ease: "none", section });
  section += 1;
  tl.to(
    views[2].camera.position,
    {
      duration: 1,
      z: 0.7,
      onUpdate: () => {
        stb = true;
      },
    },
    section
  ).to(clones[object[8].name].rotation, { duration: 1, x: -1.4 }, section);
  section += 1;
  tl.to(views[3], { height: 1, bottom: 0, section, ease: "none", section });
  section += 1;
  tl.to(object[10].group.rotation, { duration: 7, z: 3.2 }, section).to(
    object[10].group.position,
    { duration: 7, z: -5.3 },
    section
  );
  tl.to(
    [
      object[9].group.position,
      object[11].group.position,
      object[12].group.position,
      object[13].group.position,
      object[14].group.position,
      object[15].group.position,
      object[16].group.position,
      object[17].group.position,
      object[18].group.position,
      object[19].group.position,
      object[20].group.position,
      object[21].group.position,
      object[22].group.position,
      object[23].group.position,
      object[24].group.position,
      object[25].group.position,
      object[26].group.position,
      object[27].group.position,
      object[28].group.position,
      object[29].group.position,
      object[30].group.position,
      object[31].group.position,
      object[32].group.position,
      object[33].group.position,
      object[34].group.position,
      object[35].group.position,
      object[36].group.position,
      object[37].group.position,
      object[39].group.position,
      object[40].group.position,
      object[41].group.position,
      object[42].group.position,
      object[43].group.position,
      object[44].group.position,
      object[45].group.position,
      object[46].group.position,
      object[47].group.position,
      object[48].group.position,
      object[49].group.position,
      object[50].group.position,
      object[51].group.position,
      object[52].group.position,
    ],
    { duration: 5, z: -105, ease: "none" },
    section
  );
  tl.to(views[4], { height: 1, bottom: 0, section, ease: "none", section });
};

//--- RENDER FUNCTIONS
const tick = () => {
  views.forEach((view) => {
    let bottom = size.height * view.bottom;
    let height = size.height * view.height;
    renderer.setViewport(0, 0, size.width, size.height);
    renderer.setScissor(0, bottom, size.width, height);
    renderer.setScissorTest(true);
    renderer.render(view.scene, view.camera);
  });
  window.requestAnimationFrame(() => tick());
  onResize();
};

//---FINAL SCENE (mouse coordinates function)
var pp = new THREE.Plane(new THREE.Vector3(0, 0, 10), 0);
let raa = new THREE.Raycaster();
let mouu = new THREE.Vector2();
var II = new THREE.Vector3(); //for reuse
function OMMMM(event) {
  //get mouse coordinates
  mouu.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouu.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raa.setFromCamera(mouu, views[3].camera); //set raycaster
  raa.ray.intersectPlane(pp, II); // find the point of intersection
  object[9].group.rotation.y = II.x / 10;
  object[9].group.rotation.x = II.y / 100;
  object[11].group.rotation.y = II.x / 10;
  object[11].group.rotation.x = II.y / 100;
  object[12].group.rotation.y = II.x / 10;
  object[12].group.rotation.x = II.y / 100;
  object[13].group.rotation.y = II.x / 10;
  object[13].group.rotation.x = II.y / 100;
  object[14].group.rotation.y = II.x / 10;
  object[14].group.rotation.x = II.y / 100;
  object[15].group.rotation.y = II.x / 10;
  object[15].group.rotation.x = II.y / 100;
  object[16].group.rotation.y = II.x / 10;
  object[16].group.rotation.x = II.y / 100;
  object[17].group.rotation.y = II.x / 10;
  object[17].group.rotation.x = II.y / 100;
  object[18].group.rotation.y = II.x / 10;
  object[18].group.rotation.x = II.y / 100;
  object[19].group.rotation.y = II.x / 10;
  object[19].group.rotation.x = II.y / 100;
  object[20].group.rotation.y = II.x / 10;
  object[20].group.rotation.x = II.y / 100;
  object[21].group.rotation.y = II.x / 10;
  object[21].group.rotation.x = II.y / 100;
  object[22].group.rotation.y = II.x / 10;
  object[22].group.rotation.x = II.y / 100;
  object[23].group.rotation.y = II.x / 10;
  object[23].group.rotation.x = II.y / 100;
  object[24].group.rotation.y = II.x / 10;
  object[24].group.rotation.x = II.y / 100;
  object[25].group.rotation.y = II.x / 10;
  object[25].group.rotation.x = II.y / 100;
  object[26].group.rotation.y = II.x / 10;
  object[26].group.rotation.x = II.y / 100;
  object[27].group.rotation.y = II.x / 10;
  object[27].group.rotation.x = II.y / 100;
  object[28].group.rotation.y = II.x / 10;
  object[28].group.rotation.x = II.y / 100;
  object[29].group.rotation.y = II.x / 10;
  object[29].group.rotation.x = II.y / 100;
  object[30].group.rotation.y = II.x / 10;
  object[30].group.rotation.x = II.y / 100;
  object[31].group.rotation.y = II.x / 10;
  object[31].group.rotation.x = II.y / 100;
  object[32].group.rotation.y = II.x / 10;
  object[32].group.rotation.x = II.y / 100;
  object[33].group.rotation.y = II.x / 10;
  object[33].group.rotation.x = II.y / 100;
  object[34].group.rotation.y = II.x / 10;
  object[34].group.rotation.x = II.y / 100;
  object[35].group.rotation.y = II.x / 10;
  object[35].group.rotation.x = II.y / 100;
  object[36].group.rotation.y = II.x / 10;
  object[36].group.rotation.x = II.y / 100;
  object[37].group.rotation.y = II.x / 10;
  object[37].group.rotation.x = II.y / 100;
  object[38].group.rotation.y = II.x / 10;
  object[38].group.rotation.x = II.y / 100;
  object[39].group.rotation.y = II.x / 10;
  object[39].group.rotation.x = II.y / 100;
  object[40].group.rotation.y = II.x / 10;
  object[40].group.rotation.x = II.y / 100;
  object[41].group.rotation.y = II.x / 10;
  object[41].group.rotation.x = II.y / 100;
  object[42].group.rotation.y = II.x / 10;
  object[42].group.rotation.x = II.y / 100;
  object[43].group.rotation.y = II.x / 10;
  object[43].group.rotation.x = II.y / 100;
  object[44].group.rotation.y = II.x / 10;
  object[44].group.rotation.x = II.y / 100;
  object[45].group.rotation.y = II.x / 10;
  object[45].group.rotation.x = II.y / 100;
  object[46].group.rotation.y = II.x / 10;
  object[46].group.rotation.x = II.y / 100;
  object[47].group.rotation.y = II.x / 10;
  object[47].group.rotation.x = II.y / 100;
  object[48].group.rotation.y = II.x / 10;
  object[48].group.rotation.x = II.y / 100;
  object[49].group.rotation.y = II.x / 10;
  object[49].group.rotation.x = II.y / 100;
  object[50].group.rotation.y = II.x / 10;
  object[50].group.rotation.x = II.y / 100;
  object[51].group.rotation.y = II.x / 10;
  object[51].group.rotation.x = II.y / 100;
  object[52].group.rotation.y = II.x / 10;
  object[52].group.rotation.x = II.y / 100;
}
window.addEventListener("mousemove", OMMMM, false);
tick();
