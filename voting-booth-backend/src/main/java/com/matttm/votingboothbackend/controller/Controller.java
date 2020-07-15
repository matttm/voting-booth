package com.matttm.votingboothbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Matt Maloney on 7/15/2020
 * matttm : mtm9051
 * matttmaloney@gmail.com
 * mtm9051@rit.edu
 * Language:  Java 1.8
 */
@RestController
public class Controller {

    @GetMapping("/api/test")
    public String testServer() {
        return "Testing...";
    }
}
