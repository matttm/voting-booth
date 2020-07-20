package com.matttm.votingboothbackend.entities;

import javax.persistence.*;

/**
 * Created by Matt Maloney on 7/15/2020
 * matttm : mtm9051
 * matttmaloney@gmail.com
 * mtm9051@rit.edu
 * Language:  Java 1.8
 */
@Entity
@Table(name = "person")
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int ssn;
    private String fname;
    private String lname;
    private int zip;

    @Override
    public String toString() {
        return "Person{" +
                "id='" + id + '\'' +
                ", ssn=" + ssn +
                ", firstName='" + fname + '\'' +
                ", lastName='" + lname + '\'' +
                ", zipcode=" + zip +
                '}';
    }

    public int getId() {
        return id;
    }

    public int getSsn() {
        return ssn;
    }

    public String getFname() {
        return fname;
    }

    public String getLname() {
        return lname;
    }

    public int getZip() {
        return zip;
    }
}
