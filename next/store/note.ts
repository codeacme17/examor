import { create } from "zustand";
import { TNote } from "@prisma/client";

interface NoteState {
  notes: TNote[];
  setNotes: (newNotes: TNote[]) => void;
  currentNode: TNote | null;
  setCurrentNode: (currentNode: TNote) => void;
  isFetching: boolean;
  setIsFetching: (isFetching: boolean) => void;
}

export const useNoteStore = create<NoteState>((set) => ({
  notes: [],
  setNotes: (newNotes: TNote[]) => set({ notes: newNotes }),

  currentNode: null,
  setCurrentNode: (currentNode: TNote) => set({ currentNode }),

  isFetching: false,
  setIsFetching: (isFetching: boolean) => set({ isFetching }),
}));
