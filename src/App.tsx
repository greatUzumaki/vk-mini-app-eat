import React, { useEffect } from 'react';
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  PlatformType,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { View } from '@cteamdev/router';
import { FoodInfo, Home, Info, Persik, Profile } from './pages';
import { Navigation } from './components/navigation';
import { getPlatform } from './utils';
import { useSetAtomState } from '@mntm/precoil';
import { fetching, markersAtom, vkUserAtom } from './store';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import './index.css';
import { Configuration, DefaultApi, Result } from './api';
import { setErrorSnackbar } from './hooks';

export const App: React.FC = () => {
  const platform: PlatformType = getPlatform();
  const setVkUser = useSetAtomState(vkUserAtom);
  const setMarkers = useSetAtomState(markersAtom);
  const setFetching = useSetAtomState(fetching);

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
        setFetching(true);
        let i = 1;

        while (true) {
          const { data } = await API.datasets143VersionsLatestData570Get(
            i,
            100
          );
          i++;

          data &&
            setMarkers((old) => [...old, ...(data.results as Array<Result>)]);
          if (!data.next) break;
        }
      } catch {
        setErrorSnackbar('Fetch error, check console');
      } finally {
        setFetching(false);
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
              <FoodInfo nav='/foodinfo' />
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
