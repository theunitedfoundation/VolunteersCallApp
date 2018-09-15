import firebase from 'firebase';
export class AuthService{
 signUp(email:string,password:string){
      return firebase.auth().createUserWithEmailAndPassword(email,password);
     
 }
}