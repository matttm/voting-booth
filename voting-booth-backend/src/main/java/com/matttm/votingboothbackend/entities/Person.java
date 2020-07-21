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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Person person = (Person) o;

        if (ssn != person.ssn) return false;
        if (zip != person.zip) return false;
        if (!fname.equals(person.fname)) return false;
        return lname.equals(person.lname);
    }

    @Override
    public int hashCode() {
        int result = ssn;
        result = 31 * result + fname.hashCode();
        result = 31 * result + lname.hashCode();
        result = 31 * result + zip;
        return result;
    }
}
