package com.example.web_application_to_support_electronics_store;

import com.example.web_application_to_support_electronics_store.config.model.*;
import com.example.web_application_to_support_electronics_store.repo.*;
import com.github.javafaker.Faker;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;

@SpringBootTest
class WebApplicationToSupportElectronicsStoreApplicationTests {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private CommentRepository commentRepository;

	// Dodaj inne potrzebne repozytoria

	@Test
	void contextLoads() {
		Faker faker = new Faker();
		Random random = new Random();

		// Inicjalizacja kategorii
		List<Category> categories = new ArrayList<>();
		for (int i = 0; i < 5; i++) {
			Category category = Category.builder()
					.CategoryName(faker.commerce().department())
					.build();
			categories.add(category);
		}
		categoryRepository.saveAll(categories);

		// Inicjalizacja użytkowników
		List<User> users = new ArrayList<>();
		for (int i = 0; i < 10; i++) {
			User user = User.builder()
					.name(faker.name().firstName())
					.lastName(faker.name().lastName())
					.email(faker.internet().emailAddress())
					.phone(faker.number().numberBetween(100000000, 999999999))
					.password(faker.internet().password())
					.userType(UserType.USER)
					.build();
			users.add(user);
		}
		userRepository.saveAll(users);

		// Inicjalizacja produktów
		List<Product> products = new ArrayList<>();
		for (int i = 0; i < 20; i++) {
			Product product = Product.builder()
					.productName(faker.commerce().productName())
					.category(categories.get(random.nextInt(categories.size())))
					.description(faker.lorem().paragraph())
					.rating(faker.number().numberBetween(1, 5))
					.price(Float.parseFloat(faker.commerce().price().replace(",", ".")))
					.image(faker.internet().avatar())
					.build();
			products.add(product);
		}
		productRepository.saveAll(products);

		// Inicjalizacja komentarzy
		List<Comment> comments = new ArrayList<>();
		for (int i = 0; i < 30; i++) {
			Comment comment = Comment.builder()
					.description(faker.lorem().sentence())
					.product(products.get(random.nextInt(products.size())))
					.user(users.get(random.nextInt(users.size())))
					.build();
			comments.add(comment);
		}
		commentRepository.saveAll(comments);

		// Możesz dodać inicjalizację innych encji według potrzeb

		System.out.println("Dane testowe zostały pomyślnie zainicjalizowane.");
	}
}
