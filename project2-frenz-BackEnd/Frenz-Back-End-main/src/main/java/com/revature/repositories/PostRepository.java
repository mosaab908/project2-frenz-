package com.revature.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.models.Post;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Integer>{

    Optional<List<Post>> findAllByAuthor_Id(int id);

}
