import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  sanitizedUrl: any;

  commentForm = new FormGroup({
    text: new FormControl(''),
  })

  @Input('post') post: Post
  replyToPost: boolean = false

  constructor(private postService: PostService, private authService: AuthService, private sanitizer: DomSanitizer) {}

  currentUser = JSON.parse(localStorage.getItem('current') || "");
  
  ngOnInit(): void {
    var currYoutubeLink = this.post.youtubeUrl; 
    var newYoutubeLink = currYoutubeLink.replace("watch?v=", "embed/");
    this.post.youtubeUrl = newYoutubeLink;
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.post.youtubeUrl);
  }


  

  toggleReplyToPost = () => {
    this.replyToPost = !this.replyToPost
  }

  submitReply = (e: any) => {
    e.preventDefault()
    let newComment = new Post(0, this.commentForm.value.text || "", "", "", this.authService.currentUser, [])
    this.postService.upsertPost({...this.post, comments: [...this.post.comments, newComment]})
      .subscribe(
        (response) => {
          this.post = response
          this.toggleReplyToPost()
        }
      )
  }
}
