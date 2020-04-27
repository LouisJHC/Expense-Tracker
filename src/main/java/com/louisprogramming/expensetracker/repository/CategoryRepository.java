package com.louisprogramming.expensetracker.repository;

import com.louisprogramming.expensetracker.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

//    String findByCategory(String category);
}
