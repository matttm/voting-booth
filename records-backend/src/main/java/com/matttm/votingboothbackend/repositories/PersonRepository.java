package com.matttm.votingboothbackend.repositories;

import com.matttm.votingboothbackend.entities.Person;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Created by Matt Maloney on 7/19/2020
 * matttm : mtm9051
 * matttmaloney@gmail.com
 * mtm9051@rit.edu
 * Language:  Java 1.8
 */
public interface PersonRepository extends CrudRepository<Person, Integer> {

    @Query("FROM Person WHERE ssn = :ssn")
    public Person findBySsn(@Param("ssn") String ssn);
}
