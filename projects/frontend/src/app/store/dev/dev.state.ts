export interface Dev {
  id?: string;
  nome: string;
  github: string;
  habilidades: string[];
  formacao: string;
  cidade: string;
}

export interface DevState {
  devs: Dev[];
  loading: boolean;
  error: string | null;
}

export const initialState: DevState = {
  devs: [],
  loading: false,
  error: null,
};