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

    Iterable<Person> findAll();
}
