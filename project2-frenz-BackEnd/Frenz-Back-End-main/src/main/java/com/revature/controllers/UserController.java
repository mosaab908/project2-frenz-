package com.revature.controllers;

import com.revature.models.Post;
import com.revature.models.User;
import com.revature.services.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@CrossOrigin("*")
@RestController
@RequestMapping("/users")
public class UserController {
    public UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/update/{id}")
    public User update(@PathVariable("id") int id, @RequestBody User user) {
        Optional<User> currentUser = Optional.ofNullable(this.userService.getById(id));
        if (!currentUser.isPresent()) {
            return null;
        } else {
            User currentUserToBeUpdated = currentUser.get();
            if (user.getEmail() != null) {
                if ((userService.emailIsTaken(user.getEmail())) && !(user.getEmail().equals(currentUserToBeUpdated.getEmail()))) {
                    System.out.println("This email is already exist");
                    return null;
                } else {
                    currentUserToBeUpdated.setEmail(user.getEmail());
                }
            }
            if (user.getFirstName() != null) {
                currentUserToBeUpdated.setFirstName(user.getFirstName());
            }
            if (user.getLastName() != null) {
                currentUserToBeUpdated.setLastName(user.getLastName());
            }
            if (user.getImageUrl() != null) {
                currentUserToBeUpdated.setImageUrl(user.getImageUrl());
            }

            return this.userService.updateUser(currentUserToBeUpdated);
        }
    }

    @GetMapping("/search/{keyword}")
    public List<User> getByKeyword(@PathVariable String keyword) {
        Pattern pattern = Pattern.compile("\\s");
        Matcher matcher = pattern.matcher(keyword);

        if(matcher.find()){
            String[] fullName = keyword.split("\\s+");
            return userService.findByFullName(fullName[0], fullName[1]);
        }
        return userService.findByName(keyword);
    }

    @GetMapping("/searchById/{id}")
    public User getUserById(@PathVariable("id") int id){
        return this.userService.getById(id);
    }

    @GetMapping("/posts/{id}")
    public List<Post> getAllUserPosts(@PathVariable("id") int id){
        return userService.findAllUserPosts(id);
    }

    @DeleteMapping("/delete/{userId}")
    public Post deleteUserPost(@PathVariable("userId") int userId, @RequestBody Post post){
        return this.userService.deletePost(userId, post);
    }

    @PutMapping("/update")
    public ResponseEntity<Post> upsertPost(@RequestBody Post post) {
        return ResponseEntity.ok(this.userService.upsert(post));
    }
}
