import { deserialize, identifier, serializable } from 'serializr';

export class Label {
  @serializable(identifier())
  id = '';

  @serializable
  color = '';

  @serializable
  name = '';

  static deserialize(data: Object | string): Label {
    return deserialize(Label, data);
  }

  static deserializeAsArray(list: Label[]): Label[] {
    return list.map(Label.deserialize);
  }

  static deserializeAsMap(list: Label[]): Map<Label['name'], Label> {
    return list.reduce((acc, label) => {
      acc.set(label.id, Label.deserialize(label));

      return acc;
    }, new Map());
  }
}
