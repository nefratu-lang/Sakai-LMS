
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

// --- DATA TYPES ---
type Status = 'active' | 'migrating' | 'stopped';

interface University {
    id: string;
    name: string;
    status: Status;
    x: number; // SVG Coordinate X (0-1000)
    y: number; // SVG Coordinate Y (0-500)
    align: 'left' | 'right'; // Label alignment to avoid overlapping
}

// --- DATA SET (SVG Coordinates 1000x500) ---
// CALIBRATION V7: Shifted DOWN (South) by 25 units from V6. 
// This places markers correctly in the Mediterranean band (approx 135px Y for Turkey).
const universities: University[] = [
    // Europe
    { id: 'murcia', name: "U. Murcia (ES)", status: 'active', x: 480, y: 130, align: 'right' },
    { id: 'oxford', name: "Oxford (UK)", status: 'stopped', x: 470, y: 100, align: 'left' },
    { id: 'berlin', name: "Freie Berlin", status: 'active', x: 510, y: 105, align: 'right' },
    
    // Turkey (Shifted South to 135 - Perfect align for 38N)
    { id: 'yasar', name: "Yaşar Üni.", status: 'active', x: 555, y: 135, align: 'right' },
    
    // Asia
    { id: 'lahore', name: "Lahore (PAK)", status: 'active', x: 660, y: 155, align: 'right' },
    { id: 'kyoto', name: "Kyoto (JP)", status: 'active', x: 860, y: 140, align: 'left' },
    { id: 'hutech', name: "HUTECH (VN)", status: 'active', x: 780, y: 195, align: 'left' },

    // North America
    { id: 'michigan', name: "Michigan", status: 'stopped', x: 260, y: 115, align: 'right' },
    { id: 'duke', name: "Duke", status: 'migrating', x: 270, y: 135, align: 'right' },
    { id: 'stanford', name: "Stanford", status: 'stopped', x: 150, y: 135, align: 'left' },
    { id: 'pepperdine', name: "Pepperdine", status: 'active', x: 160, y: 150, align: 'right' },

    // Africa
    { id: 'ghana', name: "Ghana", status: 'active', x: 480, y: 225, align: 'left' },
    { id: 'unisa', name: "UNISA", status: 'stopped', x: 540, y: 345, align: 'right' }
];

export const GlobalAdoptionMap: React.FC = () => {

  const getStatusColor = (status: Status) => {
      switch(status) {
          case 'active': return '#22c55e'; // Green
          case 'migrating': return '#f97316'; // Orange
          case 'stopped': return '#ef4444'; // Red
      }
  };

  return (
    <div className="w-full h-full min-h-[500px] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex items-center justify-center relative">
        
        {/* 
            PURE SVG SOLUTION 
            Everything is drawn inside the same coordinate system (0 0 1000 500).
            This makes relative drift impossible.
        */}
        <svg viewBox="0 0 1000 500" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            
            {/* 1. MAP BACKGROUND IMAGE (Embedded inside SVG) */}
            <image 
                href="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" 
                x="0" 
                y="0" 
                width="1000" 
                height="500" 
                opacity="0.4"
                style={{ filter: 'invert(1)' }} // Dark mode effect
            />

            {/* 2. CONNECTING LINES & MARKERS */}
            {universities.map((uni) => (
                <g key={uni.id}>
                    {/* Glow Effect */}
                    <circle cx={uni.x} cy={uni.y} r="8" fill={getStatusColor(uni.status)} opacity="0.2">
                        <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* Solid Dot */}
                    <circle cx={uni.x} cy={uni.y} r="3.5" fill={getStatusColor(uni.status)} stroke="#0f172a" strokeWidth="1" />

                    {/* Static Label (Always Visible) */}
                    <text 
                        x={uni.x + (uni.align === 'left' ? -8 : 8)} 
                        y={uni.y + 3} 
                        fill={getStatusColor(uni.status)} 
                        fontSize="10" 
                        fontWeight="bold"
                        textAnchor={uni.align === 'left' ? 'end' : 'start'}
                        style={{ textShadow: '0px 1px 3px #000' }}
                    >
                        {uni.name}
                    </text>
                </g>
            ))}
        </svg>

        {/* Static Legend (HTML Overlay) */}
        <div className="absolute bottom-4 right-4 bg-slate-900/90 p-3 rounded-xl border border-slate-700 backdrop-blur-sm text-[10px] pointer-events-none">
            <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div> <span className="text-slate-300">Aktif</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div> <span className="text-slate-300">Geçişte</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div> <span className="text-slate-300">Bırakan</span>
            </div>
        </div>
    </div>
  );
};
