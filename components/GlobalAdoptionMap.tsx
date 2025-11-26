
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

// --- DATA SET ---
type Status = 'active' | 'migrating' | 'stopped';

interface University {
    id: string;
    name: string;
    lat: number;
    lng: number;
    status: Status;
    timeline: string;
    details?: string;
}

// Koordinatlar görsel haritaya tam oturması için hafifçe kalibre edilmiştir (Visual Calibration)
const universities: University[] = [
    // Europe
    { id: 'murcia', name: "Univ. of Murcia (Spain)", lat: 39.5, lng: -2.5, status: 'active', timeline: "2009 > Present", details: "Özel araç geliştiricisi." },
    { id: 'lleida', name: "Univ. de Lleida (Spain)", lat: 42.5, lng: 0.62, status: 'active', timeline: "2010 > Present" },
    { id: 'hauts', name: "Hauts-de-France (France)", lat: 50.35, lng: 3.52, status: 'active', timeline: "2012 > Present" },
    { id: 'berlin', name: "Freie Univ. Berlin (Germany)", lat: 52.52, lng: 13.40, status: 'active', timeline: "2015 > Present" },
    { id: 'oxford', name: "Univ. of Oxford (UK)", lat: 53.0, lng: -2.0, status: 'stopped', timeline: "2008 > 2022 (Canvas)", details: "WebLearn kapatıldı." },
    { id: 'cambridge', name: "Univ. of Cambridge (UK)", lat: 52.20, lng: 0.12, status: 'stopped', timeline: "2005 > 2016 (Moodle)" },
    
    // Asia & Middle East
    { id: 'kyoto', name: "Kyoto University (Japan)", lat: 35.01, lng: 135.76, status: 'active', timeline: "2013 > Present", details: "'PandA' sistemi." },
    { id: 'nagoya', name: "Nagoya University (Japan)", lat: 35.18, lng: 136.90, status: 'active', timeline: "2010 > Present" },
    { id: 'lahore', name: "Lahore Univ. (Pakistan)", lat: 31.52, lng: 74.35, status: 'active', timeline: "2009 > Present" },
    { id: 'hutech', name: "HUTECH (Vietnam)", lat: 12.0, lng: 106.62, status: 'active', timeline: "2014 > Present" },
    // Calibrated for visual map: shifted slightly North/West to hit Izmir correctly
    { id: 'yasar', name: "Yaşar University (Turkey)", lat: 39.5, lng: 27.0, status: 'active', timeline: "2012 > Present", details: "İzmir" },
    
    // North America
    { id: 'duke', name: "Duke University (USA)", lat: 36.00, lng: -78.93, status: 'migrating', timeline: "2011 > 2025 (Canvas)", details: "Haziran 2025 son." },
    { id: 'pomona', name: "Pomona College (USA)", lat: 34.09, lng: -117.71, status: 'migrating', timeline: "2010 > 2025 (Canvas)" },
    { id: 'notre', name: "Notre Dame (USA)", lat: 41.70, lng: -86.23, status: 'stopped', timeline: "2011 > 2022 (Canvas)" },
    { id: 'stanford', name: "Stanford (USA)", lat: 37.42, lng: -122.16, status: 'stopped', timeline: "2005 > 2015 (Canvas)" },
    { id: 'michigan', name: "Univ. of Michigan (USA)", lat: 42.27, lng: -83.74, status: 'stopped', timeline: "2004 > 2016 (Canvas)", details: "Kurucu üyelerdendi." },
    { id: 'pepperdine', name: "Pepperdine Univ. (USA)", lat: 34.04, lng: -118.70, status: 'active', timeline: "2010 > Present", details: "Güçlü savunucu." },
    { id: 'dayton', name: "Univ. of Dayton (USA)", lat: 39.75, lng: -84.19, status: 'active', timeline: "2011 > Present" },

    // Africa
    { id: 'unisa', name: "UNISA (South Africa)", lat: -28.0, lng: 24.0, status: 'stopped', timeline: "2007 > 2022 (Moodle)", details: "Devasa kurulumdu." },
    { id: 'ghana', name: "Univ. of Ghana", lat: 7.0, lng: -1.0, status: 'active', timeline: "2014 > Present" }
];

const Marker: React.FC<{ data: University }> = ({ data }) => {
    // Visual Calibration for "World_map_blank_without_borders.svg"
    // This SVG often has padding or isn't perfectly 2:1 equirectangular.
    // We adjust the output slightly to fit the visual landmasses.
    
    const xOffset = 0; // Shift all points horizontally
    const yOffset = -3; // Shift all points vertically (Negative moves UP)

    const left = (((data.lng + 180) / 360) * 100) + xOffset;
    const top = (((90 - data.lat) / 180) * 100) + yOffset;

    const colorClass = {
        active: 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]',
        migrating: 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]',
        stopped: 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]'
    };

    return (
        <div 
            className="absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full cursor-pointer group z-10"
            style={{ left: `${left}%`, top: `${top}%` }}
        >
            {/* Dot */}
            <div className={`w-full h-full rounded-full ${colorClass[data.status]} relative hover:scale-150 transition-transform duration-300 ring-2 ring-slate-900`}>
                <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${colorClass[data.status]}`}></div>
            </div>

            {/* Tooltip (Hover) */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 hidden group-hover:block z-50 animate-fade-in-up">
                <div className="bg-slate-800 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-600 relative">
                    <h4 className="font-bold mb-1 text-sakai-accent">{data.name}</h4>
                    <div className="flex items-center gap-1 mb-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${data.status === 'active' ? 'bg-green-500' : data.status === 'migrating' ? 'bg-orange-500' : 'bg-red-500'}`}></div>
                        <span className="opacity-80 uppercase tracking-wider text-[10px]">
                            {data.status === 'active' ? 'Aktif' : data.status === 'migrating' ? 'Geçişte' : 'Ayrıldı'}
                        </span>
                    </div>
                    <p className="font-mono text-[10px] opacity-70 border-l-2 border-slate-500 pl-2">
                        {data.timeline}
                    </p>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
                </div>
            </div>
        </div>
    );
};

export const GlobalAdoptionMap: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[500px] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex items-center justify-center p-4">
        
        {/* 
            CRITICAL FIX: ASPECT RATIO CONTAINER 
            We use aspect-[2000/857] which matches the specific SVG dimensions of the Wikimedia map.
            This ensures perfect alignment on all screen sizes.
        */}
        <div className="relative w-full max-w-6xl aspect-[2000/857]">
            
            {/* Map Background Layer */}
            <div 
                className="absolute inset-0 w-full h-full bg-contain bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
                    filter: 'invert(1) opacity(0.5) drop-shadow(0 0 2px rgba(255,255,255,0.3))'
                }}
            ></div>

            {/* Markers Layer - Same Coordinate Space */}
            {universities.map((uni) => (
                <Marker key={uni.id} data={uni} />
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur p-4 rounded-xl border border-slate-700 text-white shadow-xl z-20">
                <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3 text-slate-400">Küresel Durum</h4>
                <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></span>
                        <span>Aktif (Sakai Kalesi)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.8)]"></span>
                        <span>Geçiş Aşamasında</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]"></span>
                        <span>Sistemi Bırakanlar</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
};
