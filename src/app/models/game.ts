export class Game {
  public name: String;
  public price: String; // should be a number
  public thumbnailUrl: String;

  public constructor(name: String, price: String, thumbnailUrl: String) {
    this.name = name;
    this.price = price;
    this.thumbnailUrl = thumbnailUrl;
  }
}
