package com.matttm.votingboothbackend.services;

import com.matttm.votingboothbackend.entities.Person;

/**
 * Created by Matt Maloney on 7/19/2020
 * matttm : mtm9051
 * matttmaloney@gmail.com
 * mtm9051@rit.edu
 * Language:  Java 1.8
 */
public interface PersonService {

    /**
     * Whether a person exists in the table
     * @param p the person to check for existence
     *
     * @return true iff p exists in database
     */
    boolean exists(Person p);

    /**
     * Find all persons in database
     * @return an iterable of all persons in database
     */
    Iterable<Person> findAll();

    /**
     * Find person with specific id
     * @param id the id of the person to be searched for
     *
     * @return the person with matching id
     */
    Person findById(int id);

    /**
     * Find person with specific ssn
     * @param ssn the ssn being searched for
     *
     * @return the person with the matching ssn
     */
    Person findBySsn(double ssn);

    /**
     * Find an iterable of people with given zip
     * @param zip the zip being searched for
     *
     * @return an iterable of people with given zip
     */
    Iterable<Person> findAllWithZip(int zip);

    /**
     * Save a modified entity
     * @param p a person to save
     *
     * @return the saved person
     */
    Person save(Person p);

    /**
     * Delete a person from database
     * @param p person to be deleted
     */
    void delete(Person p);
}
