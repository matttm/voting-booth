package com.matttm.votingboothbackend.schema;

/**
 * Created by Matt Maloney on 7/15/2020
 * matttm : mtm9051
 * matttmaloney@gmail.com
 * mtm9051@rit.edu
 * Language:  Java 1.8
 */
public class Person {

    private int id;
    private int ssn;
    private String firstName;
    private String lastName;
    private int zipcode;

    public Person(int ssn, String firstName, String lastName, int zipcode) {
        super();
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
        this.zipcode = zipcode;
    }

    @Override
    public String toString() {
        return "Person{" +
                "id='" + id + '\'' +
                ", ssn=" + ssn +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", zipcode=" + zipcode +
                '}';
    }

    public int getId() {
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

    public int getZipcode() {
        return zipcode;
    }
}
