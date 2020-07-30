package com.matttm.votingboothbackend.controllers;

import com.matttm.votingboothbackend.entities.Person;
import com.matttm.votingboothbackend.messages.SimpleMessage;
import com.matttm.votingboothbackend.repositories.PersonRepository;
import com.matttm.votingboothbackend.services.PersonService;
import static java.util.Optional.of;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * Created by Matt Maloney on 7/23/2020
 * matttm : mtm9051
 * matttmaloney@gmail.com
 * mtm9051@rit.edu
 * Language:  Java 1.8
 */
public class ApiPersonControllerTest {

    @InjectMocks
    private ApiPersonController controller;

    @Mock
    private PersonService service;

    @Mock
    private PersonRepository repository;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testTestEndpoint() {
        assertEquals(controller.testServer(), "Testing...");
    }

    @Test
    public void testForgotIdWithExistingId() {
        String ssn = "123456789";
        int expected = 0;
        Person tmp = new Person();
        tmp.setSsn(ssn);
        when(repository.findBySsn(ssn)).thenReturn(tmp);
        when(service.findBySsn(ssn)).thenReturn(tmp);

        ResponseEntity<SimpleMessage<Integer>> res = controller.getId(ssn);
        SimpleMessage<Integer> body = res.getBody();
        assertNotNull(body);
        int actual = body.getData();
        assertEquals(res.getStatusCode(), HttpStatus.OK);
        assertEquals(expected, actual);
    }

    @Test
    public void testValidateWithExistingPerson() {
        int id = 0;
        String ssn = "123456789";
        String[] name = {"matt", "maloney"};
        int zip = 19022;
        Person p = new Person(id, ssn, name[0], name[1], zip);
        boolean expect = true;

        when(repository.findBySsn(p.getSsn())).thenReturn(p);
        when(service.exists(p)).thenReturn(expect);

        ResponseEntity<SimpleMessage<Boolean>> res = controller.validate(p);
        SimpleMessage<Boolean> body = res.getBody();
        assertNotNull(body);
        assertEquals(res.getStatusCode(), HttpStatus.OK);
        assertTrue(body.getSuccess());
        assertEquals(body.getData(), expect);
    }

    @Test
    public void testGetPersonWithoutError() {
        String id = "0";
        int _id = Integer.parseInt(id);
        Person expect = new Person();
        expect.setId(_id);
        when(repository.findById(_id)).thenReturn(of(expect));
        when(service.findById(_id)).thenReturn(expect);

        ResponseEntity<Person> res = controller.getPerson(id);
        Person p = res.getBody();
        assertNotNull(p);
        assertEquals(res.getStatusCode(), HttpStatus.OK);
        assertEquals(p.getId(), Integer.parseInt(id));
    }

    @Test
    public void testUpdatePersonThatExists() {
        int id = 0;
        String ssn = "123456789";
        String[] name = {"matt", "maloney"};
        int zip = 19022;
        Person p = new Person(id, ssn, name[0], name[1], zip);

        when(repository.save(p)).thenReturn(p);
        when(service.save(p)).thenReturn(p);

        ResponseEntity<SimpleMessage<String>> res =
                controller.updatePerson(String.valueOf(id), p);
        SimpleMessage<String> body = res.getBody();
        assertNotNull(body);
        assertEquals(res.getStatusCode(), HttpStatus.OK);
        assertTrue(body.getSuccess());
        assertEquals(body.getData(), "null");
    }

    @Test
    public void testDeletePersonThatExists() {
        int id = 0;
        String ssn = "123456789";
        String[] name = {"matt", "maloney"};
        int zip = 19022;
        Person p = new Person(id, ssn, name[0], name[1], zip);

        when(service.findById(id)).thenReturn(p);

        ResponseEntity<SimpleMessage<String>> res =
                controller.deletePerson(String.valueOf(id));
        SimpleMessage<String> body = res.getBody();
        assertNotNull(body);
        assertEquals(res.getStatusCode(), HttpStatus.OK);
        assertTrue(body.getSuccess());
        assertEquals(body.getData(), "null");
    }
}
