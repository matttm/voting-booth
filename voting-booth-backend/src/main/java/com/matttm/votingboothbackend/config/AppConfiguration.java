package com.matttm.votingboothbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.sqlite.SQLiteDataSource;

/**
 * Created by Matt Maloney on 7/16/2020
 * matttm : mtm9051
 * matttmaloney@gmail.com
 * mtm9051@rit.edu
 * Language:  Java 1.8
 */
@Configuration
@ComponentScan(basePackages = "com")
@EnableWebSecurity
public class AppConfiguration extends WebSecurityConfigurerAdapter {

    // TODO: add security measures when everything is working
    @Bean
    public SQLiteDataSource sqLiteDataSource() {
        String dbFile = "persons.db";
        String url = "jdbc:sqlite:"+dbFile;
        SQLiteDataSource ds = new SQLiteDataSource();
        ds.setUrl(url);
        return ds;
    }
}
