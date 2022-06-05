import { Panel, PanelHeader, PanelProps } from '@vkontakte/vkui';
import React from 'react';
import { Map } from '../components/map/MapContainer';

export const Home: React.FC<PanelProps> = ({ nav }: PanelProps) => {
  return (
    <Panel style={{ overflow: 'hidden' }} nav={nav}>
      <PanelHeader>Карта</PanelHeader>
      <Map />
    </Panel>
  );
};
