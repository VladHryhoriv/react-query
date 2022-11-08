import { identifier, serializable } from 'serializr';

export class Label {
  @serializable(identifier())
  id = '';

  @serializable
  color = '';

  @serializable
  name = '';
}
