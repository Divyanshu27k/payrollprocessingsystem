package com.hrms.employeeservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @Column(name = "emp_code", unique = true, nullable = false)
    private String empCode;

    // Personal Information
    private String firstName;
    private String middleName;
    private String lastName;
    private LocalDate dob;
    private String gender;
    private String bloodGroup;
    private String maritalStatus;
    private String nationality;

    // Contact Details
    private String phone;
    private String alternatePhone;
    @Column(unique = true)
    private String officialEmail;
    private String personalEmail;
    private String currentAddress;
    private String permanentAddress;
    private String emergencyContactName;
    private String emergencyContactPhone;

    // Documents / IDs
    @Column(unique = true)
    private String pan;
    @Column(unique = true)
    private String aadhar;
    @Column(unique = true)
    private String passport;
    private String drivingLicense;

    // Job Details
    private LocalDate joiningDate;
    private LocalDate confirmationDate;
    private LocalDate exitDate;
    private String department;
    private String designation;
    private String branch;
    private String location;
    private String reportingManager; // Store manager's emp_code
    private String employmentType; // Full-time, Contract, etc
    private Integer probationDays;
    private Integer noticePeriodDays;
    private String shift;
    private Boolean receivesCredentials;

    // Financial / Payroll Details
    private Double ctc;
    private String salaryStructure;
    private String bankName;
    private String accountNumber;
    private String ifscCode;
    private String pfNumber;
    private String esicNumber;
    private String uanNumber;
    private String taxRegime; // Old, New

    // Status
    private String status; // Active, Inactive, Terminated, On Leave

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
