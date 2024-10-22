import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="map" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Map</ThemedText>
      </ThemedView>
      <ThemedText>This app explores the functionalities of Mapbox</ThemedText>
      <Collapsible title="Default Map">
        <ThemedText>
          This app has two maps:{' '}
          <ThemedText type="defaultSemiBold">Skogbruksplan</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">Thematic map</ThemedText>
        </ThemedText>
        <ExternalLink href="https://github.com/rnmapbox/maps?tab=readme-ov-file">
          <ThemedText type="link">Learn more on GitHub</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android and iOS support">
        <ThemedText>
          The idea is to be able to open this app on Android and iOS.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Offline">
        <ThemedText>
          The Mapbox library is supposed to bring an offline functionality out of the box. 
          We will explore that in this project too.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
