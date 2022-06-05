import { Epic, Structure } from '@cteamdev/router';
import {
  PanelHeader,
  SplitCol,
  SplitLayout,
  useAdaptivity,
  ViewWidth,
} from '@vkontakte/vkui';
import React, { ReactNode } from 'react';
import { Modals } from '../../modals';
import { Popouts } from '../../popouts';
import { CustomSnackbar } from '../snackbar/CustomSnackbar';
import { allPages } from './All-pages';
import { NavigationMenu } from './NavigationMenu';
import { NavigationTabbar } from './NavigationTabbar';

type NavigationProps = {
  children: ReactNode;
};

export const Navigation: React.FC<NavigationProps> = ({
  children,
}: NavigationProps) => {
  const { viewWidth } = useAdaptivity();
  const isDesktop: boolean = (viewWidth ?? 0) >= ViewWidth.SMALL_TABLET;

  return (
    <Structure>
      <SplitLayout
        header={!isDesktop && <PanelHeader separator={false} />}
        style={{ justifyContent: 'center' }}
        modal={<Modals />}
        popout={<Popouts />}
      >
        <SplitCol
          animate={!isDesktop}
          width={isDesktop ? '550px' : '100%'}
          maxWidth={isDesktop ? '550px' : '100%'}
        >
          <Epic tabbar={!isDesktop && <NavigationTabbar items={allPages} />}>
            {children}
          </Epic>
          <CustomSnackbar isDesktop={isDesktop} />
        </SplitCol>
        {isDesktop && <NavigationMenu items={allPages} />}
      </SplitLayout>
    </Structure>
  );
};
