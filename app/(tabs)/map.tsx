import { auth, db } from "@/services/firebaseConfig";
import Mapbox, {
  Camera,
  FillLayer,
  LocationPuck,
  MapView,
  ShapeSource,
} from "@rnmapbox/maps";
import * as Location from "expo-location";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_KEY ?? "");

// Define the type for camera bounds
type CameraBounds = {
  ne: [number, number];
  sw: [number, number];
};

export default function MapScreen() {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [cameraBounds, setCameraBounds] = useState<CameraBounds | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
    })();
  }, []);
  useEffect(() => {
    // Get the currently logged-in user from Firebase Auth
    const user = auth.currentUser;

    // Fetch user-specific data from Firestore if the user is logged in
    if (user) {
      fetchUserData(user.uid);
    }
  }, []);

  const fetchUserData = async (uid: string) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.forest && data.forest.teig) {
          // Parse and validate GeoJSON data
          const geoJson = JSON.parse(data.forest.teig);

          if (geoJson.type === "FeatureCollection" && geoJson.features) {
            console.log("GeoJSON features length: ", geoJson.features.length);
            setGeoJsonData(geoJson);
          } else {
            Alert.alert("Invalid GeoJSON format");
            return;
          }

          const bounds = data.forest.bounds;
          if (bounds && bounds._northEast && bounds._southWest) {
            setCameraBounds({
              ne: [bounds._northEast.lng, bounds._northEast.lat],
              sw: [bounds._southWest.lng, bounds._southWest.lat],
            });
          } else {
            Alert.alert("Bounds data is missing or incorrectly formatted");
          }
        } else {
          Alert.alert("No forest.teig data found in the document");
        }
      } else {
        Alert.alert("No document found for the user");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  return (
    <MapView
      style={{ flex: 1 }}
      styleURL="mapbox://styles/mapbox/satellite-v9"
      projection="globe"
    >
      {cameraBounds && (
        <Camera
          bounds={{
            ne: cameraBounds.ne,
            sw: cameraBounds.sw,
          }}
          padding={{
            paddingLeft: 50,
            paddingRight: 50,
            paddingTop: 50,
            paddingBottom: 50,
          }}
          animationDuration={1000}
        />
      )}
      <LocationPuck
        puckBearingEnabled
        puckBearing="heading"
        pulsing={{ isEnabled: true }}
      />
      {geoJsonData && (
        <ShapeSource id="forestTeig" shape={geoJsonData}>
          <FillLayer
            id="fillLayer"
            style={{
              fillColor: "rgba(0, 0, 255, 0.5)",
              fillOutlineColor: "blue",
            }}
          />
        </ShapeSource>
      )}
    </MapView>
  );
}
