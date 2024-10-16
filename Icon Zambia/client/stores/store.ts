import { create } from 'zustand';

export interface State {
    movieId?: string;
    isOpen: boolean;
    contentType: string;
}

const initialState: State = {
    movieId: undefined,
    isOpen: false,
    contentType: 'movie',
}


export interface Actions {
    openModal: (movieId: string) => void;
    closeModal: () => void;
    setContentType: (contentType: string) => void;
}

const useStreamStore = create<State & Actions>()((set) => ({
    ...initialState,
    openModal: (movieId: string) => set({ movieId, isOpen: true }),
    closeModal: () => set({ isOpen: false, movieId: undefined }),
    setContentType: (contentType: string) => set({ contentType }),
}));

export default useStreamStore