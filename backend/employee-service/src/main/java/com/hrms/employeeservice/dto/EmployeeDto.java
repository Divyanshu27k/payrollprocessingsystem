package com.hrms.employeeservice.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class EmployeeDto {
    private String empCode;
    private String photoUrl;
    
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
    private String officialEmail;
    private String personalEmail;
    private String currentAddress;
    private String permanentAddress;
    private String emergencyContactName;
    private String emergencyContactPhone;

    // Documents / IDs
    private String pan;
    private String aadhar;
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
    private String reportingManager;
    private String employmentType;
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
    private String taxRegime;

    private String status;
}
