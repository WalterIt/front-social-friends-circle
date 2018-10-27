export enum POST_VISIBILITY_STATUS {
  PUBLIC = 100,
  ONLY_FRIENDS = 200
}

export class Post {
  public id : number;
  public content : string ;
  public createdAt : string;
  public authorId : number;
  public visibility : POST_VISIBILITY_STATUS;

  constructor(options) {
    Object.assign(this, options);
  }
}
