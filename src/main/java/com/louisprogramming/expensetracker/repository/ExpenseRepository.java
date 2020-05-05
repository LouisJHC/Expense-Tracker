package com.louisprogramming.expensetracker.repository;

import com.louisprogramming.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
}
