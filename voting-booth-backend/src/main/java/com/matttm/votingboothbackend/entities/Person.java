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
    private double ssn;
    private String fname;
    private String lname;
    private int zip;

    @Override
    public String toString() {
        return String.format("Person{" +
                "id='" + id + '\'' +
                ", ssn=%.0f" +
                ", firstName='" + fname + '\'' +
                ", lastName='" + lname + '\'' +
                ", zipcode=" + zip +
                '}', ssn);
    }

    public String ssnToString() {
        return String.format("%.0f", ssn);
    }

    public int getId() {
        return id;
    }

    public double getSsn() {
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

    public void setSsn(double ssn) {
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

        if (Double.compare(person.ssn, ssn) != 0) return false;
        if (zip != person.zip) return false;
        if (fname != null ? !fname.equals(person.fname) : person.fname != null)
            return false;
        return lname != null ? lname.equals(person.lname) : person.lname == null;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        temp = Double.doubleToLongBits(ssn);
        result = (int) (temp ^ (temp >>> 32));
        result = 31 * result + (fname != null ? fname.hashCode() : 0);
        result = 31 * result + (lname != null ? lname.hashCode() : 0);
        result = 31 * result + zip;
        return result;
    }
}
