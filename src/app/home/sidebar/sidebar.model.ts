export interface NoteItem {
  id: number | null;
  title?: string;
  text: string;
  content: string;
}

export const noteItemTemp: NoteItem = {
  id: null,
  title: '',
  text: '',
  content: '',
};
