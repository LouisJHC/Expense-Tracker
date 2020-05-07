package com.louisprogramming.expensetracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.time.Instant;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="expense")
public class Expense {

    // to use MySQL AUTO_INCREMENT so whenever the user adds the new expense, it can be added with a new primary key.
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;

    @NonNull
    private String description;

    private Instant expenseDate;

    private String location;

    // foreign key relation
    @ManyToOne
    private User user;

    // foreign key relation. Many expense can go to this one category
    // I can have 3 cars and all those 3 car loans can go under one category.
    @ManyToOne
    private Category category;

    public int getId() {
        return id;
    }


}
