export interface VectorNode {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'kinetic' | 'cyber' | 'resource' | 'influence';
  instability: number; // 0.0 to 1.0
  radius: number;
  label: string;
}

export interface Briefing {
  id: string;
  classification: string;
  timestamp: string;
  subject: string;
  summary: string;
  implications: string[];
  recommendation: string;
}

export interface SystemState {
  activeView: 'MAP' | 'BRIEFING' | 'ARCHIVE';
  selectedVectorId: string | null;
  isSimulating: boolean;
}
