export interface NoteItem {
  id: number | null;
  title?: string;
  text: string;
  content: string;
  type: 'text' | 'image' | 'combined' | '';
}

export const noteItemTemp: NoteItem = {
  id: null,
  title: '',
  text: '',
  content: '',
  type: '',
};
