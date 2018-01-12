// @flow

class ItemEntity {
  id: number;
  title: string;
  body: string;

  constructor(id: number, title: string, body: string) {
    this.id = id;
    this.title = title;
    this.body = body;
  }

  toString() {
    return `${this.id}, ${this.title}, ${this.body}`;
  }
}

export default ItemEntity;
