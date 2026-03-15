// // services/chatService.ts - FIXED
// export type ChatMessage = {
//   role: 'system' | 'user' | 'assistant';
//   content: string;
// };

// Add Vite env type declarations for TypeScript
interface ImportMetaEnv {
  readonly DEV: boolean;
  readonly VITE_NGROK_URL?: string;
  // add other env variables as needed
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}



// services/chatService.ts - With ngrok support

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

// Get the backend URL based on environment
const getBackendUrl = (): string => {
  // 1. Check if we're in development mode
  if (import.meta.env.DEV) {
    // 2. Check if there's a ngrok URL in environment variables
    if (import.meta.env.VITE_NGROK_URL) {
      console.log('📡 Using ngrok URL from env:', import.meta.env.VITE_NGROK_URL);
      return import.meta.env.VITE_NGROK_URL;
    }
    
    // 3. Check if we're accessing from a different device (not localhost)
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      // We're on a phone/tablet - need to use the laptop's IP or ngrok
      // For now, try to use the same hostname but with port 3001
      console.log('📡 Accessing from remote device, using hostname:', hostname);
      return `http://${hostname}:3001`;
    }
    
    // 4. Default to localhost for local development
    console.log('📡 Using localhost backend');
    return 'http://localhost:3001';
  }
  
  // Production - use relative URLs
  return '';
};

const BACKEND_URL = getBackendUrl();

// Add a function to check if ngrok is working
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
      return `Cannot connect to backend. Make sure the server is running at ${BACKEND_URL}`;
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






















// const BACKEND_URL = 'http://localhost:3001';

// export const sendMessage = async (message: string, context: ChatMessage[]): Promise<string> => {
//   try {
//     console.log('📡 Frontend sending to:', `${BACKEND_URL}/api/chat`);
    
//     const response = await fetch(`${BACKEND_URL}/api/chat`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         message,
//         context
//       })
//     });

//     console.log('📡 Response status:', response.status);

//     const data = await response.json();
//     console.log('📡 Response data:', data);
    
//     // Return response or error message
//     return data.response || data.message || data.error || "Received empty response";
    
//   } catch (error: any) {
//     console.error('📡 sendMessage error:', error.message);
//     return `Connection error: ${error.message}`;
//   }
// };

// export const analyzeWaterData = async (metrics: any[], sensors: any[]): Promise<string> => {
//   try {
//     console.log('📊 Frontend analyzing with:', `${BACKEND_URL}/api/analyze-water-data`);
    
//     const response = await fetch(`${BACKEND_URL}/api/analyze-water-data`, {  // NOTE: Fixed endpoint name
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         metrics,
//         sensors
//       })
//     });

//     const data = await response.json();
//     return data.analysis || data.result || data.error || "Analysis completed";
    
//   } catch (error: any) {
//     console.error('📊 analyzeWaterData error:', error);
//     return `Analysis failed: ${error.message}`;
//   }
// };