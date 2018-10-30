export class User {
  public id : string;
  public firstName : string;
  public lastName : string;
  public email : string;
  public password : string;
  public friends : User[] = [];

  constructor(firstName?, lastName?, email?, password?, id?, friends?) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.id = id;

      if (friends) {
        this.friends = friends;
      }
  }

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  isFriendOf(user : User) {
    if (!this.friends) {
      return false;
    }

    return Boolean(this.friends.find(friend => friend.id === user.id));
  }
}
