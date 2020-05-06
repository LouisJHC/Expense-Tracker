package com.louisprogramming.expensetracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="user")
public class User {

    @Id
    private int id;

    private String name;

    private String email;



//    @OneToMany
//    private Set<Category> categories;
}
