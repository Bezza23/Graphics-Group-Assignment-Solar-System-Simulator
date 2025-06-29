// js/planetsData.js (Updated)

export const planetsData = [
    { 
        name: 'Sun', 
        texture: 'textures/2k_sun.jpg', 
        size: 16, 
        distance: 0, 
        orbitalSpeed: 0, 
        rotationSpeed: 0.001,
        tilt: 7.25,
        info: "The Sun is the star at the center of the Solar System. It is a nearly perfect ball of hot plasma, heated to incandescence by nuclear fusion reactions in its core."
    },
    { 
        name: 'Mercury', 
        texture: 'textures/2k_mercury.jpg', 
        size: 3.2, 
        distance: 28, 
        orbitalSpeed: 0.04, 
        rotationSpeed: 0.01,
        tilt: 0.03,
        emissiveIntensity: 0, // No glow
        info: "Diameter: 4,879 km\nOrbital Period: 88 days\nMercury is the smallest planet in the Solar System and nearest to the Sun."
    },
    { 
        name: 'Venus', 
        texture: 'textures/2k_venus_surface.jpg', 
        size: 5.8, 
        distance: 52, 
        orbitalSpeed: 0.025, 
        rotationSpeed: 0.008,
        tilt: 177.4,
        emissiveIntensity: 0, // No glow
        info: "Diameter: 12,104 km\nOrbital Period: 225 days\nVenus has a thick, toxic atmosphere that traps heat in a runaway greenhouse effect."
    },
    { 
        name: 'Earth', 
        texture: 'textures/2k_earth_daymap.jpg', 
        size: 6, 
        distance: 78, 
        orbitalSpeed: 0.018, 
        rotationSpeed: 0.05,
        tilt: 23.44,
        emissiveIntensity: 0.05, // A very slight glow for the home planet
        info: "Diameter: 12,742 km\nOrbital Period: 365.25 days\nOur home planet is the only place we know of so far that’s inhabited by living things.",
        moons: [
            {
                name: 'Moon',
                texture: 'textures/2k_moon.jpg',
                size: 1.5,
                distance: 10,
                orbitalSpeed: 0.2,
                rotationSpeed: 0.01,
                tilt: 6.68,
                emissiveIntensity: 0.1, // Moon gets a little glow
                info: "The Moon is Earth's only natural satellite. It is the fifth largest satellite in the Solar System."
            }
        ]
    },
    { 
        name: 'Mars', 
        texture: 'textures/2k_mars.jpg', 
        size: 4, 
        distance: 112, 
        orbitalSpeed: 0.012, 
        rotationSpeed: 0.048,
        tilt: 25.19,
        emissiveIntensity: 0.1, // A little glow
        info: "Diameter: 6,779 km\nOrbital Period: 687 days\nMars is a dusty, cold, desert world with a very thin atmosphere."
    },
    { 
        name: 'Jupiter', 
        texture: 'textures/2k_jupiter.jpg', 
        size: 12, 
        distance: 180, 
        orbitalSpeed: 0.008, 
        rotationSpeed: 0.1,
        tilt: 3.13,
        emissiveIntensity: 0.2, // More glow
        info: "Diameter: 139,820 km\nOrbital Period: 11.9 years\nJupiter is more than twice as massive than the other planets of our solar system combined."
    },
    { 
        name: 'Saturn', 
        texture: 'textures/2k_saturn.jpg', 
        size: 10, 
        distance: 250, 
        orbitalSpeed: 0.006, 
        rotationSpeed: 0.09,
        tilt: 26.73,
        emissiveIntensity: 0.3, // More glow
        info: "Diameter: 116,460 km\nOrbital Period: 29.5 years\nAdorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system.",
        rings: { texture: 'textures/2k_saturn_ring_alpha.png', innerRadius: 12, outerRadius: 20 }
    },
    { 
        name: 'Uranus', 
        texture: 'textures/2k_uranus.jpg', 
        size: 7, 
        distance: 320, 
        orbitalSpeed: 0.004, 
        rotationSpeed: 0.06,
        tilt: 97.77,
        emissiveIntensity: 0.4, // Even more glow
        info: "Diameter: 50,724 km\nOrbital Period: 84 years\nUranus rotates at a nearly 90-degree angle from the plane of its orbit, making it appear to spin on its side."
    },
    { 
        name: 'Neptune', 
        texture: 'textures/2k_neptune.jpg', 
        size: 7, 
        distance: 380, 
        orbitalSpeed: 0.003, 
        rotationSpeed: 0.055,
        tilt: 28.32,
        emissiveIntensity: 0.5, // The most glow for the farthest planet
        info: "Diameter: 49,244 km\nOrbital Period: 164.8 years\nNeptune is dark, cold, and whipped by supersonic winds. It was the first planet located through mathematical calculation."
    }
];