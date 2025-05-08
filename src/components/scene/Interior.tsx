import React from 'react';
import { TatamiFloor } from './interior/TatamiFloor';
import { Kamidana } from './interior/Kamidana';
import { WeaponRack } from './interior/WeaponRack';
import { Scrolls } from './interior/Scrolls';
import { Zabuton } from './interior/Zabuton';
import { Lanterns } from './interior/Lanterns';

export const Interior: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      <TatamiFloor position={[0, 0.01, 0]} />
      <Kamidana position={[0, 2, -5.9]} />
      <WeaponRack position={[5.9, 1.5, 0]} rotation={[0, -Math.PI/2, 0]} />
      <Scrolls />
      <Zabuton />
      <Lanterns />
    </group>
  );
};