"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Environment } from "@react-three/drei";
import { useState, useRef, Suspense } from "react";
import * as THREE from "three";

interface BrainRegion {
  id: string;
  name: string;
  germanName: string;
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
  hoverColor: string;
  description: string;
  businessRelevance: string[];
}

const brainRegions: BrainRegion[] = [
  {
    id: "prefrontal",
    name: "Prefrontal Cortex",
    germanName: "Präfrontaler Kortex",
    position: [0, 0.3, 1.2],
    scale: [1.4, 0.9, 0.8],
    color: "#1a3a4a",
    hoverColor: "#22d3ee",
    description: "Das Kontrollzentrum des Gehirns – zuständig für Planung, Entscheidungsfindung und Impulskontrolle.",
    businessRelevance: [
      "Strategische Entscheidungsfindung",
      "Langfristige Planung",
      "Impulskontrolle bei Kaufentscheidungen",
      "Führungskompetenz"
    ]
  },
  {
    id: "amygdala",
    name: "Amygdala",
    germanName: "Amygdala",
    position: [0.5, -0.3, 0.3],
    scale: [0.35, 0.35, 0.35],
    color: "#1a3a4a",
    hoverColor: "#22d3ee",
    description: "Das emotionale Zentrum – verarbeitet Angst, Freude und emotionale Erinnerungen.",
    businessRelevance: [
      "Emotionale Kaufentscheidungen",
      "Markenvertrauen aufbauen",
      "Risikobewertung",
      "Erste Eindrücke & Vertrauen"
    ]
  },
  {
    id: "amygdala-left",
    name: "Amygdala (Left)",
    germanName: "Amygdala (links)",
    position: [-0.5, -0.3, 0.3],
    scale: [0.35, 0.35, 0.35],
    color: "#1a3a4a",
    hoverColor: "#22d3ee",
    description: "Das emotionale Zentrum – verarbeitet Angst, Freude und emotionale Erinnerungen.",
    businessRelevance: [
      "Emotionale Kaufentscheidungen",
      "Markenvertrauen aufbauen",
      "Risikobewertung",
      "Erste Eindrücke & Vertrauen"
    ]
  },
  {
    id: "hippocampus",
    name: "Hippocampus",
    germanName: "Hippocampus",
    position: [0.6, -0.4, -0.2],
    scale: [0.5, 0.25, 0.3],
    color: "#1a3a4a",
    hoverColor: "#22d3ee",
    description: "Das Gedächtniszentrum – wandelt Erlebnisse in dauerhafte Erinnerungen um.",
    businessRelevance: [
      "Markenerinnerung & Wiedererkennung",
      "Kundenerlebnisse verankern",
      "Lernprozesse im Unternehmen",
      "Storytelling-Wirkung"
    ]
  },
  {
    id: "hippocampus-left",
    name: "Hippocampus (Left)",
    germanName: "Hippocampus (links)",
    position: [-0.6, -0.4, -0.2],
    scale: [0.5, 0.25, 0.3],
    color: "#1a3a4a",
    hoverColor: "#22d3ee",
    description: "Das Gedächtniszentrum – wandelt Erlebnisse in dauerhafte Erinnerungen um.",
    businessRelevance: [
      "Markenerinnerung & Wiedererkennung",
      "Kundenerlebnisse verankern",
      "Lernprozesse im Unternehmen",
      "Storytelling-Wirkung"
    ]
  },
  {
    id: "nucleus-accumbens",
    name: "Nucleus Accumbens",
    germanName: "Nucleus Accumbens",
    position: [0.25, -0.2, 0.6],
    scale: [0.25, 0.2, 0.25],
    color: "#1a3a4a",
    hoverColor: "#22d3ee",
    description: "Das Belohnungszentrum – reagiert auf Dopamin und steuert Motivation.",
    businessRelevance: [
      "Kundenbindung & Loyalitätsprogramme",
      "Mitarbeitermotivation",
      "Gamification-Strategien",
      "Belohnungsbasiertes Marketing"
    ]
  },
  {
    id: "nucleus-accumbens-left",
    name: "Nucleus Accumbens (Left)",
    germanName: "Nucleus Accumbens (links)",
    position: [-0.25, -0.2, 0.6],
    scale: [0.25, 0.2, 0.25],
    color: "#1a3a4a",
    hoverColor: "#22d3ee",
    description: "Das Belohnungszentrum – reagiert auf Dopamin und steuert Motivation.",
    businessRelevance: [
      "Kundenbindung & Loyalitätsprogramme",
      "Mitarbeitermotivation",
      "Gamification-Strategien",
      "Belohnungsbasiertes Marketing"
    ]
  },
  {
    id: "insula",
    name: "Insula",
    germanName: "Insula",
    position: [0.9, 0, 0],
    scale: [0.2, 0.6, 0.5],
    color: "#1a3a4a",
    hoverColor: "#22d3ee",
    description: "Das Bauchgefühl-Zentrum – integriert körperliche Empfindungen mit Emotionen.",
    businessRelevance: [
      "Intuitive Entscheidungen",
      "Authentizitätswahrnehmung",
      "Risikoeinschätzung",
      "Empathie in Führung"
    ]
  },
  {
    id: "insula-left",
    name: "Insula (Left)",
    germanName: "Insula (links)",
    position: [-0.9, 0, 0],
    scale: [0.2, 0.6, 0.5],
    color: "#1a3a4a",
    hoverColor: "#22d3ee",
    description: "Das Bauchgefühl-Zentrum – integriert körperliche Empfindungen mit Emotionen.",
    businessRelevance: [
      "Intuitive Entscheidungen",
      "Authentizitätswahrnehmung",
      "Risikoeinschätzung",
      "Empathie in Führung"
    ]
  },
  {
    id: "temporal",
    name: "Temporal Lobe",
    germanName: "Temporallappen",
    position: [1.1, -0.1, -0.3],
    scale: [0.4, 0.7, 0.9],
    color: "#0f2a36",
    hoverColor: "#22d3ee",
    description: "Verarbeitet Sprache, Hören und komplexe visuelle Informationen.",
    businessRelevance: [
      "Sprachverarbeitung in Marketing",
      "Audiobranding & Sounddesign",
      "Gesichtserkennung & Personal Branding",
      "Narrative Verarbeitung"
    ]
  },
  {
    id: "temporal-left",
    name: "Temporal Lobe (Left)",
    germanName: "Temporallappen (links)",
    position: [-1.1, -0.1, -0.3],
    scale: [0.4, 0.7, 0.9],
    color: "#0f2a36",
    hoverColor: "#22d3ee",
    description: "Verarbeitet Sprache, Hören und komplexe visuelle Informationen.",
    businessRelevance: [
      "Sprachverarbeitung in Marketing",
      "Audiobranding & Sounddesign",
      "Gesichtserkennung & Personal Branding",
      "Narrative Verarbeitung"
    ]
  },
  {
    id: "parietal",
    name: "Parietal Lobe",
    germanName: "Parietallappen",
    position: [0, 0.6, -0.5],
    scale: [1.6, 0.7, 1],
    color: "#0f2a36",
    hoverColor: "#22d3ee",
    description: "Integriert sensorische Informationen und räumliche Orientierung.",
    businessRelevance: [
      "Räumliches Design & UX",
      "Aufmerksamkeitssteuerung",
      "Multisensorisches Marketing",
      "Produktplatzierung"
    ]
  },
  {
    id: "occipital",
    name: "Occipital Lobe",
    germanName: "Okzipitallappen",
    position: [0, 0.2, -1.3],
    scale: [1.2, 0.8, 0.6],
    color: "#0f2a36",
    hoverColor: "#22d3ee",
    description: "Das visuelle Zentrum – verarbeitet alles, was wir sehen.",
    businessRelevance: [
      "Visuelles Marketing & Design",
      "Farbpsychologie",
      "Logo- & Markenwahrnehmung",
      "Eye-Tracking-Optimierung"
    ]
  },
  {
    id: "cerebellum",
    name: "Cerebellum",
    germanName: "Kleinhirn",
    position: [0, -0.7, -0.9],
    scale: [1.1, 0.6, 0.7],
    color: "#0a1f29",
    hoverColor: "#22d3ee",
    description: "Koordiniert Bewegungen und ist an Lernprozessen beteiligt.",
    businessRelevance: [
      "Motorisches Lernen",
      "Gewohnheitsbildung",
      "Automatisierte Verhaltensweisen",
      "Timing & Rhythmus in Kommunikation"
    ]
  },
  {
    id: "brainstem",
    name: "Brainstem",
    germanName: "Hirnstamm",
    position: [0, -0.9, -0.3],
    scale: [0.4, 0.6, 0.4],
    color: "#0a1f29",
    hoverColor: "#22d3ee",
    description: "Steuert lebenswichtige Funktionen wie Atmung und Herzschlag.",
    businessRelevance: [
      "Stressreaktionen verstehen",
      "Fight-or-Flight in Verhandlungen",
      "Grundlegende Aufmerksamkeit",
      "Arousal & Aktivierung"
    ]
  }
];

function BrainRegionMesh({ 
  region, 
  isSelected, 
  onSelect 
}: { 
  region: BrainRegion; 
  isSelected: boolean;
  onSelect: (region: BrainRegion | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = isHovered || isSelected ? 1.1 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(
          region.scale[0] * targetScale,
          region.scale[1] * targetScale,
          region.scale[2] * targetScale
        ),
        0.1
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={region.position}
      scale={region.scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setIsHovered(false);
        document.body.style.cursor = "default";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(isSelected ? null : region);
      }}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={isHovered || isSelected ? region.hoverColor : region.color}
        transparent
        opacity={isHovered || isSelected ? 1 : 0.85}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
}

function BrainModel({ 
  selectedRegion, 
  onSelectRegion 
}: { 
  selectedRegion: BrainRegion | null;
  onSelectRegion: (region: BrainRegion | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current && !selectedRegion) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main brain hemisphere shape */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#0d2833"
          transparent
          opacity={0.3}
          roughness={0.6}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Brain regions */}
      {brainRegions.map((region) => (
        <BrainRegionMesh
          key={region.id}
          region={region}
          isSelected={selectedRegion?.id === region.id}
          onSelect={onSelectRegion}
        />
      ))}

      {/* Central fissure line */}
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 3, 16]} />
        <meshStandardMaterial color="#22d3ee" opacity={0.5} transparent />
      </mesh>
    </group>
  );
}

function InfoPanel({ region, onClose }: { region: BrainRegion; onClose: () => void }) {
  return (
    <div className="absolute right-4 top-4 w-80 bg-card/95 backdrop-blur-sm border border-primary/30 rounded-xl p-6 shadow-2xl z-10">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
        </svg>
      </button>
      
      <div className="mb-4">
        <span className="text-xs font-medium text-primary uppercase tracking-wider">{region.name}</span>
        <h3 className="text-xl font-bold mt-1">{region.germanName}</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        {region.description}
      </p>
      
      <div>
        <h4 className="text-sm font-semibold mb-2 text-primary">Relevanz für Unternehmen:</h4>
        <ul className="space-y-1.5">
          {region.businessRelevance.map((item, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Brain3D() {
  const [selectedRegion, setSelectedRegion] = useState<BrainRegion | null>(null);

  return (
    <div className="relative w-full h-[600px] md:h-[700px] bg-gradient-to-b from-background to-muted/30 rounded-xl overflow-hidden">
      {/* Instructions */}
      <div className="absolute left-4 top-4 z-10 bg-card/80 backdrop-blur-sm border border-border rounded-lg px-4 py-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Klicken</span> Sie auf ein Hirnareal für Details
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Ziehen zum Rotieren • Scrollen zum Zoomen
        </p>
      </div>

      {/* Info Panel */}
      {selectedRegion && (
        <InfoPanel region={selectedRegion} onClose={() => setSelectedRegion(null)} />
      )}

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} />
          <pointLight position={[0, 0, 3]} intensity={0.5} color="#22d3ee" />
          
          <BrainModel 
            selectedRegion={selectedRegion} 
            onSelectRegion={setSelectedRegion}
          />
          
          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            autoRotate={!selectedRegion}
            autoRotateSpeed={0.5}
          />
          
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 justify-center">
        {["Präfrontaler Kortex", "Amygdala", "Hippocampus", "Nucleus Accumbens", "Insula"].map((name) => (
          <button
            key={name}
            onClick={() => {
              const region = brainRegions.find(r => r.germanName === name || r.germanName.startsWith(name));
              if (region) setSelectedRegion(region);
            }}
            className="text-xs px-3 py-1.5 bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 rounded-full transition-colors"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
