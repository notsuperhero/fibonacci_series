import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, RotateCcw, Play, Info } from 'lucide-react';

// Fibonacci Generator
const generateFibonacci = (n) => {
  if (n <= 0) return [];
  if (n === 1) return [0];
  const seq = [0, 1];
  while (seq.length < n) {
    const next = seq[seq.length - 1] + seq[seq.length - 2];
    // Safety cap to prevent browser crash from massive numbers
    if (next > 100000000000000) break; 
    seq.push(next);
  }
  return seq;
};

// Colors for the squares to make them distinct
const COLORS = [
  '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#06b6d4'
];

export default function App() {
  const [count, setCount] = useState(8);
  const [sequence, setSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initial generation
  useEffect(() => {
    setSequence(generateFibonacci(count));
  }, [count]);

  // Auto-play effect
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCount((prev) => (prev < 20 ? prev + 1 : 2)); // Loop between 2 and 20
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1 && val <= 50) {
      setCount(val);
      setIsPlaying(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      fontFamily: "'Inter', sans-serif",
      color: 'white',
      overflow: 'hidden'
    }}>
      
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ marginBottom: '2rem', textAlign: 'center' }}
      >
        <h1 style={{ fontSize: '3rem', margin: 0, background: 'linear-gradient(to right, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Fibonacci Visualizer
        </h1>
        <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
          Explore the Golden Sequence
        </p>
      </motion.header>

      {/* Controls */}
      <motion.div 
        className="controls"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          background: 'rgba(30, 41, 59, 0.7)',
          backdropFilter: 'blur(10px)',
          padding: '1.5rem',
          borderRadius: '16px',
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          marginBottom: '3rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Calculator size={20} color="#60a5fa" />
          <label style={{ fontWeight: 500, color: '#cbd5e1' }}>Terms:</label>
          <input
            type="number"
            min="1"
            max="50"
            value={count}
            onChange={handleInputChange}
            style={{
              background: '#0f172a',
              border: '1px solid #334155',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              width: '80px',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ width: '1px', height: '30px', background: '#334155' }} />

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            background: isPlaying ? '#ef4444' : '#22c55e',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'background 0.2s'
          }}
        >
          {isPlaying ? (
            <>Stop</>
          ) : (
            <><Play size={16} /> Auto Play</>
          )}
        </button>

        <button
          onClick={() => { setCount(2); setIsPlaying(false); }}
          style={{
            background: 'transparent',
            border: '1px solid #475569',
            padding: '0.5rem',
            borderRadius: '8px',
            color: '#94a3b8',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
          title="Reset"
        >
          <RotateCcw size={18} />
        </button>
      </motion.div>

      {/* Main Visualization Area */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: '1200px' }}>
        
        {/* Number List */}
        <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
           <h3 style={{ color: '#cbd5e1', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <Info size={18} /> Sequence
           </h3>
           <div style={{
             display: 'flex',
             flexDirection: 'column',
             gap: '0.5rem',
             maxHeight: '500px',
             overflowY: 'auto',
             paddingRight: '0.5rem'
           }}>
             <AnimatePresence>
               {sequence.map((num, i) => (
                 <motion.div
                   key={`${i}-${num}`}
                   initial={{ x: -20, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ delay: i * 0.05 }}
                   style={{
                     background: '#1e293b',
                     padding: '0.75rem',
                     borderRadius: '8px',
                     display: 'flex',
                     justifyContent: 'space-between',
                     borderLeft: `4px solid ${COLORS[i % COLORS.length]}`
                   }}
                 >
                   <span style={{ color: '#64748b', fontSize: '0.9rem' }}>n={i}</span>
                   <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 'bold' }}>{num.toLocaleString()}</span>
                 </motion.div>
               ))}
             </AnimatePresence>
           </div>
        </div>

        {/* Geometric Visualization (Simplified Spiral/Tree Map Idea) */}
        <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ color: '#cbd5e1', marginBottom: '1rem' }}>Visualization (Scaled)</h3>
          <div style={{
            background: '#020617',
            borderRadius: '16px',
            padding: '2rem',
            height: '500px',
            position: 'relative',
            overflow: 'hidden', // Hidden overflow for the "zoom" effect
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #1e293b'
          }}>
             {/* 
                We create a "spiral" by nesting divs or absolute positioning. 
                For simplicity and stability in this prompt, we'll use a flex-wrap layout 
                where boxes grow, or a centering container that scales down.
             */}
             <div style={{ 
               display: 'flex', 
               alignItems: 'flex-end', 
               gap: '4px',
               height: '100%',
               width: '100%',
               justifyContent: 'center'
             }}>
                <AnimatePresence>
                  {sequence.slice(0, 20).map((num, i) => {
                     // Calculate height percentage relative to the largest visible number
                     // We use log scale or simple proportion? 
                     // Linear scale gets too big too fast. Let's use a "clamped" scale for visuals.
                     const maxVal = Math.max(...sequence.slice(0, 20));
                     // Use a logarithmic height to keep it viewable
                     const heightPerc = Math.max(5, (Math.log(num + 1) / Math.log(maxVal + 1)) * 90);
                     
                     return (
                        <motion.div
                          key={`bar-${i}`}
                          layoutId={`bar-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: `${heightPerc}%`, opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{
                            width: '40px',
                            background: COLORS[i % COLORS.length],
                            borderRadius: '4px 4px 0 0',
                            position: 'relative',
                            minWidth: '20px',
                            flex: 1
                          }}
                          title={`n=${i}: ${num}`}
                        >
                          <span style={{
                            position: 'absolute',
                            bottom: '5px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: '0.7rem',
                            color: 'rgba(0,0,0,0.6)',
                            fontWeight: 'bold',
                            writingMode: 'vertical-rl'
                          }}>
                            {num < 1000 ? num : '...'}
                          </span>
                        </motion.div>
                     );
                  })}
                </AnimatePresence>
             </div>
             
             {/* Spiral Overlay Hint */}
             <div style={{ position: 'absolute', top: '10px', right: '10px', opacity: 0.3 }}>
               <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>*Logarithmic Scale View</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}