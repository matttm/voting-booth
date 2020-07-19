package com.matttm.votingboothbackend.services;

import com.matttm.votingboothbackend.entities.Person;
import com.matttm.votingboothbackend.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
    @Qualifier("personRepository")
    private PersonRepository personRepository;

    @Override
    public Iterable<Person> findAll() {
        return personRepository.findAll();
    }
}
