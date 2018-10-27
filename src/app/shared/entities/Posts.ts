export class Post {
  public id : number
  public content : string
  public createdAt : string
  public authorId : number

  constructor(options) {
    Object.assign(this, options);
  }
}
