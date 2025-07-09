import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapViewComponent from '@/components/MapView';
import {useMap} from '@/hooks/useMap';

const MapScreen: React.FC = () => {
  const {markers, addMarker, checkApiKey} = useMap();

  React.useEffect(() => {
    checkApiKey();
  }, [checkApiKey]);

  const handleMapPress = (coordinate: {
    latitude: number;
    longitude: number;
  }) => {
    addMarker(coordinate);
  };

  // Default location (San Francisco)
  const defaultLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
  };

  return (
    <View style={styles.container}>
      <MapViewComponent
        latitude={defaultLocation.latitude}
        longitude={defaultLocation.longitude}
        markers={markers}
        onMapPress={handleMapPress}
        showUserLocation={true}
        followUserLocation={false}
        zoomLevel={0.0922}
        style={styles.map}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
