import { useState } from "react";
import { CloudRain, Thermometer, Wind } from "lucide-react";

const LAYERS = [
    { id: "precipitation_new", label: "Pluie", icon: CloudRain },
    { id: "temp_new", label: "Température", icon: Thermometer },
    { id: "wind_new", label: "Vent", icon: Wind },
] as const;

type LayerId = (typeof LAYERS)[number]["id"];

const CITIES = [
    { name: "Lille", x: 52, y: 15 },
    { name: "Paris", x: 48, y: 30 },
    { name: "Lyon", x: 58, y: 52 },
    { name: "Bordeaux", x: 34, y: 58 },
    { name: "Toulouse", x: 40, y: 72 },
    { name: "Marseille", x: 60, y: 78 },
];

const FRANCE_OUTLINE =
    "M 48,8 L 62,12 68,28 72,42 65,55 62,70 55,82 45,85 35,75 28,60 22,45 25,30 32,18 Z";

export default function MapsPage() {
    const [activeLayer, setActiveLayer] = useState<LayerId>("precipitation_new");

    return (
        <main className="max-w-screen-2xl mx-auto p-4">
            <div className="glass-card p-6 flex flex-col gap-5">
                <div className="flex items-start justify-between">
                    <div>
                        <span className="text-white/50 text-sm">/maps</span>
                        <h2 className="text-white font-bold text-2xl">Cartes météo</h2>
                    </div>
                    <span className="text-white/50 text-sm">
                        Pluie • Température • Vent
                    </span>
                </div>

                <div className="flex gap-2">
                    {LAYERS.map((layer) => {
                        const Icon = layer.icon;
                        return (
                            <button
                                key={layer.id}
                                onClick={() => setActiveLayer(layer.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeLayer === layer.id
                                    ? "bg-white/20 text-white border border-white/20"
                                    : "text-white/50 hover:text-white/70"
                                    }`}
                            >
                                <Icon size={14} />
                                {layer.label}
                            </button>
                        );
                    })}
                </div>

                <div className="relative glass-card-inner rounded-2xl overflow-hidden min-h-[500px]">
                    {/* Mock map SVG */}
                    <svg
                        viewBox="0 0 100 95"
                        className="w-full h-full absolute inset-0"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        {/* France outline */}
                        <path
                            d={FRANCE_OUTLINE}
                            fill="rgba(255,255,255,0.06)"
                            stroke="rgba(255,255,255,0.25)"
                            strokeWidth="0.5"
                        />
                        {/* Inner grid lines for decoration */}
                        <path
                            d="M 48,8 L 48,85"
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="0.3"
                        />
                        <path
                            d="M 22,45 L 72,45"
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="0.3"
                        />
                        <path
                            d="M 32,18 L 62,70"
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="0.3"
                        />
                        <path
                            d="M 25,30 L 68,28"
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="0.3"
                        />
                        <path
                            d="M 28,60 L 65,55"
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="0.3"
                        />

                        {/* City dots and labels */}
                        {CITIES.map((city) => (
                            <g key={city.name}>
                                <circle
                                    cx={city.x}
                                    cy={city.y}
                                    r="1"
                                    fill="white"
                                />
                                <text
                                    x={city.x + 2}
                                    y={city.y + 1}
                                    fill="white"
                                    fontSize="3.5"
                                    fontFamily="sans-serif"
                                >
                                    {city.name}
                                </text>
                            </g>
                        ))}
                    </svg>

                    {/* Layer legend */}
                    <div className="absolute top-4 right-4 glass-card p-3 rounded-xl flex flex-col gap-2 min-w-[160px]">
                        <div>
                            <span className="text-white/60 text-xs">Couche</span>
                            <p className="text-white font-semibold text-sm">{activeLayer}</p>
                        </div>
                        <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 via-yellow-300 to-red-500" />
                        <div className="flex justify-between">
                            <span className="text-white/50 text-[10px]">Faible</span>
                            <span className="text-white/50 text-[10px]">Fort</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
