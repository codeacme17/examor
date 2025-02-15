import { useEffect, useState } from "react";
import { LucideIcon, Notebook, Dices } from "lucide-react";
import { useNoteStore } from "@/store";
import { useUploadingNotes } from "@/hooks/useUploadingNote";
import { useFileStore } from "@/store/file";
import { TNote } from "@prisma/client";

export interface IMenuItem extends Omit<TNote, "uploadDate" | "isUploading" | "icon"> {
  path: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  icon: (React.ComponentType<any> & LucideIcon) | string;
}

export const useMenu = () => {
  const noteStore = useNoteStore();
  const fileStore = useFileStore();
  const { notes } = noteStore;
  const { uploadingFiles } = fileStore;
  const { uploadingNotes } = useUploadingNotes();

  const [staticMenus, setStaicMenus] = useState<IMenuItem[]>([
    {
      id: "mange-notes",
      name: "Manage Notes",
      icon: Notebook,
      path: "/manage-notes",
      isDisabled: false,
    },
    {
      id: "random-pick",
      name: "Random Pick",
      icon: Dices,
      path: "/random-pick",
      isDisabled: false,
    },
  ]);
  const [noteMenus, setNoteMenus] = useState<IMenuItem[]>([]);

  useEffect(() => {
    if (notes.length === 0) {
      staticMenus[1].isDisabled = true;
    } else if (notes.length === 1 && !!uploadingFiles.length) {
      staticMenus[1].isDisabled = true;
    } else staticMenus[1].isDisabled = false;

    setStaicMenus([...staticMenus]);

    const noteMenus = notes.map((note) => ({
      ...note,
      path: `/note/${note.id}`,
      isUploading: uploadingNotes.some((uploadingNote) => uploadingNote.noteId === note.id),
    }));

    setNoteMenus(noteMenus);
  }, [notes, uploadingNotes, uploadingFiles]);

  return {
    staticMenus,
    noteMenus,
    setNoteMenus,
  };
};
