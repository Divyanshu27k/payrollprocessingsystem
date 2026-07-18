package com.hrms.employeeservice.service;

import com.hrms.employeeservice.dto.EmployeeDto;
import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto getEmployeeByCode(String empCode);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updateEmployee(String empCode, EmployeeDto employeeDto);
    void deleteEmployee(String empCode);
}
