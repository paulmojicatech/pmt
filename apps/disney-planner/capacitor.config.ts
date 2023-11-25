import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Disney Planner',
  webDir: '../../dist/apps/disney-planner',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
};

export default config;
