import { Developer } from '../../models/developer.model';

export interface DevState {
  developers: Developer[];
  loading: boolean;
  error: string | null;
}

export const initialState: DevState = {
  developers: [],
  loading: false,
  error: null,
};
