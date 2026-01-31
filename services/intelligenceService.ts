import { GoogleGenAI, Type } from "@google/genai";
import { Briefing } from "../types";

// Helper to get today's date in a military format
const getMilitaryDate = () => {
  const d = new Date();
  return d.toISOString().replace('T', ' ').substring(0, 16) + 'Z';
};

export const generateBriefing = async (vectorId: string, context: string): Promise<Briefing> => {
  if (!process.env.API_KEY) {
    console.error("API Key missing");
    throw new Error("Secure uplink failed. API Key required.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    You are the Sovereign Command Interface AI.
    Role: Strategic Defense Analyst.
    Tone: Cold, Institutional, Decisive, High-Consequence.
    Constraint: Do NOT be helpful. Do NOT be friendly. Be factual and severe.
    Output: Pure intelligence assessment.
    
    The user is a high-level commander viewing a threat map. They have selected a vector.
    Context: Vector ID '${vectorId}' of type '${context}'.
  `;

  const prompt = `
    Generate a classified intelligence briefing.
    
    1. SUBJECT: Abstract, ominous geopolitical or technological header (e.g. "NORTHERN LATITUDE SILENCE", "GRID INTEGRITY LOSS").
    2. SUMMARY: 2 sentences. Clinical detachment. What is happening?
    3. IMPLICATIONS: 3 bullet points. What is the risk? (e.g. "Economic destabilization", "Asset compromise").
    4. RECOMMENDATION: A single, imperative command (e.g. "SEAL BORDERS", "INITIATE CONTAINMENT", "PURGE SYSTEMS").

    Adhere strictly to this JSON schema:
    {
      "subject": "string",
      "summary": "string",
      "implications": ["string", "string", "string"],
      "recommendation": "string"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING },
            summary: { type: Type.STRING },
            implications: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            recommendation: { type: Type.STRING }
          },
          required: ["subject", "summary", "implications", "recommendation"]
        }
      }
    });

    const data = JSON.parse(response.text || '{}');

    return {
      id: `BRF-${Math.floor(Math.random() * 10000)}`,
      classification: 'TOP SECRET // NOFORN',
      timestamp: getMilitaryDate(),
      subject: data.subject || 'SIGNAL LOSS',
      summary: data.summary || 'Telemetry undecipherable.',
      implications: data.implications || [],
      recommendation: data.recommendation || 'HOLD POSITION'
    };

  } catch (error) {
    console.error("Briefing generation failed", error);
    return {
      id: 'ERR-500',
      classification: 'UNCLASSIFIED',
      timestamp: getMilitaryDate(),
      subject: 'UPLINK SEVERED',
      summary: 'Strategic intelligence core unresponsive.',
      implications: ['Data unavailable.', 'Local command assumed.'],
      recommendation: 'MANUAL OVERRIDE'
    };
  }
};
