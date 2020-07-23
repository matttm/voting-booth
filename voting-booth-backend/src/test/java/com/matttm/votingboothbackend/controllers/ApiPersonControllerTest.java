package com.matttm.votingboothbackend.controllers;

import com.matttm.votingboothbackend.entities.Person;
import com.matttm.votingboothbackend.repositories.PersonRepository;
import com.matttm.votingboothbackend.services.PersonService;
import static java.util.Optional.of;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;

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
    public void testGetPersonWithoutError() {
        String id = "0";
        int _id = Integer.parseInt(id);
        Person expect = new Person();
        expect.setId(_id);
        when(repository.findById(_id)).thenReturn(of(expect));
        when(service.findById(_id)).thenReturn(expect);

        Person p = controller.getPerson(id).getBody();
        assertNotNull(p);
        assertEquals(Integer.parseInt(id), p.getId());
    }
}
