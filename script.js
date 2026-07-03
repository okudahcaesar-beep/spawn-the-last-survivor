import * as THREE from 'three';

class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 2000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.health = 100;
        this.time = 0;
        this.setupEnvironment();
        this.animate();
    }

    setupEnvironment() {
        // Floor
        const geo = new THREE.PlaneGeometry(2000, 2000);
        const mat = new THREE.MeshPhongMaterial({ color: 0x052d05 });
        const ground = new THREE.Mesh(geo, mat);
        ground.rotation.x = -Math.PI / 2;
        this.scene.add(ground);

        // Lighting
        this.sun = new THREE.DirectionalLight(0xffffff, 1);
        this.sun.position.set(0, 100, 0);
        this.scene.add(this.sun);
        this.scene.add(new THREE.AmbientLight(0x404040));
    }

    updateLogic() {
        this.time += 0.005;
        // Day/Night Cycle
        const intensity = Math.sin(this.time) * 0.5 + 0.5;
        this.sun.intensity = intensity;
        this.scene.background = new THREE.Color(intensity * 0.1, intensity * 0.1, intensity * 0.2);

        // Auto-heal logic
        if (this.health < 50) this.health += 0.05;
        document.getElementById('health-bar').style.width = `${this.health}%`;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.updateLogic();
        this.renderer.render(this.scene, this.camera);
    }
}

new Game();

// Interaction: Click to shoot/reload
document.addEventListener('click', () => {
    console.log("Reloading/Shooting effect triggered...");
    this.health -= 5; // Simulating getting hit
});
