import React from 'react';
import {View, StyleSheet, Dimensions, ViewStyle} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

interface MapViewComponentProps {
  latitude?: number;
  longitude?: number;
  markers?: Array<{
    id: string;
    latitude: number;
    longitude: number;
    title?: string;
    description?: string;
  }>;
  onMapPress?: (_coordinate: {latitude: number; longitude: number}) => void;
  showUserLocation?: boolean;
  followUserLocation?: boolean;
  zoomLevel?: number;
  style?: ViewStyle;
}

const {width, height} = Dimensions.get('window');

const MapViewComponent: React.FC<MapViewComponentProps> = ({
  latitude = 37.78825,
  longitude = -122.4324,
  markers = [],
  onMapPress,
  showUserLocation = true,
  followUserLocation = false,
  zoomLevel = 0.0922,
  style,
}) => {
  const initialRegion = {
    latitude,
    longitude,
    latitudeDelta: zoomLevel,
    longitudeDelta: zoomLevel * (width / height),
  };

  return (
    <View style={[styles.container, style]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={showUserLocation}
        followsUserLocation={followUserLocation}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
        onPress={
          onMapPress
            ? event => onMapPress(event.nativeEvent.coordinate)
            : undefined
        }>
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
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

export default MapViewComponent;
