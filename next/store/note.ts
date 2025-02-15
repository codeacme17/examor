import { create } from "zustand";
import { TNote } from "@prisma/client";

interface NoteState {
  notes: TNote[];
  setNotes: (newNotes: TNote[]) => void;
  currentNote: TNote | null;
  setCurrentNote: (currentNote: TNote) => void;
  isFetching: boolean;
  setIsFetching: (isFetching: boolean) => void;
}

export const useNoteStore = create<NoteState>((set) => ({
  notes: [],
  setNotes: (newNotes: TNote[]) => set({ notes: newNotes }),

  currentNote: null,
  setCurrentNote: (currentNote: TNote) => set({ currentNote }),

  isFetching: false,
  setIsFetching: (isFetching: boolean) => set({ isFetching }),
}));
