package com.louisprogramming.expensetracker.controller;

import com.louisprogramming.expensetracker.model.Category;
import com.louisprogramming.expensetracker.repository.CategoryRepository;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CategoryController {

    private CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        super();
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/categories") // Why Collection instead of List? because I want it to be applied to all collections, not just list
    public Collection<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<?> getCategory(@PathVariable int id) {
        // why Optional here? because .findById(id) might return nothing.
       Optional<Category> category = categoryRepository.findById(id);

       // if found, show a Status: 200 OK and its json body in Postman. If not, set the Status: 204 No Content
       return category.map(res -> ResponseEntity.ok().body(res)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/category")
    // @Valid means it should be valid category (e.g. I set the @NonNull to category field, so it should not violate that).
    // it is ResponseEntity<Category> because I know it is going to be the category. <?> is okay too here.

    // @RequestBody uses HTTP Message converters to convert the body of HTTP request/response to domain objects.
    public ResponseEntity<Category> postCategory(@Valid @RequestBody Category category) throws URISyntaxException {
        Category result = categoryRepository.save(category);
        return ResponseEntity.created(new URI("/api/category" + result.getId())).body(result);
    }

    @PutMapping("/category/{id}")
    public ResponseEntity<Category> updatedCategory(@Valid @RequestBody Category category) throws URISyntaxException {
        Category result = categoryRepository.save(category);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/category/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable int id) {
        categoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }



}
