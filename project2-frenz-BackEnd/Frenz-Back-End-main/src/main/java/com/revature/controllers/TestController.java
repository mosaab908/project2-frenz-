package com.revature.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/")
public class TestController {

    @GetMapping()
    public String hello(){
        return "hello from bahia (updated)";
    }
}
