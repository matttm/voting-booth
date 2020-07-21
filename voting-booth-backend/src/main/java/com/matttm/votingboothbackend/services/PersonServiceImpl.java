package com.matttm.votingboothbackend.services;

import com.matttm.votingboothbackend.entities.Person;
import com.matttm.votingboothbackend.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Matt Maloney on 7/19/2020
 * matttm : mtm9051
 * matttmaloney@gmail.com
 * mtm9051@rit.edu
 * Language:  Java 1.8
 */
@Service("personService")
public class PersonServiceImpl implements PersonService {

    @Autowired
    private PersonRepository personRepository;

    /**
     * Whether a person exists in the table
     *
     * @param p the person to check for existence
     * @return true iff p exists in database
     */
    @Override
    public boolean exists(Person p) {
        // TODO: make another way
        return this.findBySsn(p.getSsn()).equals(p);
    }

    /**
     * Find all persons in database
     * @return an iterable of all persons in database
     */
    @Override
    public Iterable<Person> findAll() {
        return personRepository.findAll();
    }

    /**
     * Find person with specific id
     *
     * @param id the id of the person to be searched for
     * @return the person with matching id
     */
    @Override
    public Person findById(int id) {
        return personRepository.findById(id).orElse(null);
    }

    /**
     * Find person with specific ssn
     *
     * @param ssn the ssn being searched for
     * @return the person with the matching ssn
     */
    @Override
    public Person findBySsn(double ssn) {
        return personRepository.findBySsn(ssn);
    }

    /**
     * Find an iterable of people with given zip
     *
     * @param zip the zip being searched for
     * @return an iterable of people with given zip
     */
    @Override
    public Iterable<Person> findAllWithZip(int zip) {
        // TODO: make query for this
        return null;
    }

    /**
     * Save a modified entity
     *
     * @param p a person to save
     * @return the saved person
     */
    @Override
    public Person save(Person p) {
        return personRepository.save(p);
    }

    /**
     * Delete a person from database
     *
     * @param p person to be deleted
     */
    @Override
    public void delete(Person p) {
        personRepository.delete(p);
    }
}
