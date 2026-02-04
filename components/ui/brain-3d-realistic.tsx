"use client";

import { Canvas, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import { useState, useRef, Suspense, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Brain, ChevronRight, X, RotateCcw, ZoomIn, Mouse } from "lucide-react";

interface BrainRegionInfo {
  id: string;
  meshNames: string[];
  name: string;
  germanName: string;
  color: string;
  description: string;
  businessRelevance: string[];
}

// Original-Farben aus dem GLB-Modell beibehalten
// Material.007 -> Frontal Lobe (dunkel-lila)
// Material.011 -> Frontal2, Frontal3 (lila)
// Material.004 -> Parietal Lobe (grün)
// Material.009 -> Parietal2, Parietal Limbic (hellgrün)
// Material.008 -> Temporal Lobe (orange/gelb)
// Material.013 -> Temporal Limbic (beige/gelb)
// Material.006 -> Occipital Lobe (pink/magenta)
// Material.003 -> Corpus Callosum (schwarz)

// Korrekte Zuordnung basierend auf Farben im 3D-Modell:
// Object_5 (Grau) = Brainstem, Object_7 (Gelb) = Parietal, Object_9 (Rosa) = Frontal
// Object_13 = Cerebellum, Object_15 (Lila) = Occipital, Object_17 (Grün) = Temporal
const brainRegionsData: BrainRegionInfo[] = [
  {
    id: "frontal-lobe",
    meshNames: ["Object_9"],
    name: "Frontal Lobe",
    germanName: "Frontallappen",
    color: "#60a5fa",
    description: "Der Frontallappen ist das Kontrollzentrum des Gehirns. Er ist zuständig für Planung, Entscheidungsfindung, Persönlichkeit und die Steuerung von Impulsen.",
    businessRelevance: [
      "Strategische Entscheidungsfindung in Führungspositionen",
      "Impulskontrolle bei Kaufentscheidungen",
      "Langfristige Planung und Zielsetzung",
      "Problemlösung und kreatives Denken",
      "Führungskompetenz und Selbstregulation"
    ]
  },
  {
    id: "parietal-lobe",
    meshNames: ["Object_15"],
    name: "Parietal Lobe",
    germanName: "Parietallappen",
    color: "#3b82f6",
    description: "Der Parietallappen integriert sensorische Informationen und ist entscheidend für räumliche Orientierung, Aufmerksamkeit und die Verarbeitung von Berührungen.",
    businessRelevance: [
      "Räumliches Design und UX-Gestaltung",
      "Aufmerksamkeitssteuerung in Werbung",
      "Multisensorisches Marketing",
      "Produktplatzierung und Store-Layout",
      "Haptische Markenerlebnisse"
    ]
  },
  {
    id: "temporal-lobe",
    meshNames: ["Object_17"],
    name: "Temporal Lobe",
    germanName: "Temporallappen",
    color: "#2563eb",
    description: "Der Temporallappen verarbeitet auditive Informationen, Sprache und ist am Gedächtnis sowie der emotionalen Verarbeitung beteiligt. Enthält den Auditory Cortex.",
    businessRelevance: [
      "Sprachverarbeitung in Werbebotschaften",
      "Audiobranding und Sounddesign",
      "Narrative Verarbeitung und Storytelling",
      "Gesichtserkennung für Personal Branding",
      "Emotionale Resonanz in Kommunikation"
    ]
  },
  {
    id: "visual-cortex",
    meshNames: ["Object_13"],
    name: "Visual Cortex",
    germanName: "Visueller Kortex & Okzipitallappen",
    color: "#93c5fd",
    description: "Der visuelle Cortex im Okzipitallappen verarbeitet alle visuellen Informationen. Er ist für die Erkennung von Formen, Farben und Bewegungen zuständig.",
    businessRelevance: [
      "Visuelle Wahrnehmung in Werbung",
      "Bildverarbeitung und Design",
      "Farbpsychologie",
      "Bewegtbild und Video-Marketing",
      "Visuelle Aufmerksamkeit steuern"
    ]
  },
  {
    id: "auditory-cortex",
    meshNames: [],
    name: "Auditory Cortex",
    germanName: "Auditorischer Cortex",
    color: "#2563eb",
    description: "Der auditorische Cortex im Temporallappen verarbeitet alle akustischen Informationen – Sprache, Musik, Geräusche.",
    businessRelevance: [
      "Audiobranding und Jingles",
      "Podcast- und Voice-Marketing",
      "Sounddesign in Werbung",
      "Sprachverarbeitung",
      "Musik und Emotionen"
    ]
  },
  {
    id: "cerebellum",
    meshNames: ["Object_7"],
    name: "Cerebellum",
    germanName: "Kleinhirn",
    color: "#1d4ed8",
    description: "Das Kleinhirn koordiniert Bewegungen und ist für Gleichgewicht, Feinmotorik und motorisches Lernen zuständig.",
    businessRelevance: [
      "Automatisierte Verhaltensweisen",
      "Gewohnheitsbildung bei Kunden",
      "Motorisches Lernen und Training",
      "Koordination von Abläufen",
      "Feinabstimmung von Prozessen"
    ]
  },
  {
    id: "brainstem",
    meshNames: ["Object_5"],
    name: "Brainstem & Spinal Cord",
    germanName: "Hirnstamm & Rückenmark",
    color: "#1e40af",
    description: "Der Hirnstamm (inkl. Pons) und das Rückenmark steuern lebenswichtige Funktionen wie Atmung, Herzschlag und grundlegende Reflexe. Hier befinden sich auch Olfactory Bulb und Optic Nerve.",
    businessRelevance: [
      "Grundlegende Bedürfnisse und Instinkte",
      "Fight-or-Flight-Reaktionen",
      "Unbewusste Entscheidungsprozesse",
      "Stressreaktionen verstehen",
      "Basisemotionen im Marketing"
    ]
  }
];

// Helper function to match mesh name to region
function matchMeshToRegion(meshName: string): BrainRegionInfo | null {
  for (const region of brainRegionsData) {
    if (region.meshNames.includes(meshName)) {
      return region;
    }
  }
  return null;
}

function BrainModelLoader({ 
  selectedRegion, 
  hoveredRegion,
  onSelectRegion,
  onHoverRegion
}: { 
  selectedRegion: string | null;
  hoveredRegion: string | null;
  onSelectRegion: (id: string | null) => void;
  onHoverRegion: (id: string | null) => void;
}) {
  const { scene } = useGLTF("/models/brain_diagram.glb");

  // Hide labels (Object_11) and apply PROVOID colors
  useEffect(() => {
    // Blue gradient palette - distinct shades
    const meshColors: Record<string, string> = {
      "Object_9": "#60a5fa",   // Frontallappen - Sky Blue
      "Object_15": "#3b82f6",  // Parietallappen - Blue
      "Object_17": "#2563eb",  // Temporallappen - Royal Blue
      "Object_13": "#93c5fd",  // Visueller Kortex - Light Blue
      "Object_7": "#1d4ed8",   // Kleinhirn - Dark Blue
      "Object_5": "#1e40af",   // Hirnstamm - Navy
    };

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Hide labels
        if (child.name === "Object_11") {
          child.visible = false;
          return;
        }
        
        // Apply custom colors
        const customColor = meshColors[child.name];
        if (customColor && child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((mat) => {
            if (mat && 'color' in mat) {
              (mat as THREE.MeshStandardMaterial).color = new THREE.Color(customColor);
            }
          });
        }
      }
    });
  }, [scene]);

  // Apply highlighting based on selection/hover
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const region = matchMeshToRegion(child.name);
        if (!region) return;
        
        // Handle both single material and material array
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        
        materials.forEach((mat) => {
          if (mat && 'emissive' in mat) {
            const material = mat as THREE.MeshStandardMaterial;
            
            if (region.id === selectedRegion) {
              material.emissive = new THREE.Color("#22d3ee");
              material.emissiveIntensity = 0.5;
              material.opacity = 1;
              material.transparent = false;
            } else if (region.id === hoveredRegion) {
              material.emissive = new THREE.Color("#22d3ee");
              material.emissiveIntensity = 0.3;
              material.opacity = 1;
              material.transparent = false;
            } else if (selectedRegion) {
              material.emissive = new THREE.Color("#000000");
              material.emissiveIntensity = 0;
              material.opacity = 0.3;
              material.transparent = true;
            } else {
              material.emissive = new THREE.Color("#000000");
              material.emissiveIntensity = 0;
              material.opacity = 1;
              material.transparent = false;
            }
          }
        });
      }
    });
  }, [scene, selectedRegion, hoveredRegion]);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    
    // Find first non-label intersection (skip Object_11 which is text labels)
    for (const intersection of event.intersections) {
      const mesh = intersection.object as THREE.Mesh;
      if (mesh.name === "Object_11") continue; // Skip labels
      
      // DEBUG: Log mesh name to console
      console.log("Clicked mesh:", mesh.name);
      
      const region = matchMeshToRegion(mesh.name);
      if (region) {
        onSelectRegion(selectedRegion === region.id ? null : region.id);
        return;
      }
    }
  };

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    document.body.style.cursor = "pointer";
    
    // Find first non-label intersection
    for (const intersection of event.intersections) {
      const mesh = intersection.object as THREE.Mesh;
      if (mesh.name === "Object_11") continue; // Skip labels
      
      const region = matchMeshToRegion(mesh.name);
      if (region) {
        onHoverRegion(region.id);
        return;
      }
    }
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
    onHoverRegion(null);
  };

  return (
    <Center>
      <group scale={1} rotation={[0, Math.PI, 0]}>
        <primitive 
          object={scene} 
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        />
      </group>
    </Center>
  );
}

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/80">
      <div className="flex flex-col items-center gap-4">
        <Brain className="w-12 h-12 text-primary animate-pulse" />
        <p className="text-sm text-muted-foreground">Lade 3D-Modell...</p>
      </div>
    </div>
  );
}

interface SidebarProps {
  regions: BrainRegionInfo[];
  selectedRegion: string | null;
  onSelectRegion: (id: string | null) => void;
}

function Sidebar({ regions, selectedRegion, onSelectRegion }: SidebarProps) {
  const selectedInfo = regions.find(r => r.id === selectedRegion);

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 text-primary mb-1">
          <Brain className="w-5 h-5" />
          <span className="font-semibold">Neuro-Atlas</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Klicken Sie auf ein Hirnareal
        </p>
      </div>

      {/* Region List */}
      <div className="flex-1 overflow-y-auto">
        {!selectedInfo ? (
          <div className="p-2">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => onSelectRegion(region.id)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left group"
              >
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: region.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{region.germanName}</p>
                  <p className="text-xs text-muted-foreground truncate">{region.name}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        ) : (
          <div className="p-4">
            {/* Back button */}
            <button
              onClick={() => onSelectRegion(null)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Alle Areale anzeigen
            </button>

            {/* Selected region info */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: selectedInfo.color }}
                />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {selectedInfo.name}
                </span>
              </div>
              <h3 className="text-xl font-bold">{selectedInfo.germanName}</h3>
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {selectedInfo.description}
            </p>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-primary flex items-center gap-2">
                <span className="w-1 h-4 bg-primary rounded-full" />
                Relevanz für Unternehmen
              </h4>
              <ul className="space-y-2">
                {selectedInfo.businessRelevance.map((item, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Footer - Credits */}
      <div className="p-3 border-t border-border bg-muted/30">
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          3D-Modell: Ruth Lilly Medical Library, IU School of Medicine · CC BY-NC-SA
        </p>
      </div>
    </div>
  );
}

export function Brain3DRealistic() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex h-[700px] rounded-xl overflow-hidden border border-border bg-gradient-to-br from-background to-muted/30">
      {/* Sidebar */}
      <Sidebar 
        regions={brainRegionsData}
        selectedRegion={selectedRegion}
        onSelectRegion={setSelectedRegion}
      />

      {/* 3D Viewer */}
      <div className="flex-1 relative">
        {/* Controls hint */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg px-3 py-2 flex items-center gap-2">
            <Mouse className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Ziehen zum Rotieren</span>
          </div>
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg px-3 py-2 flex items-center gap-2">
            <ZoomIn className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Scrollen zum Zoomen</span>
          </div>
        </div>

        {/* Reset button */}
        {selectedRegion && (
          <button
            onClick={() => setSelectedRegion(null)}
            className="absolute top-4 left-4 z-10 bg-card/80 backdrop-blur-sm border border-border rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-card transition-colors"
          >
            <X className="w-4 h-4" />
            <span className="text-xs">Auswahl aufheben</span>
          </button>
        )}

        {/* Loading */}
        {isLoading && <LoadingSpinner />}

        {/* Canvas */}
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          onCreated={() => setIsLoading(false)}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <directionalLight position={[-10, -10, -5]} intensity={0.4} />
            <pointLight position={[0, 0, 5]} intensity={0.3} color="#22d3ee" />
            
            <BrainModelLoader
              selectedRegion={selectedRegion}
              hoveredRegion={hoveredRegion}
              onSelectRegion={setSelectedRegion}
              onHoverRegion={setHoveredRegion}
            />
            
            <OrbitControls
              enablePan={false}
              minDistance={1}
              maxDistance={50}
              autoRotate={false}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

// Preload the model
useGLTF.preload("/models/brain_diagram.glb");
