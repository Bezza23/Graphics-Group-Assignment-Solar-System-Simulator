// js/CelestialBody.js (Updated)

import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

export class CelestialBody {
    constructor(data, isSun = false) {
        this.name = data.name;
        this.info = data.info;

        // Create Mesh
        const texture = textureLoader.load(data.texture);
        const material = isSun
            ? new THREE.MeshBasicMaterial({ map: texture })
            : new THREE.MeshStandardMaterial({ 
                map: texture,
                // === NEW LINES ARE HERE ===
                emissive: texture, // Make the texture itself glow
                emissiveIntensity: data.emissiveIntensity || 0 // Use data, default to 0
                // ==========================
            });
        
        const geometry = new THREE.SphereGeometry(data.size, 64, 64);
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.name = this.name;
        this.mesh.userData.celestialBody = this;
        
        if (!isSun) {
            this.mesh.castShadow = true;
            this.mesh.receiveShadow = true;
            this.mesh.rotation.x = data.tilt * (Math.PI / 180);
        }
        
        // Data for animation
        this.distance = data.distance;
        this.orbitalSpeed = data.orbitalSpeed;
        this.rotationSpeed = data.rotationSpeed;
        
        // Create Orbital Path
        if (data.distance > 0) {
            const orbitGeometry = new THREE.TorusGeometry(this.distance, 0.1, 16, 100);
            const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.5 });
            this.orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
            this.orbit.rotation.x = Math.PI / 2;
        }

        // Create Rings (for Saturn)
        if (data.rings) {
            const ringTexture = textureLoader.load(data.rings.texture);
            const ringMaterial = new THREE.MeshBasicMaterial({ 
                map: ringTexture, 
                side: THREE.DoubleSide, 
                transparent: true, 
                opacity: 0.8 
            });
            const ringGeometry = new THREE.RingGeometry(data.rings.innerRadius, data.rings.outerRadius, 64);
            this.rings = new THREE.Mesh(ringGeometry, ringMaterial);
            this.rings.rotation.x = -0.5 * Math.PI;
            this.mesh.add(this.rings);
        }
    }

    // Add this object (and its orbit) to the scene
    addToScene(scene) {
        scene.add(this.mesh);
        if (this.orbit) {
            scene.add(this.orbit);
        }
    }

    // Update position and rotation
    update(elapsedTime, timeScale) {
        // Self-rotation
        this.mesh.rotation.y += this.rotationSpeed * timeScale;

        // Orbital revolution
        if (this.distance > 0) {
            const angle = elapsedTime * this.orbitalSpeed * timeScale;
            this.mesh.position.x = Math.cos(angle) * this.distance;
            this.mesh.position.z = Math.sin(angle) * this.distance;
        }
    }
}