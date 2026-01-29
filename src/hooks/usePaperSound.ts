import { useCallback, useRef } from "react";

export const usePaperSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playPaperRustle = useCallback(() => {
    // Create or resume audio context
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    
    // Create multiple layers of filtered noise for paper rustling effect
    const createNoiseLayer = (startTime: number, duration: number, frequency: number, gain: number) => {
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      // Generate noise with envelope shaping
      for (let i = 0; i < bufferSize; i++) {
        const t = i / bufferSize;
        // Envelope: quick attack, sustained, gradual release
        const envelope = Math.sin(t * Math.PI) * (1 - t * 0.3);
        data[i] = (Math.random() * 2 - 1) * envelope;
      }
      
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      
      // Bandpass filter to shape the paper-like sound
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = frequency;
      filter.Q.value = 0.8;
      
      // Gain for volume control
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(gain * 0.7, startTime + duration * 0.6);
      gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
      
      source.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      source.start(startTime);
      source.stop(startTime + duration);
    };

    // Layer 1: Low crinkle (paper body)
    createNoiseLayer(now, 0.8, 800, 0.08);
    
    // Layer 2: Mid rustle (paper surface)
    createNoiseLayer(now + 0.05, 0.6, 2000, 0.06);
    
    // Layer 3: High detail (paper edge/crisp sound)
    createNoiseLayer(now + 0.1, 0.5, 4000, 0.04);
    
    // Layer 4: Secondary rustle for realism
    createNoiseLayer(now + 0.3, 0.5, 1200, 0.05);
    
    // Layer 5: Gentle trailing sound
    createNoiseLayer(now + 0.5, 0.7, 600, 0.03);
    
  }, []);

  return { playPaperRustle };
};
