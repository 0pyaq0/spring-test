package com.example.blog

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager
import org.springframework.data.repository.findByIdOrNull

@DataJpaTest
class RepositoriesTests @Autowired constructor(
        val entityManager: TestEntityManager,
        val userRepository: UserRepository,
        val articleRepository: ArticleRepository){

    @Test
    fun `When findByIdOrNull then return Article`() {
        val miak = User("springmia", "Mia", "K")
        entityManager.persist(miak)
        val article = Article("스프링-코틀린 웹앱 만들기", "(2) JPA, 컨트롤러 등 구현", "Lorem ipsum", miak)
        entityManager.persist(article)
        entityManager.flush()
        val found = articleRepository.findByIdOrNull(article.id!!)
        assertThat(found).isEqualTo(article)
    }

    @Test
    fun `When findByLogin then return User`() {
        val miak = User("springmia", "Mia", "K")
        entityManager.persist(miak)
        entityManager.flush()
        val user = userRepository.findByLogin(miak.login)
        assertThat(user).isEqualTo(miak)
    }
}