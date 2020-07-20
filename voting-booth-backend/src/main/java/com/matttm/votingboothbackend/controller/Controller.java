package com.matttm.votingboothbackend.controller;

import com.matttm.votingboothbackend.entities.Person;
import com.matttm.votingboothbackend.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
//@RequestMapping("/api")
public class Controller {

    @Autowired
    private PersonService personService;

    @GetMapping("/test")
    public String testServer() {
//        for (Person p : personService.findAll()) {
//            System.out.println("ssn: " + p.getSsn());
//        }
        return "Testing...";
    }

    @PostMapping("/register")
    public void register() {}

    @GetMapping("/validate")
    public ResponseEntity<Boolean> validate() {
        return null;
    }
}
