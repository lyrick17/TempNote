export interface NoteItem {
  id: number | null;
  title?: string;
  text: string;
  content: string;
  type: 'text' | 'image' | 'combined' | '';
  last_updated?: Date;
}

export interface StashedNoteItem extends Omit<NoteItem, 'text' | 'title'> {
  title: string;
}

export const noteItemTemp: NoteItem = {
  id: null,
  title: '',
  text: '',
  content: '',
  type: '',
  last_updated: new Date(),
};
