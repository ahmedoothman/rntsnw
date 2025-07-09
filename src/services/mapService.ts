import {GOOGLE_MAPS_API_KEY} from '@env';

export class MapService {
  static getApiKey(): string {
    return GOOGLE_MAPS_API_KEY || 'your_google_maps_api_key_here';
  }

  static isApiKeyConfigured(): boolean {
    return (
      !!GOOGLE_MAPS_API_KEY &&
      GOOGLE_MAPS_API_KEY !== 'your_google_maps_api_key_here'
    );
  }
}

export default MapService;
