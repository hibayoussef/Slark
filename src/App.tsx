import { useEffect } from 'react';
import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core';
import './i18n';
import GlobalStyles from './components/GlobalStyles';
import RTL from './components/RTL';
import SettingsDrawer from './modules/settings/components/settings-drawer';
import SplashScreen from './components/SplashScreen';
import useScrollReset from './hooks/useScrollReset';
import gtm from './lib/gtm';
import routes from './routes';
import { createTheme } from './theme';
import {useAuthModule} from "./modules/authentication/zustand";
import {useSettings} from "./modules/settings/zustand";

import React from 'react';
const App: FC = () => {

  const content = useRoutes(routes);
  const settings = useSettings(state => state.settings);
  const isInitialized = useAuthModule(state => state.isInitialized);
  useScrollReset();

  const theme = createTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme
  });



  return (
    <ThemeProvider theme={theme}>
      <RTL direction={settings.direction}>
        <SnackbarProvider
          dense
          maxSnack={3}
        >
          <GlobalStyles />
          <SettingsDrawer />
          {isInitialized ? content : <SplashScreen />}
        </SnackbarProvider>
      </RTL>
    </ThemeProvider>
  );
};

export default App;
