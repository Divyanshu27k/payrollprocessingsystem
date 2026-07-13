package com.hrms.employeeservice.service.impl;

import com.hrms.employeeservice.dto.EmployeeDto;
import com.hrms.employeeservice.entity.Employee;
import com.hrms.employeeservice.exception.ResourceNotFoundException;
import com.hrms.employeeservice.repository.EmployeeRepository;
import com.hrms.employeeservice.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = new Employee();
        BeanUtils.copyProperties(employeeDto, employee);
        
        // Auto generate empCode if not provided
        if (employee.getEmpCode() == null || employee.getEmpCode().isEmpty()) {
            employee.setEmpCode("EMP" + UUID.randomUUID().toString().substring(0, 6).toUpperCase());
        }
        
        Employee savedEmployee = employeeRepository.save(employee);
        
        EmployeeDto savedDto = new EmployeeDto();
        BeanUtils.copyProperties(savedEmployee, savedDto);
        return savedDto;
    }

    @Override
    public EmployeeDto getEmployeeByCode(String empCode) {
        Employee employee = employeeRepository.findById(empCode)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with code: " + empCode));
        
        EmployeeDto dto = new EmployeeDto();
        BeanUtils.copyProperties(employee, dto);
        return dto;
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        return employeeRepository.findAll().stream().map(emp -> {
            EmployeeDto dto = new EmployeeDto();
            BeanUtils.copyProperties(emp, dto);
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(String empCode, EmployeeDto employeeDto) {
        Employee existingEmployee = employeeRepository.findById(empCode)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with code: " + empCode));
                
        // Copy new properties over existing ones (ignoring nulls ideally, but doing a full replace here for simplicity)
        BeanUtils.copyProperties(employeeDto, existingEmployee, "empCode", "createdAt", "updatedAt");
        
        Employee updatedEmployee = employeeRepository.save(existingEmployee);
        
        EmployeeDto resultDto = new EmployeeDto();
        BeanUtils.copyProperties(updatedEmployee, resultDto);
        return resultDto;
    }

    @Override
    public void deleteEmployee(String empCode) {
        Employee existingEmployee = employeeRepository.findById(empCode)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with code: " + empCode));
        
        employeeRepository.delete(existingEmployee);
    }
}
