package com.louisprogramming.expensetracker.controller;

import com.louisprogramming.expensetracker.model.Expense;
import com.louisprogramming.expensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class ExpenseController {

    @Autowired
    ExpenseRepository expenseRepository;

    @RequestMapping(value="/expenses", method=RequestMethod.GET)
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @RequestMapping(value="/expense/{id}", method=RequestMethod.GET)
    public ResponseEntity<?> getExpense(@PathVariable int id) {
        Optional<Expense> result = expenseRepository.findById(id);
        return result.map(res -> ResponseEntity.ok().body(res)).orElseGet(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @RequestMapping(value="/expense", method=RequestMethod.POST)
    public ResponseEntity<Expense> postExpense(@Valid @RequestBody Expense expense) throws URISyntaxException {
        Expense result = expenseRepository.save(expense);

        return ResponseEntity.created(new URI("/api/expense/" + result.getId())).body(result);
    }

    @RequestMapping(value="/expense/{id}", method=RequestMethod.PUT)
    public ResponseEntity<Expense> updateExpense(@Valid @RequestBody Expense expense) throws URISyntaxException {
        Expense result = expenseRepository.save(expense);
        return ResponseEntity.ok().body(result);
    }

    @RequestMapping(value="/expense/{id}", method=RequestMethod.DELETE)
    public ResponseEntity<?> deleteExpense(@PathVariable int id) {
        expenseRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
