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

export const deleteDev = createAction('[Dev] Delete Dev', (id: string) => ({
  id,
}));
export const deleteDevSuccess = createAction(
  '[Dev] Delete Dev Success',
  (id: string) => ({ id })
);
export const deleteDevFailure = createAction(
  '[Dev] Delete Dev Failure',
  (error: string) => ({ error })
);

export const updateDev = createAction('[Dev] Update Dev', (dev: Developer) => ({
  dev,
}));
export const updateDevSuccess = createAction(
  '[Dev] Update Dev Success',
  (dev: Developer) => ({ dev })
);
export const updateDevFailure = createAction(
  '[Dev] Update Dev Failure',
  (error: string) => ({ error })
);
