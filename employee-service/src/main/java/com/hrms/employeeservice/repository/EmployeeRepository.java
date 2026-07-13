package com.hrms.employeeservice.repository;

import com.hrms.employeeservice.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {
    Optional<Employee> findByOfficialEmail(String officialEmail);
    boolean existsByEmpCode(String empCode);
}
