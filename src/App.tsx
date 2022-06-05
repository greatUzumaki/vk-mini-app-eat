import React, { useEffect } from 'react';
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  PlatformType,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { View } from '@cteamdev/router';
import { Home, Info, Persik, Profile } from './pages';
import { Navigation } from './components/navigation';
import { getPlatform } from './utils';
import { useSetAtomState } from '@mntm/precoil';
import { vkUserAtom } from './store';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import './index.css';
import { Configuration, DefaultApi } from './api';
import { setErrorSnackbar } from './hooks';

export const App: React.FC = () => {
  const platform: PlatformType = getPlatform();
  const setVkUser = useSetAtomState(vkUserAtom);

  useEffect(() => {
    const load = async () => {
      const vkUser: UserInfo = await bridge.send('VKWebAppGetUserInfo');
      setVkUser(vkUser);
    };

    load();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const API = new DefaultApi(
        new Configuration({
          accessToken: import.meta.env.VITE_API_TOKEN,
        })
      );
      try {
        const { data } = await API.datasets143VersionsLatestData570Get(1, 5);
        console.log(data);
      } catch {
        setErrorSnackbar('Fetch error, check console');
      }
    };

    fetch();
  }, []);

  return (
    <ConfigProvider platform={platform}>
      <AdaptivityProvider>
        <AppRoot>
          <Navigation>
            <View nav='/'>
              <Home nav='/' />
              <Persik nav='/persik' />
            </View>
            <View nav='/info'>
              <Info nav='/' />
            </View>

            <View nav='/profile'>
              <Profile nav='/' />
            </View>
          </Navigation>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
