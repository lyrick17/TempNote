import { marks, nodes } from 'ngx-editor';
import { Schema } from 'prosemirror-model';
import { EditorState, Transaction, Plugin } from 'prosemirror-state';

const { image, ...nodesWithoutImage } = nodes;

export const stashNoteSchema = new Schema({
  nodes: nodesWithoutImage,
  marks,
});

export const stashNotePlugin = (maxCharacter: number) =>
  new Plugin({
    filterTransaction: (tr: Transaction, state: EditorState) => {
      // If the transaction doesn't change the text content, allow it
      if (!tr.docChanged) return true;

      // Calculate character count after this keystroke/paste
      const currentLength = tr.doc.textContent.length;

      // Allow transaction only if it stays under the limit
      return currentLength <= maxCharacter;
    },
  });
