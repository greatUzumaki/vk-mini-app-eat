import { back } from '@cteamdev/router';
import { useAtomValue } from '@mntm/precoil';
import {
  Icon28GlobeOutline,
  Icon28LocationMapOutline,
  Icon28MailOutline,
  Icon28PhoneOutline,
} from '@vkontakte/icons';
import {
  Cell,
  Group,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelProps,
} from '@vkontakte/vkui';
import React from 'react';
import { foodInfo } from '../store';

export const FoodInfo: React.FC<PanelProps> = ({ nav }: PanelProps) => {
  const info = useAtomValue(foodInfo);

  return (
    <Panel nav={nav}>
      <PanelHeader left={<PanelHeaderBack onClick={back} />}>
        {info.name}
      </PanelHeader>
      <Group>
        <Cell
          href={`http://maps.google.com/?q=${info.address_manual}`}
          target='_blank'
          multiline
          before={<Icon28LocationMapOutline />}
        >
          {info.address_manual}
        </Cell>

        {info.phone && (
          <Cell
            multiline
            href={`tel:${info.phone}`}
            before={<Icon28PhoneOutline />}
          >
            {info.phone}
          </Cell>
        )}

        {info.www && (
          <Cell
            multiline
            href={info.www.includes('http') ? info.www : 'http://' + info.www}
            target='_blank'
            before={<Icon28GlobeOutline />}
          >
            {info.www}
          </Cell>
        )}

        {info.email && (
          <Cell
            multiline
            href={`mailto:${info.email}`}
            before={<Icon28MailOutline />}
          >
            {info.email}
          </Cell>
        )}
      </Group>
    </Panel>
  );
};
