import {
  Scene,
  PerspectiveCamera,
  Color,
  WebGLRenderer,
  Mesh,
  AmbientLight,
  BoxGeometry,
  MeshPhongMaterial,
  DoubleSide,
  ConeGeometry,
  PlaneGeometry
} from 'three';

const MeshPhong = (obj) => new MeshPhongMaterial(obj);

const createCone = (
  radius,
  height,
  radialSegments,
  heightSegments,
  openEnded
) => {
  const geometry = new ConeGeometry(
    radius,
    height,
    radialSegments,
    heightSegments,
    openEnded
  );
  const material = MeshPhong({
    color: 0x0f1d89,
    shininess: 100,
    side: DoubleSide
  });
  const cone = new Mesh(geometry, material);
  cone.position.x = 7;
  cone.position.y = -5;
  return cone;
};

const createCube = (width, height, depth) => {
  const geometry = new BoxGeometry(width, height, depth);
  const material = MeshPhong({
    color: 0x0f1d89,
    shininess: 100,
    side: DoubleSide
  });
  const cube = new Mesh(geometry, material);
  cube.position.z = -6;
  cube.position.y = -5;
  cube.position.x = -6;
  return cube;
};

const createPlane = (width, height, widthSegments, heightSegments) => {
  const geometry = new PlaneGeometry(
    width,
    height,
    widthSegments,
    heightSegments
  );
  const material = MeshPhong({ color: 0x693421, side: DoubleSide });
  const plane = new Mesh(geometry, material);
  plane.rotation.x = Math.PI / 2;
  plane.position.y = -100;
  return plane;
};

const init = (objs, position) => {
  const { innerWidth, innerHeight } = window;
  const scene = new Scene();
  scene.background = new Color(0xffffff);
  const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 1, 1000);
  camera.position.z = position.z;

  const light = new AmbientLight(0xffffff);
  scene.add(light);

  Object.entries(objs).forEach((entry) => {
    const value = entry[1];
    scene.add(value);
  });

  const renderer = new WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  return { renderer, scene, camera, light };
};

export { init, createCone, createCube, createPlane };
