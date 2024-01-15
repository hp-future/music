import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {};

const stateCreator: StateCreator<State> = (set, get) => ({});

const userStore = create(persist(stateCreator, { name: 'userStore' }));

export default userStore;
