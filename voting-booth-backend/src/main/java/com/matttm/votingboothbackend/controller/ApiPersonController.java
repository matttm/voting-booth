package com.matttm.votingboothbackend.controller;

import com.matttm.votingboothbackend.entities.Person;
import com.matttm.votingboothbackend.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
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
public class ApiPersonController {
    ////////////////////////////////
    // TODO: consider using query param to decide between id/ssn
    //   but ssn shouldnt be in url
    ///////////////////////////////

    @Autowired
    private PersonService personService;

    @GetMapping("/test")
    public String testServer() {
        return "Testing...";
    }

    /**
     * Create a person in the database
     * @param p person to be created in database
     */
    @PostMapping("/")
    public void createPerson(@RequestBody Person p) {
        System.out.println("person: " + p.toString());
        personService.save(p);
    }

    /**
     * Get all persons in person table
     *
     * @return an iterable of persons
     */
    @GetMapping("/")
    public ResponseEntity<Iterable<Person>> getPersons() {
        return new ResponseEntity<>(
                personService.findAll(),
                HttpStatus.OK
        );
    }

    /**
     * Get a person with matching id
     * @param id the id of person of interest
     *
     * @return the person of interest
     */
    @GetMapping("/{id}")
    public ResponseEntity<Person> getPerson(@PathVariable("id") String id) {
        int _id = Integer.parseInt(id);
        return new ResponseEntity<>(
                personService.findById(_id),
                HttpStatus.OK
        );
    }

    /**
     * A way to get ID from the ssn
     * @param ssn a user's social security number
     *
     * @return the id of the user with the provided ssn
     */
    @PostMapping("/forgot")
    public ResponseEntity<Integer> getId(@RequestHeader("ssn") String ssn) {
        // TODO: add authentication
        // TODO: fix this responding 500
        Person tmp = personService.findBySsn(ssn);
        Integer id = tmp.getId();
        return new ResponseEntity<>(
                id,
                HttpStatus.OK
        );
    }

    /**
     * Validate a person in the database
     * @param p person whose existence is to be checked
     *
     * @return true if the person exists in the database
     */
    @GetMapping("/validate")
    public ResponseEntity<Boolean> validate(@RequestBody Person p) {
        System.out.println("person: " + p.toString());
        return new ResponseEntity<>(personService.exists(p), HttpStatus.OK);
    }

    /**
     * Update a person in database
     * @param id the id of person of interest
     * @param p the info the person with id, id, is to be updated with
     */
    @PutMapping("/{id}")
    public void updatePerson(@PathVariable("id") String id, @RequestBody Person p) {
        System.out.println("person: " + p.toString());
        // TODO: figure out how to handle discrepancies
        personService.save(p);
    }

    /**
     * Delete a person from database
     * @param id the id of the person to delete
     */
    @DeleteMapping("/id")
    public void deletePerson(@PathVariable("id") String id) {
        // TODO: what if they don't have the id, only ssn
        int _id = Integer.parseInt(id);
        Person p = personService.findById(_id);
        System.out.println("person: " + p.toString());
        personService.delete(p);
    }
}
