export const COLORS = {
  VOID: '#0A0C10',
  TEXT: '#EDEFF2',
  SIGNAL: '#E6B450',
  FAILURE: '#CC3333', // Only for critical failure
};

export const SIMULATION_CONFIG = {
  NODE_COUNT: 40,
  FIELD_TENSION: 0.005, // Replaces gravity, keeps nodes in horizons
  INSTABILITY_THRESHOLD: 0.7, // Threshold for connections appearing
  CYCLE_DURATION: 45000, // ms for a full "glacial" cycle
};

export const INITIAL_BRIEFING = {
  id: 'INIT-001',
  classification: 'TOP SECRET // NOFORN',
  timestamp: new Date().toISOString(),
  subject: 'GLOBAL STRATEGIC OVERVIEW',
  summary: 'System initialized. Global threat horizons nominal with localized instability sectors in cyber-infrastructure and resource vectors.',
  implications: ['Monitor sector 4.', 'Prepare localized containment protocols.'],
  recommendation: 'MAINTAIN VIGILANCE',
};
