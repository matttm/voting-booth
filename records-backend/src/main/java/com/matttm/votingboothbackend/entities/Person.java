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
    private String ssn;
    private String fname;
    private String lname;
    private int zip;

    public Person() {}

    public Person(int id, String ssn, String first, String last, int zip) {
        this.id = id;
        this.fname = first;
        this.lname = last;
        this.zip = zip;
    }

    @Override
    public String toString() {
        return "Person{" +
                "id='" + id + '\'' +
                ", ssn='" + ssn + '\'' +
                ", firstName='" + fname + '\'' +
                ", lastName='" + lname + '\'' +
                ", zipcode=" + zip +
                '}';
    }

    public int getId() {
        return id;
    }

    public String getSsn() {
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

    public void setId(int id) {
        this.id = id;
    }

    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public void setZip(int zip) {
        this.zip = zip;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Person person = (Person) o;

        if (zip != person.zip) return false;
        if (!ssn.equals(person.ssn)) return false;
        if (!fname.equals(person.fname)) return false;
        return lname.equals(person.lname);
    }

    @Override
    public int hashCode() {
        int result = ssn.hashCode();
        result = 31 * result + fname.hashCode();
        result = 31 * result + lname.hashCode();
        result = 31 * result + zip;
        return result;
    }
}
