package com.louisprogramming.expensetracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.Instant;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="expense")
public class Expense {

    @Id
    private int id;

    private String description;

    private Instant expenseDate;

    // foreign key relation
    @ManyToOne
    private User user;

    // foreign key relation. Many expense can go to this one category
    // I can have 3 cars and all those 3 car loans can go under one category.
    @ManyToOne
    private Category category;


}
