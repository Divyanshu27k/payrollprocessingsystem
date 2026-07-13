package com.hrms.employeeservice.controller;

import com.hrms.employeeservice.dto.EmployeeDto;
import com.hrms.employeeservice.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allows React frontend to call
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    @GetMapping("/{empCode}")
    public ResponseEntity<EmployeeDto> getEmployeeByCode(@PathVariable String empCode) {
        EmployeeDto employeeDto = employeeService.getEmployeeByCode(empCode);
        return ResponseEntity.ok(employeeDto);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        List<EmployeeDto> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    @PutMapping("/{empCode}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable String empCode, @RequestBody EmployeeDto employeeDto) {
        EmployeeDto updatedEmployee = employeeService.updateEmployee(empCode, employeeDto);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/{empCode}")
    public ResponseEntity<String> deleteEmployee(@PathVariable String empCode) {
        employeeService.deleteEmployee(empCode);
        return ResponseEntity.ok("Employee deleted successfully");
    }
}
