import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function useFirstPersonControls({ active, onExit }) {
  const { camera } = useThree();
  const keys = useRef({});

  useEffect(() => {
    if (!active) return;
    
    const onKeyDown = (e) => {
      keys.current[e.key] = true;
      if (e.key === 'Escape') onExit?.();
    };
    const onKeyUp = (e) => { keys.current[e.key] = false; };
    
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [active, onExit]);

  useFrame(() => {
    if (!active) return;
    
    const speed = 0.08;
    const turnSpeed = 0.02;
    const k = keys.current;
    
    if (k['ArrowLeft']) camera.rotation.y += turnSpeed;
    if (k['ArrowRight']) camera.rotation.y -= turnSpeed;
    
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    
    if (k['ArrowUp'] || k['w'] || k['W']) {
      camera.position.addScaledVector(dir, speed);
    }
    if (k['ArrowDown'] || k['s'] || k['S']) {
      camera.position.addScaledVector(dir, -speed);
    }
    
    if (k[' ']) camera.position.y += speed;
    if (k['Shift']) camera.position.y -= speed;
  });
}
