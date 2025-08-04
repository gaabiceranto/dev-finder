import { createReducer, on } from '@ngrx/store';
import * as DevActions from './dev.actions';
import { initialState, DevState } from './dev.state';

export const devReducer = createReducer(
  initialState,
  on(DevActions.loadDevs, (state) => ({ ...state, loading: true })),
  on(DevActions.loadDevsSuccess, (state, { devs }) => ({
    ...state,
    loading: false,
    developers: devs,
  })),
  on(DevActions.loadDevsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(DevActions.addDev, (state) => ({ ...state, loading: true })),
  on(DevActions.addDevSuccess, (state, { dev }) => ({
    ...state,
    loading: false,
    developers: [...state.developers, dev],
  })),
  on(DevActions.addDevFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(DevActions.deleteDev, (state) => ({ ...state, loading: true })),
  on(DevActions.deleteDevSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    developers: state.developers.filter((dev) => dev.id !== id),
  })),
  on(DevActions.deleteDevFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(DevActions.updateDev, (state) => ({ ...state, loading: true })),
  on(DevActions.updateDevSuccess, (state, { dev }) => ({
    ...state,
    loading: false,
    developers: state.developers.map((developer) =>
      developer.id === dev.id ? dev : developer
    ),
  })),
  on(DevActions.updateDevFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
