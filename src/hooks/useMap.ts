import {useState, useCallback} from 'react';
import {Alert} from 'react-native';
import {MapService} from '@/services/mapService';

interface Marker {
  id: string;
  latitude: number;
  longitude: number;
  title?: string;
  description?: string;
}

interface UseMapReturn {
  markers: Marker[];
  addMarker: (
    _coordinate: {latitude: number; longitude: number},
    _title?: string,
    _description?: string,
  ) => void;
  removeMarker: (_id: string) => void;
  clearMarkers: () => void;
  checkApiKey: () => void;
}

export const useMap = (): UseMapReturn => {
  const [markers, setMarkers] = useState<Marker[]>([]);

  const addMarker = useCallback(
    (
      coordinate: {latitude: number; longitude: number},
      title?: string,
      description?: string,
    ) => {
      const newMarker: Marker = {
        id: Date.now().toString(),
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        title: title || 'Custom Marker',
        description:
          description ||
          `Lat: ${coordinate.latitude.toFixed(
            4,
          )}, Lng: ${coordinate.longitude.toFixed(4)}`,
      };
      setMarkers(prev => [...prev, newMarker]);
    },
    [],
  );

  const removeMarker = useCallback((id: string) => {
    setMarkers(prev => prev.filter(marker => marker.id !== id));
  }, []);

  const clearMarkers = useCallback(() => {
    setMarkers([]);
  }, []);

  const checkApiKey = useCallback(() => {
    if (!MapService.isApiKeyConfigured()) {
      Alert.alert(
        'Google Maps API Key Not Configured',
        'Please add your Google Maps API key to the .env file and platform-specific configuration files.',
        [{text: 'OK'}],
      );
      return false;
    }
    return true;
  }, []);

  return {
    markers,
    addMarker,
    removeMarker,
    clearMarkers,
    checkApiKey,
  };
};

export default useMap;
