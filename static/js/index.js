// static/js/index.js

/* Parallax background (mouse on desktop, device orientation on mobile) */
window.parallaxPage = function parallaxPage(opts = {}) {
    const intensity = opts.intensity ?? 16; // px
    const mobileIntensity = opts.mobileIntensity ?? 10; // px
  
    return {
        x: 0,
        y: 0,
        needsPermission: false,
        hasMotion: false,
    
        init() {
            this.tryDeviceOrientation();
            window.addEventListener(
                "resize",
                () => this.tryDeviceOrientation(),
                { passive: true }
            );
        },
    
        onMouseMove(e) {
            const w = window.innerWidth || 1;
            const h = window.innerHeight || 1;
            const nx = e.clientX / w - 0.5;
            const ny = e.clientY / h - 0.5;
            this.x = nx;
            this.y = ny;
        },
    
        tryDeviceOrientation() {
            const isMobile =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            );
    
            if (!isMobile) return;
    
            const onOrient = (event) => {
                const g = (event.gamma ?? 0) / 45; // approx [-1..1]
                const b = (event.beta ?? 0) / 45; // approx [-1..1]
                this.x = Math.max(-1, Math.min(1, g)) * 0.5;
                this.y = Math.max(-1, Math.min(1, b)) * 0.5;
                this.hasMotion = true;
            };
    
            if (
                typeof DeviceOrientationEvent !== "undefined" &&
                typeof DeviceOrientationEvent.requestPermission === "function"
            ) {
                this.needsPermission = true; // iOS 13+
            } else if (typeof DeviceOrientationEvent !== "undefined") {
                window.addEventListener("deviceorientation", onOrient, {
                    passive: true,
                });
                this.hasMotion = true;
                this.needsPermission = false;
            }
        },
    
        async requestPermission() {
            try {
            const state = await DeviceOrientationEvent.requestPermission();
            if (state === "granted") {
                window.addEventListener(
                "deviceorientation",
                (e) => {
                    const g = (e.gamma ?? 0) / 45;
                    const b = (e.beta ?? 0) / 45;
                    this.x = Math.max(-1, Math.min(1, g)) * 0.5;
                    this.y = Math.max(-1, Math.min(1, b)) * 0.5;
                },
                { passive: true }
                );
                this.needsPermission = false;
                this.hasMotion = true;
            }
            } catch {
            // ignore
            }
        },
    
        layerStyle(layer) {
            const depth = layer === 1 ? 1 : 0.5;
            const px = (this.hasMotion ? mobileIntensity : intensity) * depth;
            const tx = -(this.x * px).toFixed(2);
            const ty = -(this.y * px).toFixed(2);
            return `transform: translate3d(${tx}px, ${ty}px, 0);`;
        },
    };
};