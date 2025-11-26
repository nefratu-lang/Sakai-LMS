
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Globe, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

// --- DATA TYPES ---
type Status = 'active' | 'migrating' | 'stopped';

interface University {
    id: string;
    name: string;
    status: Status;
    pos: { top: number; left: number }; // Percentage based positioning (0-100)
    details: string;
}

// --- DATA SET (Fine-Tuned Calibration v4) ---
// Goal: Move points South to align with Turkey/Mediterranean geography correctly.
const universities: University[] = [
    // Europe
    { id: 'murcia', name: "Univ. of Murcia (Spain)", status: 'active', pos: { top: 33, left: 47 }, details: "2009 > Present" },
    { id: 'oxford', name: "Oxford (UK)", status: 'stopped', pos: { top: 26, left: 46 }, details: "Migrated to Canvas (2022)" },
    { id: 'berlin', name: "Freie Univ. Berlin", status: 'active', pos: { top: 28, left: 50 }, details: "2015 > Present" },
    
    // Turkey & Middle East
    // Corrected: Moved South to 34% (Matches approx 38N latitude visually on this projection)
    { id: 'yasar', name: "Yaşar University (Turkey)", status: 'active', pos: { top: 34, left: 54 }, details: "Izmir / 2012 > Present" },
    
    // Asia
    { id: 'lahore', name: "Lahore Univ. (Pakistan)", status: 'active', pos: { top: 38, left: 64 }, details: "2009 > Present" },
    { id: 'kyoto', name: "Kyoto Univ. (Japan)", status: 'active', pos: { top: 34, left: 86 }, details: "Custom 'PandA' System" },
    { id: 'hutech', name: "HUTECH (Vietnam)", status: 'active', pos: { top: 46, left: 78 }, details: "2014 > Present" },

    // North America (USA)
    { id: 'duke', name: "Duke University", status: 'migrating', pos: { top: 33, left: 24 }, details: "Moving to Canvas (2025)" },
    { id: 'stanford', name: "Stanford", status: 'stopped', pos: { top: 33, left: 12 }, details: "Migrated (2015)" },
    { id: 'pepperdine', name: "Pepperdine Univ.", status: 'active', pos: { top: 35, left: 11 }, details: "Strong Sakai Advocate" },
    { id: 'notre', name: "Notre Dame", status: 'stopped', pos: { top: 31, left: 25 }, details: "Migrated (2022)" },
    { id: 'michigan', name: "Univ. of Michigan", status: 'stopped', pos: { top: 30, left: 23 }, details: "Founder / Migrated" },

    // Africa
    { id: 'unisa', name: "UNISA (South Africa)", status: 'stopped', pos: { top: 82, left: 53 }, details: "Migrated to Moodle" },
    { id: 'ghana', name: "Univ. of Ghana", status: 'active', pos: { top: 52, left: 46 }, details: "2014 > Present" }
];

export const GlobalAdoptionMap: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  const getStatusColor = (status: Status) => {
      switch(status) {
          case 'active': return 'bg-green-500 shadow-[0_0_15px_#22c55e]';
          case 'migrating': return 'bg-orange-500 shadow-[0_0_15px_#f97316]';
          case 'stopped': return 'bg-red-500 shadow-[0_0_10px_#ef4444]';
      }
  };

  return (
    <div className="w-full h-full min-h-[500px] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 relative flex items-center justify-center">
        
        {/* Aspect Ratio Container (2:1) locked for World Map */}
        <div className="relative w-full aspect-[2/1] max-w-5xl mx-auto">
            
            {/* MAP IMAGE */}
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg"
                alt="World Map"
                className="w-full h-full object-contain opacity-40 invert"
            />

            {/* MARKERS */}
            {universities.map((uni) => (
                <div 
                    key={uni.id}
                    className="absolute group"
                    style={{ top: `${uni.pos.top}%`, left: `${uni.pos.left}%` }}
                    onMouseEnter={() => setHovered(uni.id)}
                    onMouseLeave={() => setHovered(null)}
                >
                    {/* The Dot */}
                    <div className={`w-3 h-3 -ml-1.5 -mt-1.5 rounded-full cursor-pointer transition-transform hover:scale-150 ${getStatusColor(uni.status)}`} />

                    {/* Tooltip */}
                    <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-48 bg-slate-800 p-3 rounded-lg border border-slate-600 shadow-xl z-20 pointer-events-none transition-all duration-200 ${hovered === uni.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                        <div className="text-white font-bold text-xs mb-1">{uni.name}</div>
                        <div className="text-slate-400 text-[10px] flex items-center gap-1">
                            <Info size={10} /> {uni.details}
                        </div>
                        <div className={`mt-1 text-[10px] uppercase font-bold ${uni.status === 'active' ? 'text-green-400' : uni.status === 'migrating' ? 'text-orange-400' : 'text-red-400'}`}>
                            {uni.status === 'active' ? 'Active User' : uni.status === 'migrating' ? 'Migrating' : 'Stopped'}
                        </div>
                        {/* Arrow */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 border-b border-r border-slate-600"></div>
                    </div>
                </div>
            ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-slate-900/90 p-4 rounded-xl border border-slate-700 backdrop-blur-sm text-xs pointer-events-none">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></div>
                <span className="text-slate-300">Aktif Kullanıcı (Active)</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_5px_#f97316]"></div>
                <span className="text-slate-300">Geçiş Sürecinde (Migrating)</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_#ef4444]"></div>
                <span className="text-slate-300">Bırakanlar (Stopped)</span>
            </div>
        </div>
    </div>
  );
};
