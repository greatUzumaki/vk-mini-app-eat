import { back } from '@cteamdev/router';
import { useAtomValue } from '@mntm/precoil';
import {
  Group,
  Header,
  Link,
  ModalCardProps,
  ModalPage,
  ModalPageHeader,
  ModalPageProps,
  PanelHeaderClose,
  SimpleCell,
  Text,
} from '@vkontakte/vkui';
import React from 'react';
import { foodInfo } from '../store';

export const Modal: React.FC<ModalCardProps> = ({ nav }: ModalPageProps) => {
  const info = useAtomValue(foodInfo);

  return (
    <ModalPage
      nav={nav}
      settlingHeight={100}
      onClose={back}
      header={
        <ModalPageHeader left={<PanelHeaderClose onClick={back} />}>
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
