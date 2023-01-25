export interface IMyState {
    app:{
      currentUser:Array<string>;
      isAuth: boolean;
      users:Array<string>;
    }
    
  }
  export interface IuserData {
    _id:string;
      name:string;
      email:string;
     createdAt:string;
      updatedAt:string
      block:string
  }

  export interface IFormInput {
    email: string;
    password: string;
    name: string;
  }