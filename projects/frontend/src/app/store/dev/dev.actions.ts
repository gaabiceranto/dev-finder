import { createAction } from '@ngrx/store';
import { Developer } from '../../models/developer.model';

export const loadDevs = createAction('[Dev] Load Devs');
export const loadDevsSuccess = createAction(
  '[Dev] Load Devs Success',
  (devs: Developer[]) => ({ devs })
);
export const loadDevsFailure = createAction(
  '[Dev] Load Devs Failure',
  (error: string) => ({ error })
);

export const addDev = createAction('[Dev] Add Dev', (dev: Developer) => ({
  dev,
}));
export const addDevSuccess = createAction(
  '[Dev] Add Dev Success',
  (dev: Developer) => ({ dev })
);
export const addDevFailure = createAction(
  '[Dev] Add Dev Failure',
  (error: string) => ({ error })
);
