import { back } from '@cteamdev/router';
import { useAtomValue } from '@mntm/precoil';
import {
  Icon20LikeCircleFillRed,
  Icon24Like,
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
  PullToRefresh,
  SimpleCell,
  Tabs,
  TabsItem,
  TabsItemProps,
  UsersStack,
} from '@vkontakte/vkui';
import React, { useState } from 'react';
import { Result } from '../api';
import { foodInfo } from '../store';
import AvatarImg from '../assets/images/avatar.jpg';

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

const CustomTabs = ({
  title,
  props,
}: {
  title: string;
  props: TabsItemProps;
}) => {
  <TabsItem style={{ flex: 1 }} {...props}>
    {title}
  </TabsItem>;
};

const ButtonsGroup = () => {
  const [subscription, setSubscription] = useState(false);
  const [like, setLike] = useState(false);
  const [share, setShare] = useState(3);

  return (
    <Group separator='show'>
      <Div style={{ paddingBlock: 0 }}>
        <ButtonGroup
          style={{ alignItems: 'center' }}
          stretched
          mode='horizontal'
        >
          <ButtonGroup style={{ alignItems: 'center' }} mode='horizontal'>
            <Button
              onClick={() => setShare((old) => old + 1)}
              style={{ borderRadius: '15px' }}
              appearance={'neutral'}
              size='m'
              hasHover
              before={<Icon24ShareOutline />}
              after={share}
            />
            <Button
              onClick={() => setLike((old) => !old)}
              style={{ borderRadius: '15px' }}
              appearance={like ? 'negative' : 'neutral'}
              size='m'
              hasHover
              before={like ? <Icon24Like /> : <Icon24LikeOutline />}
              after={like ? 19 : 18}
            />
          </ButtonGroup>
          <Button
            style={{ borderRadius: '15px' }}
            onClick={() => setSubscription((old) => !old)}
            size='m'
            appearance={'accent'}
            stretched
            mode={subscription ? 'secondary' : 'primary'}
            hasHover
          >
            {subscription ? 'Отписаться' : 'Подписаться'}
          </Button>
        </ButtonGroup>
      </Div>
    </Group>
  );
};

export const FoodInfo: React.FC<PanelProps> = ({ nav }: PanelProps) => {
  const info = useAtomValue(foodInfo);

  const [fetching, setFetching] = useState(false);

  const onRefresh = React.useCallback(() => {
    setFetching(true);

    setTimeout(() => {
      setFetching(false);
    }, 1000);
  }, []);

  return (
    <Panel nav={nav}>
      <PanelHeader left={<PanelHeaderBack onClick={back} />}>
        {info.name}
      </PanelHeader>

      <PullToRefresh onRefresh={onRefresh} isFetching={fetching}>
        <MainInfo info={info} />

        <ButtonsGroup />

        <Group
          header={
            <Tabs>
              <TabsItem style={{ flex: 1 }} selected>
                Подписчики
              </TabsItem>
              <TabsItem style={{ flex: 1 }}>Новости</TabsItem>
              <TabsItem style={{ flex: 1 }}>Отзывы</TabsItem>
            </Tabs>
          }
        ></Group>
      </PullToRefresh>
    </Panel>
  );
};
