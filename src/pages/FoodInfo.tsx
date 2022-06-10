import { back } from '@cteamdev/router';
import { useAtomValue } from '@mntm/precoil';
import {
  Icon24LikeOutline,
  Icon24ShareOutline,
  Icon28FavoriteOutline,
  Icon28GlobeOutline,
  Icon28LikeOutline,
  Icon28LocationMapOutline,
  Icon28MailOutline,
  Icon28PhoneOutline,
  Icon28ShareOutline,
} from '@vkontakte/icons';
import {
  Button,
  ButtonGroup,
  Cell,
  Div,
  Group,
  Header,
  IconButton,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelProps,
  SimpleCell,
} from '@vkontakte/vkui';
import React, { useState } from 'react';
import { Result } from '../api';
import { foodInfo } from '../store';

interface IFoodInfo {
  info: Result;
}

const MainInfo = ({ info }: IFoodInfo) => {
  return (
    <Group separator='show'>
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
  );
};

export const FoodInfo: React.FC<PanelProps> = ({ nav }: PanelProps) => {
  const info = useAtomValue(foodInfo);

  const [subscription, setSubscription] = useState(false);

  return (
    <Panel nav={nav}>
      <PanelHeader left={<PanelHeaderBack onClick={back} />}>
        {info.name}
      </PanelHeader>
      <MainInfo info={info} />

      <Group>
        <Div style={{ paddingBlock: 0 }}>
          <ButtonGroup
            style={{ alignItems: 'center' }}
            stretched
            mode='horizontal'
          >
            <ButtonGroup style={{ alignItems: 'center' }} mode='horizontal'>
              <Button
                style={{ borderRadius: '15px' }}
                appearance='neutral'
                size='m'
                hasHover
                before={<Icon24ShareOutline />}
                after={3}
              />
              <Button
                style={{ borderRadius: '15px' }}
                appearance='neutral'
                size='m'
                hasHover
                before={<Icon24LikeOutline />}
                after={18}
              />
            </ButtonGroup>
            <Button
              style={{ borderRadius: '15px' }}
              onClick={() => setSubscription((old) => !old)}
              size='m'
              appearance={subscription ? 'neutral' : 'accent'}
              stretched
              hasHover
            >
              {subscription ? 'Отписаться' : 'Подписаться'}
            </Button>
          </ButtonGroup>
        </Div>
      </Group>
    </Panel>
  );
};
