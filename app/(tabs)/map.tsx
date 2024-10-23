import Mapbox, { Camera, LocationPuck, MapView } from "@rnmapbox/maps";
import * as Location from "expo-location";
import { useEffect } from "react";
import { Alert } from "react-native";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_KEY ?? "");

export default function TabTwoScreen() {
  console.log("Entry: Inside map.tsx");
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
    })();
  }, []);
  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
      <Camera followUserLocation followZoomLevel={16} />
      <LocationPuck
        puckBearingEnabled
        puckBearing="heading"
        pulsing={{ isEnabled: true }}
      />
    </MapView>
  );
}
