import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'capacitor-cpu-monitoring-app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
