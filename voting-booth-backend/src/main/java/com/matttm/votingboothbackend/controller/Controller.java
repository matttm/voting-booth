package com.matttm.votingboothbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Matt Maloney on 7/15/2020
 * matttm : mtm9051
 * matttmaloney@gmail.com
 * mtm9051@rit.edu
 * Language:  Java 1.8
 */
@RestController
@RequestMapping("/api")
public class Controller {

    @GetMapping("/test")
    public String testServer() {
        return "Testing...";
    }

    @PostMapping("/register")
    public void register() {}
    
    @GetMapping("/validate")
    public ResponseEntity<Boolean> validate() {
        return null;
    }
}
