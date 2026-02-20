import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImageSequence = ({ frameCount = 200, containerRef }) => {
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [isFullyLoaded, setIsFullyLoaded] = useState(false);
    const airRender = useRef({ frame: 0 });

    const currentFrame = (index) => (
        `/assets/imagess/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`
    );

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages = [];
            let count = 0;
            let lastValidFrame = 0;

            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                img.src = currentFrame(i);
                img.onload = () => {
                    count++;
                    setLoadedCount(prev => prev + 1);
                    if (i > lastValidFrame) lastValidFrame = i;
                    if (count >= frameCount) setIsFullyLoaded(true);
                };
                img.onerror = () => {
                    // Fail gracefully for missing frames by reusing the last successfully loaded one
                    count++;
                    setLoadedCount(prev => prev + 1);
                    if (count >= frameCount) setIsFullyLoaded(true);
                };
                loadedImages.push(img);
            }
            setImages(loadedImages);
        };

        loadImages();
    }, [frameCount]);

    useEffect(() => {
        // Show as soon as we have some frames, but smooth the transition
        if (loadedCount < 10 || images.length === 0 || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        const render = () => {
            let index = Math.round(airRender.current.frame);
            let img = images[index];

            // If the image is not ready or missing, try to find the nearest previous valid one
            while (index > 0 && (!img || !img.complete || img.naturalWidth === 0)) {
                index--;
                img = images[index];
            }

            if (!img || !img.complete || img.naturalWidth === 0) return;

            const canvasWidth = canvas.clientWidth;
            const canvasHeight = canvas.clientHeight;

            // Handle High DPI
            if (canvas.width !== canvasWidth * dpr || canvas.height !== canvasHeight * dpr) {
                canvas.width = canvasWidth * dpr;
                canvas.height = canvasHeight * dpr;
            }

            const imgWidth = img.width;
            const imgHeight = img.height;

            const ratio = Math.max(canvas.width / imgWidth, canvas.height / imgHeight);
            const x = (canvas.width - imgWidth * ratio) / 2;
            const y = (canvas.height - imgHeight * ratio) / 2;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, imgWidth, imgHeight, x, y, imgWidth * ratio, imgHeight * ratio);
        };

        render();

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.1, // Slight scrub for smoothness
                onUpdate: render,
            }
        });

        tl.to(airRender.current, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            duration: 1,
        });

        const handleResize = () => {
            render();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
            tl.kill();
        };
    }, [loadedCount, images, frameCount, containerRef]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none object-cover transition-opacity duration-1000 ease-in-out"
            style={{
                zIndex: -50,
                filter: 'contrast(1.02) saturate(1.05)',
                opacity: loadedCount > 20 ? 1 : 0
            }}
        />
    );
};

export default ImageSequence;
