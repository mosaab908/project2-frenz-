package com.revature.services;

import com.revature.models.Post;
import com.revature.models.User;
import com.revature.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PostService postService;

    public UserService(UserRepository userRepository, PostService postService) {
        this.userRepository = userRepository;
        this.postService    = postService;
    }

    public Optional<User> findByCredentials(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public User getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User updateUser(User user) {return userRepository.save(user); }

    public boolean emailIsTaken(String email) {
        Optional<User> current = Optional.ofNullable(getByEmail(email));
        if (!current.isPresent())
            return false;
        else
            return true;
    }

    public User getById(int id){
        Optional<User> userOptional = this.userRepository.findById(id);
        if(!userOptional.isPresent()){
            return null;
        }
        return userOptional.get();
    }

    public List<User> findByName(String keyword) {
        if(!(userRepository.findByFirstNameContaining(keyword).isEmpty())) {
            return userRepository.findByFirstNameContaining(keyword);
        }
        else {
            return userRepository.findByLastNameContaining(keyword);
        }
    }

    public List<User> findByFullName(String firstName, String lastName) {
        return userRepository.findByFirstNameAndLastName(firstName, lastName);
    }

    public List<Post> findAllUserPosts(int id){
        return postService.getAllByAuthorId(id);
    }

    public Post deletePost(int userId, Post post){
        List<Post> posts = this.findAllUserPosts(userId);
        if(posts.contains(post)){
            this.postService.deleteUserPost(post);
            return post;
        }
        return null;
    }

    public Post upsert(Post post){
        return postService.upsert(post);
    }
}
