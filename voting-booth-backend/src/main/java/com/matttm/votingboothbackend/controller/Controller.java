package com.matttm.votingboothbackend.controller;

import com.matttm.votingboothbackend.entities.Person;
import com.matttm.votingboothbackend.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Matt Maloney on 7/15/2020
 * matttm : mtm9051
 * matttmaloney@gmail.com
 * mtm9051@rit.edu
 * Language:  Java 1.8
 */
@RestController
@RequestMapping("/api/persons")
public class Controller {

    @Autowired
    private PersonService personService;

    @GetMapping("/test")
    public String testServer() {
        for (Person p : personService.findAll()) {
            System.out.println("ssn: " + p.getSsn());
        }
        return "Testing...";
    }

    /**
     * Create a person in the database
     * @param p person to be created in database
     */
    @PostMapping("/")
    public void createPerson(@RequestBody Person p) {
        System.out.println("person: " + p.toString());
    }

    /**
     * Get all persons in person table
     *
     * @return an iterable of persons
     */
    @GetMapping("/")
    public ResponseEntity<Iterable<Person>> getPersons() {
        return null;
    }

    /**
     * Get a person with matching id
     * @param id the id of person of interest
     *
     * @return the person of interest
     */
    @GetMapping("/{id}")
    public ResponseEntity<Person> getPerson(@PathVariable("id") String id) {
        return null;
    }

    /**
     * Validate a person in the database
     * @param p person whose existence is to be checked
     *
     * @return true if the person exists in the database
     */
    @GetMapping("/validate")
    public ResponseEntity<Boolean> validate(@RequestBody Person p) {
        return null;
    }

    /**
     * Update a person in database
     * @param id the id of person of interest
     * @param p the info the person with id, id, is to be updated with
     */
    @PutMapping("/{id}")
    public void updatePerson(@PathVariable("id") String id, @RequestBody Person p) {}

    /**
     * Delete a person from database
     * @param id the id of the person to delete
     */
    @DeleteMapping("/id")
    public void deletePerson(@PathVariable("id") String id) {}
}
