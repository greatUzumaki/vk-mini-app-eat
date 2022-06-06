import { back } from '@cteamdev/router';
import { useAtomValue } from '@mntm/precoil';
import { Icon24Dismiss } from '@vkontakte/icons';
import {
  Div,
  Group,
  Header,
  IOS,
  Link,
  ModalCardProps,
  ModalPage,
  ModalPageHeader,
  ModalPageProps,
  PanelHeaderButton,
  PanelHeaderClose,
  SimpleCell,
  Text,
  usePlatform,
} from '@vkontakte/vkui';
import React from 'react';
import { foodInfo } from '../store';

export const Modal: React.FC<ModalCardProps> = ({ nav }: ModalPageProps) => {
  const info = useAtomValue(foodInfo);
  const platform = usePlatform();

  return (
    <ModalPage
      id={nav}
      nav={nav}
      settlingHeight={100}
      onClose={back}
      header={
        <ModalPageHeader
          left={platform !== IOS && <PanelHeaderClose onClick={back} />}
          right={
            platform === IOS && (
              <PanelHeaderButton onClick={back}>
                <Icon24Dismiss />
              </PanelHeaderButton>
            )
          }
        >
          {info.name}
        </ModalPageHeader>
      }
    >
      <Group header={<Header mode='secondary'>Адрес</Header>}>
        <SimpleCell multiline>{info.address_manual}</SimpleCell>
      </Group>
      {info.www && (
        <Group header={<Header mode='secondary'>Сайт</Header>}>
          <SimpleCell
            Component={Link}
            href={
              info.www.includes('https://') ? info.www : 'https://' + info.www
            }
            target='_blank'
          >
            {info.www}
          </SimpleCell>
        </Group>
      )}
      {info.phone && (
        <Group header={<Header mode='secondary'>Номер телефона</Header>}>
          <SimpleCell multiline Component={Link} href={`tel:${info.phone}`}>
            {info.phone}
          </SimpleCell>
        </Group>
      )}
    </ModalPage>
  );
};
