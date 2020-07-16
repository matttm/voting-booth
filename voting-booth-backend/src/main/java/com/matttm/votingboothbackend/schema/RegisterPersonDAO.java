package com.matttm.votingboothbackend.schema;

import java.sql.Connection;

/**
 * Created by Matt Maloney on 7/15/2020
 * matttm : mtm9051
 * matttmaloney@gmail.com
 * mtm9051@rit.edu
 * Language:  Java 1.8
 */
public interface RegisterPersonDAO {
    public Connection connect();
    public void save(Person person);
}
