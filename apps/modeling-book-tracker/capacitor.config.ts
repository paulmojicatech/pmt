import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'modeling-book-tracker',
  webDir: '../../dist/apps/modeling-book-tracker',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
};

export default config;
