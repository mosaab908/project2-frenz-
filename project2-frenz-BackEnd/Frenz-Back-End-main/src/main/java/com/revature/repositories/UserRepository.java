package com.revature.repositories;

import com.revature.models.Post;
import com.revature.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmailAndPassword(String email, String password);
    User findByEmail(String email);

    List<User> findByFirstNameContaining(String keyword);
    List<User> findByLastNameContaining(String keyword);
    List<User> findByFirstNameAndLastName(String firstName, String lastName);
}
