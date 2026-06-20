import { marks, nodes } from 'ngx-editor';
import { Schema } from 'prosemirror-model';

const { image, ...nodesWithoutImage } = nodes;

export const noImageSchema = new Schema({
  nodes: nodesWithoutImage,
  marks,
});
