import { Panel, PanelHeader, PanelProps } from '@vkontakte/vkui';
import React from 'react';
import { Map } from '../components/map/MapContainer';

export const Home: React.FC<PanelProps> = ({ nav }: PanelProps) => {
  return (
    <Panel nav={nav}>
      <PanelHeader>Карта</PanelHeader>
      <Map />
    </Panel>
  );
};
