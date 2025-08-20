// package com.appdev.appdev.Model;

// import jakarta.persistence.*;
// import java.time.LocalDate;

// @Entity
// public class Holiday {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Column(unique = true)
//     private LocalDate date;

//     private String name;

//     // Getters and setters
//     public Long getId() {
//         return id;
//     }
//     public void setId(Long id) {
//         this.id = id;
//     }

//     public LocalDate getDate() {
//         return date;
//     }
//     public void setDate(LocalDate date) {
//         this.date = date;
//     }

//     public String getName() {
//         return name;
//     }
//     public void setName(String name) {
//         this.name = name;
//     }
// }
package com.appdev.appdev.Model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "holidays", uniqueConstraints = @UniqueConstraint(columnNames = "date"))
public class Holiday {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private LocalDate date;

    @Column(length = 255)
    private String name;

    // getters & setters
    public Long getId() { return id; }
    
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public void setId(Long id) {
        this.id = id;
    }
}
