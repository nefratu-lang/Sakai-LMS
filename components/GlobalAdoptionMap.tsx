
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

const universities: University[] = [
    // Europe
    { id: 'murcia', name: "Univ. of Murcia (Spain)", lat: 37.99, lng: -1.13, status: 'active', timeline: "2009 > Present", details: "Özel araç geliştiricisi." },
    { id: 'lleida', name: "Univ. de Lleida (Spain)", lat: 41.61, lng: 0.62, status: 'active', timeline: "2010 > Present" },
    { id: 'hauts', name: "Hauts-de-France (France)", lat: 50.35, lng: 3.52, status: 'active', timeline: "2012 > Present" },
    { id: 'berlin', name: "Freie Univ. Berlin (Germany)", lat: 52.52, lng: 13.40, status: 'active', timeline: "2015 > Present" },
    { id: 'oxford', name: "Univ. of Oxford (UK)", lat: 51.75, lng: -1.25, status: 'stopped', timeline: "2008 > 2022 (Canvas)", details: "WebLearn kapatıldı." },
    { id: 'cambridge', name: "Univ. of Cambridge (UK)", lat: 52.20, lng: 0.12, status: 'stopped', timeline: "2005 > 2016 (Moodle)" },
    
    // Asia
    { id: 'kyoto', name: "Kyoto University (Japan)", lat: 35.01, lng: 135.76, status: 'active', timeline: "2013 > Present", details: "'PandA' sistemi." },
    { id: 'nagoya', name: "Nagoya University (Japan)", lat: 35.18, lng: 136.90, status: 'active', timeline: "2010 > Present" },
    { id: 'lahore', name: "Lahore Univ. (Pakistan)", lat: 31.52, lng: 74.35, status: 'active', timeline: "2009 > Present" },
    { id: 'hutech', name: "HUTECH (Vietnam)", lat: 10.82, lng: 106.62, status: 'active', timeline: "2014 > Present" },
    { id: 'yasar', name: "Yaşar University (Turkey)", lat: 38.42, lng: 27.14, status: 'active', timeline: "2012 > Present", details: "İzmir" },
    
    // North America
    { id: 'duke', name: "Duke University (USA)", lat: 36.00, lng: -78.93, status: 'migrating', timeline: "2011 > 2025 (Canvas)", details: "Haziran 2025 son." },
    { id: 'pomona', name: "Pomona College (USA)", lat: 34.09, lng: -117.71, status: 'migrating', timeline: "2010 > 2025 (Canvas)" },
    { id: 'notre', name: "Notre Dame (USA)", lat: 41.70, lng: -86.23, status: 'stopped', timeline: "2011 > 2022 (Canvas)" },
    { id: 'stanford', name: "Stanford (USA)", lat: 37.42, lng: -122.16, status: 'stopped', timeline: "2005 > 2015 (Canvas)" },
    { id: 'michigan', name: "Univ. of Michigan (USA)", lat: 42.27, lng: -83.74, status: 'stopped', timeline: "2004 > 2016 (Canvas)", details: "Kurucu üyelerdendi." },
    { id: 'pepperdine', name: "Pepperdine Univ. (USA)", lat: 34.04, lng: -118.70, status: 'active', timeline: "2010 > Present", details: "Güçlü savunucu." },
    { id: 'dayton', name: "Univ. of Dayton (USA)", lat: 39.75, lng: -84.19, status: 'active', timeline: "2011 > Present" },

    // Africa
    { id: 'unisa', name: "UNISA (South Africa)", lat: -25.74, lng: 28.18, status: 'stopped', timeline: "2007 > 2022 (Moodle)", details: "Devasa kurulumdu." },
    { id: 'ghana', name: "Univ. of Ghana", lat: 5.60, lng: -0.18, status: 'active', timeline: "2014 > Present" }
];

const Marker = ({ data }: { data: University }) => {
    // Equirectangular Projection Alignment
    // Longitude: -180 to 180 -> 0% to 100%
    // Latitude: 90 to -90 -> 0% to 100%
    const left = ((data.lng + 180) / 360) * 100;
    const top = ((90 - data.lat) / 180) * 100;

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
    <div className="w-full h-full min-h-[500px] relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
        
        {/* Map Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <div 
                className="w-full h-full bg-contain bg-center bg-no-repeat opacity-70 invert transition-opacity duration-500"
                style={{
                    backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
                    filter: 'invert(1) opacity(0.5) drop-shadow(0 0 2px rgba(255,255,255,0.3))'
                }}
            ></div>
        </div>

        {/* Markers Container */}
        {/* We use a 2:1 Aspect Ratio container centered in the div to align markers with the Equirectangular map image */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full aspect-[2/1] max-h-full">
                {universities.map((uni) => (
                    <Marker key={uni.id} data={uni} />
                ))}
            </div>
        </div>

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur p-3 rounded-lg border border-slate-700 text-white shadow-lg z-10">
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2 text-slate-400">Küresel Durum</h4>
            <div className="space-y-1.5 text-xs">
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
  );
};

