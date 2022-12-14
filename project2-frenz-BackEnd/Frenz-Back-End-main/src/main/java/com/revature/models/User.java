package com.revature.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;

    private String imageUrl;

    public User(String email, String password, String firstName, String lastName){
        this.email      = email;
        this.password   = password;
        this.firstName  = firstName;
        this.lastName   = lastName;
    }


}
