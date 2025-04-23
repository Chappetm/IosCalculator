
import type { PropsWithChildren } from 'react';
import {
  StatusBar,
  Text,
  View,
} from 'react-native';
import { CalculatorScreen } from './presentation/screens/CalculatorScreen';
import { styles } from './presentation/theme/app-theme';

type SectionProps = PropsWithChildren<{
  title: string;
}>;



function App() {

  return (
    <View style={styles.background}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'black'}
      />
      <CalculatorScreen />
    </View>
  );
}



export default App;
