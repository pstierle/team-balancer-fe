import { Map } from 'src/app/core/models/map';
export interface BaseGame {
  id: number;
  name: string;
  maps: Map[];
  icon: string;
}
