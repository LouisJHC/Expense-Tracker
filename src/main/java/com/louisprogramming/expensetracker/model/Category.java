package com.louisprogramming.expensetracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="category")
public class Category {

    @Id
    private int id;

    @NonNull
    private String category;

//    @ManyToOne(cascade= CascadeType.PERSIST)
//    private User user;

    public int getId() {
        return id;
    }

}
