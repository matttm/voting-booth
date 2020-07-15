package com.matttm.votingboothbackend.schema;

import org.springframework.data.annotation.Id;

import java.sql.Date;

/**
 * Created by Matt Maloney on 7/15/2020
 * matttm : mtm9051
 * matttmaloney@gmail.com
 * mtm9051@rit.edu
 * Language:  Java 1.8
 */
public class Person {

    // TODO: encrypt at some point
    @Id
    private String id;
    private int ssn;
    private String firstName;
    private String lastName;
    private String city;
    private String state;
    private Date dob;

    public Person(int ssn, String firstName, String lastName,
                  String city, String state, Date dob) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
        this.city = city;
        this.state = state;
        this.dob = dob;
    }

    @Override
    public String toString() {
        return "Person{" +
                "id='" + id + '\'' +
                ", ssn=" + ssn +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", dob=" + dob +
                '}';
    }

    public String getId() {
        return id;
    }

    public int getSsn() {
        return ssn;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public Date getDob() {
        return dob;
    }
}
