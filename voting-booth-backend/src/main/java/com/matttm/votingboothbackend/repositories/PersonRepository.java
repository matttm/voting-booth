package com.matttm.votingboothbackend.repositories;

import com.matttm.votingboothbackend.entities.Person;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Matt Maloney on 7/19/2020
 * matttm : mtm9051
 * matttmaloney@gmail.com
 * mtm9051@rit.edu
 * Language:  Java 1.8
 */
@Repository("personRepository")
public interface PersonRepository extends CrudRepository<Person, Integer> {
}
