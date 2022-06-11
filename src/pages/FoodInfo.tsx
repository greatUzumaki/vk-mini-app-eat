import { back } from '@cteamdev/router';
import { useAtomValue } from '@mntm/precoil';
import {
  Icon20MessageOutline,
  Icon24Like,
  Icon24LikeOutline,
  Icon24ShareOutline,
  Icon28GlobeOutline,
  Icon28LocationMapOutline,
  Icon28MailOutline,
  Icon28PhoneOutline,
} from '@vkontakte/icons';
import {
  Avatar,
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
} from '@vkontakte/vkui';
import { TextTooltip } from '@vkontakte/vkui/dist/cjs/unstable';
import React, { useState } from 'react';
import { Result } from '../api';
import AvatarImg from '../assets/images/avatar.jpg';
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
            <TextTooltip text='Поделиться' showDelay={500}>
              <Button
                onClick={() => setShare((old) => old + 1)}
                style={{ borderRadius: '15px' }}
                appearance={'neutral'}
                size='m'
                hasHover
                before={<Icon24ShareOutline />}
                after={share}
              />
            </TextTooltip>
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

const tabs = [
  {
    title: 'Подписчики',
  },
  {
    title: 'Акции',
  },
  {
    title: 'Отзывы',
  },
];

const users = [
  {
    userName: 'Евгений Авсиевич',
  },
  {
    userName: 'Евгений Авсиевич',
  },
  {
    userName: 'Евгений Авсиевич',
  },
  {
    userName: 'Евгений Авсиевич',
  },
  {
    userName: 'Евгений Авсиевич',
  },
  {
    userName: 'Евгений Авсиевич',
  },
  {
    userName: 'Евгений Авсиевич',
  },
  {
    userName: 'Евгений Авсиевич',
  },
  {
    userName: 'Евгений Авсиевич',
  },
];

const SubsGroup = () => {
  return (
    <Group mode='plain'>
      <Header style={{ marginTop: 5, height: 45 }}>
        {users.length} Подписчиков
      </Header>

      {users.map((user, index) => (
        <SimpleCell
          after={<Button mode='outline'>Пригласить</Button>}
          key={index}
          before={<Avatar src={AvatarImg} />}
        >
          {user.userName}
        </SimpleCell>
      ))}
    </Group>
  );
};

const StockGroup = () => {
  return <Group mode='plain'>stock</Group>;
};

const ReviewGroup = () => {
  return <Group mode='plain'>rev</Group>;
};

export const FoodInfo: React.FC<PanelProps> = ({ nav }: PanelProps) => {
  const info = useAtomValue(foodInfo);
  const [activeTab, setActiveTab] = useState(0);

  const [fetching, setFetching] = useState(false);

  const onRefresh = React.useCallback(() => {
    setFetching(true);

    setTimeout(() => {
      setFetching(false);
    }, 1000);
  }, []);

  const groupBySelect: { [key: number]: JSX.Element } = {
    0: <SubsGroup />,
    1: <StockGroup />,
    2: <ReviewGroup />,
  };

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
              {tabs.map((tab, index) => {
                return (
                  <TabsItem
                    onClick={() => setActiveTab(index)}
                    selected={index === activeTab}
                    key={index}
                    style={{ flex: 1 }}
                  >
                    {tab.title}
                  </TabsItem>
                );
              })}
            </Tabs>
          }
        >
          {groupBySelect[activeTab]}
        </Group>
      </PullToRefresh>
    </Panel>
  );
};
