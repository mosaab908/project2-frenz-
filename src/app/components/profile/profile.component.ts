import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import Post from 'src/app/models/Post';
import { ProfileService} from 'src/app/services/profile.service';
import {FormControl, FormGroup } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { SearchService } from 'src/app/services/search.service';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { PostFeedPageComponent } from '../post-feed-page/post-feed-page.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: number;
  clickedUserId: number;
  user: User = {} as User;
  users: User [];
  userPosts: Post [];
  
  successAlert: Boolean = false;
  unSuccessAlert: Boolean = false;
  successImgAlert: Boolean = false;

  showTab: number = 0;

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(
    private profileService: ProfileService,
    private authService:    AuthService,
    private cookieService:  CookieService,
    private searchService:  SearchService,

    ) { }


  ngOnInit(): void {
    this.userId = Number(this.cookieService.get('userId'));
    this.clickedUserId = Number(JSON.parse(localStorage.getItem('clickedId') || ''));
    
    if(this.userId != this.clickedUserId){
      this.userId = this.clickedUserId
    }
    this.getCurrentUser(this.userId);
    this.profileService.getUserPosts(this.userId).subscribe(
      returnedPosts => {
        this.userPosts = returnedPosts;
      }
    )
  }

  searchClickEvent() {
    this.userId = Number(JSON.parse(localStorage.getItem('clickedId') || ''));
    console.log('this is the search click event id' + this.userId);
    this.getCurrentUser(this.userId);
    this.profileService.getUserPosts(this.userId).subscribe(
      returnedPosts => {
        this.userPosts = returnedPosts;
      }
    )
  }

  compareIds(){
    var id = JSON.parse(localStorage.getItem('clickedId') || '');
    console.log("Clicked: " + id + " Logged in: " + Number(this.cookieService.get('userId')));
    return Number(id) == Number(this.cookieService.get('userId'));
  }

  getUsersByName(keyword:string) {
    this.searchService.getUsers(keyword).subscribe(
      (returnedUsers:User[])=> {
        this.users = returnedUsers;
        console.log(this.authService.currentUser);
      }
    )
  }


  getCurrentUser(userId: number){
    this.profileService.getUserByID(userId).subscribe(
      (returnedUser:User)=>{
        this.user = returnedUser;
      }
    )

  }

  clearSearch() {
    this.users = []
  }

  goToProfileFromProfile(clickedId: Number) {
    localStorage.setItem('clickedId', String(clickedId));
    console.log("about to call searchclick event in line 82")
    this.searchClickEvent();
  }

  show(index : number){
    this.showTab = index;
  }

  closesuccessImgAlert(){
  this.successImgAlert = false;
  }

  closeSuccessAlert(){
    this.successAlert=false;
  }
  
  closeUnsuccessAlert(){
    this.unSuccessAlert= false;
    this.user.email =this.cookieService.get('useremail');
  
  }
  
  update():void{
    this.profileService.updateUser(this.userId, this.user).subscribe(
      (updatedUser) => {
        if(updatedUser == null){
          console.error("error");
          this.unSuccessAlert= true;
          console.log("email already exist")
          return;
        }
        this.successAlert = true;
        console.log("updated successfully");
        
      }
   )
  }  
}
  