// services/chatService.ts

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

// Add Vite env type declarations for TypeScript
interface ImportMetaEnv {
  readonly DEV: boolean;
  readonly VITE_API_URL?: string; // Changed from VITE_NGROK_URL
  // add other env variables as needed
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Get the backend URL based on environment
const getBackendUrl = (): string => {
  // 1. Check if we're in development mode
  if (import.meta.env.DEV) {
    // 2. Check if there's a API URL in environment variables (for production testing)
    if (import.meta.env.VITE_API_URL) {
      console.log('📡 Using API URL from env:', import.meta.env.VITE_API_URL);
      return import.meta.env.VITE_API_URL;
    }
    
    // 3. Check if we're accessing from a different device (not localhost)
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      // We're on a phone/tablet - need to use the laptop's IP
      console.log('📡 Accessing from remote device, using hostname:', hostname);
      return `http://${hostname}:3001`;
    }
    
    // 4. Default to localhost for local development
    console.log('📡 Using localhost backend');
    return 'http://localhost:3001';
  }
  
  // Production - use your Render URL
  // This is the key change - use the actual Render URL in production
  return 'https://chatbot-hydrogaurd-server.onrender.com';
};

const BACKEND_URL = getBackendUrl();

// Add a function to check if backend is working
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/health`);
    return response.ok;
  } catch {
    return false;
  }
};

export const sendMessage = async (message: string, context: ChatMessage[]): Promise<string> => {
  try {
    const url = `${BACKEND_URL}/api/chat`;
    console.log('📡 Frontend sending to:', url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        context
      })
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('📡 Error response:', errorText);
      return `Server error (${response.status}): ${errorText}`;
    }

    const data = await response.json();
    console.log('📡 Response data:', data);
    
    // Return response or error message
    return data.response || data.message || data.error || "Received empty response";
    
  } catch (error: any) {
    console.error('📡 sendMessage error:', error.message);
    
    // Provide helpful error message based on the situation
    if (error.message.includes('Failed to fetch')) {
      return `Cannot connect to backend at ${BACKEND_URL}. Make sure the server is running.`;
    }
    
    return `Connection error: ${error.message}`;
  }
};

export const analyzeWaterData = async (metrics: any[], sensors: any[]): Promise<string> => {
  try {
    const url = `${BACKEND_URL}/api/analyze-water-data`;
    console.log('📊 Frontend analyzing with:', url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metrics,
        sensors
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return `Analysis failed (${response.status}): ${errorText}`;
    }

    const data = await response.json();
    return data.analysis || data.result || data.error || "Analysis completed";
    
  } catch (error: any) {
    console.error('📊 analyzeWaterData error:', error);
    return `Analysis failed: ${error.message}`;
  }
};

// New function to get the current backend URL (useful for debugging)
export const getCurrentBackendUrl = (): string => {
  return BACKEND_URL;
};
