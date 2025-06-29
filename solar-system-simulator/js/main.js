import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { setupScene } from './sceneSetup.js';
import { CelestialBody } from './CelestialBody.js';
import { planetsData } from './planetsData.js';

// --- INITIALIZATION ---
const { scene, camera, renderer, controls, composer } = setupScene();
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let timeScale = 0.1; 
const celestialBodies = [];

// Sun Light Source
const pointLight = new THREE.PointLight(0xffffff, 3000, 2000);
pointLight.castShadow = true;
scene.add(pointLight);

// --- CREATE CELESTIAL BODIES ---
const sunData = planetsData.find(p => p.name === 'Sun');
const sun = new CelestialBody(sunData, true);
sun.addToScene(scene);
celestialBodies.push(sun);

planetsData.filter(p => p.name !== 'Sun').forEach(pdata => {
    const planet = new CelestialBody(pdata);
    planet.addToScene(scene);
    celestialBodies.push(planet);

    if (pdata.moons) {
        pdata.moons.forEach(mdata => {
            const moon = new CelestialBody(mdata);
            moon.orbit.material.opacity = 0.2;
            planet.mesh.add(moon.mesh);
            planet.mesh.add(moon.orbit);
            celestialBodies.push(moon);
        });
    }
});


// --- UI AND INTERACTION ---
const infoPanel = document.getElementById('info-panel');
const infoName = document.getElementById('info-name');
const infoData = document.getElementById('info-data');
const closeButton = document.getElementById('close-button');
const timeSlider = document.getElementById('time-slider');

timeSlider.addEventListener('input', (event) => {
    timeScale = event.target.value / 50; 
});

function onDocumentMouseDown(event) {
    if (event.target.closest('#info-panel') || event.target.closest('#controls-panel')) {
        return; 
    }
    event.preventDefault();

    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        const body = clickedObject.userData.celestialBody;
        if (body) {
            focusOnObject(body);
            showInfoPanel(body);
        }
    }
}

function focusOnObject(body) {
    const targetPosition = new THREE.Vector3();
    body.mesh.getWorldPosition(targetPosition);

    // === CHANGES ARE HERE ===
    // Use a smaller offset for the sun to get a closer view
    const cameraOffset = (body.name === 'Sun')
        ? body.mesh.geometry.parameters.radius * 2.5 // Closer view for the Sun
        : body.mesh.geometry.parameters.radius * 4;   // Standard view for planets
    // ========================

    const newCameraPosition = new THREE.Vector3(
        targetPosition.x + cameraOffset,
        targetPosition.y + cameraOffset / 2,
        targetPosition.z + cameraOffset
    );

    new TWEEN.Tween(camera.position)
        .to(newCameraPosition, 1500)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();
    
    new TWEEN.Tween(controls.target)
        .to(targetPosition, 1500)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();
}

function showInfoPanel(body) {
    infoName.textContent = body.name;
    infoData.textContent = body.info;
    infoPanel.classList.remove('hidden');
}

closeButton.addEventListener('click', () => {
    infoPanel.classList.add('hidden');
});

document.addEventListener('mousedown', onDocumentMouseDown, false);

// --- ANIMATION LOOP ---
function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();
    celestialBodies.forEach(body => {
        body.update(elapsedTime, timeScale);
    });

    controls.update();
    TWEEN.update();
    composer.render();
}

animate();