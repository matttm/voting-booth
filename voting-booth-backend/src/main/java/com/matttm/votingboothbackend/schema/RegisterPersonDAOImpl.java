package com.matttm.votingboothbackend.schema;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.sqlite.SQLiteDataSource;

import java.sql.Connection;
import java.sql.SQLException;

/**
 * Created by Matt Maloney on 7/15/2020
 * matttm : mtm9051
 * matttmaloney@gmail.com
 * mtm9051@rit.edu
 * Language:  Java 1.8
 */
@Repository("RegisterPersonDAO")
public class RegisterPersonDAOImpl implements RegisterPersonDAO {

    @Autowired
    SQLiteDataSource dataSource;

    @Override
    public Connection connect() {
        Connection conn = null;
        try {
            conn = dataSource.getConnection();
            System.out.println("Connection to persons database established");
        } catch (SQLException e) {
            System.out.println("ERROR: " + e.getMessage());
        }
        return conn;
    }

    @Override
    public void save(Person person) {

    }
}
