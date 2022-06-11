import { View } from '@cteamdev/router';
import { useSetAtomState } from '@mntm/precoil';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  PlatformType,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/fonts.css';
import '@vkontakte/vkui/dist/unstable.css';
import '@vkontakte/vkui/dist/vkui.css';
import React, { useEffect } from 'react';
import { Navigation } from './components/navigation';
import './index.css';
import { FoodInfo, Home, Info, Persik, Profile } from './pages';
import { vkUserAtom } from './store';
import { getPlatform } from './utils';

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
