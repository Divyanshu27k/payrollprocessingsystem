# Enterprise Payroll Management System (HRMS) Implementation Plan

Building a complete production-ready Enterprise HRMS is a massive undertaking. To ensure clean architecture and maintainable code, I propose developing this system in iterative phases. 

This plan covers the foundational setup, the core architecture, and Phase 1 of the implementation (Core Services + Work Mode Feature).

## User Review Required

> [!WARNING]
> This is a large-scale enterprise application with over 15 microservices. Generating the entire system in a single step is not feasible and would lead to brittle, unmaintainable code. 
> **I strongly recommend a phased implementation approach.** We will build the foundational infrastructure and core services first, ensure they work seamlessly, and then iteratively add the remaining domains (Payroll, Leave, etc.). Please review the proposed phases below.

## Open Questions

1. **Database Strategy:** Do you want a single shared MySQL database for all microservices (easier to manage initially) or separate databases per microservice (true microservices pattern but more complex setup)?
2. **Frontend Initialization:** For the React frontend, do you prefer we initialize it using Vite or Create React App? (Vite is recommended for better performance).
3. **Work Mode Option:** You requested a "Work from Office or Work from Home" option. Should this be a daily request/approval in the Attendance module, or a permanent setting in the Employee profile? (I have planned it as a daily attendance feature for now).

## Phased Approach

### Phase 1: Foundation & Core Services (Current Focus)
- Set up parent Maven POM for dependency management.
- **Discovery Server:** Spring Cloud Eureka.
- **Config Server:** Spring Cloud Config.
- **API Gateway:** Spring Cloud Gateway with JWT routing.
- **Authentication Service:** JWT generation, role-based access control (Admin, HR, Manager, Employee).
- **Employee Service:** Core employee data management.
- **Docker Setup:** `docker-compose.yml` for MySQL, Redis, Kafka, and the Phase 1 services.

### Phase 2: Time & Attendance (Includes WFH/WFO Feature)
- **Attendance Service:** Check-in/out logic, geolocation, and the requested **Work From Office (WFO) / Work From Home (WFH)** check-in option.
- **Leave Service:** Leave requests, balance calculation, sandwich leave logic.
- **Shift Service:** Roster management.

### Phase 3: Payroll Engine & Compensation
- **Payroll Service:** Salary formula engine, tax calculations (PF, PT, TDS), payslip generation.
- **Loan & Reimbursement Services.**

### Phase 4: Frontend & Remaining Services
- React.js frontend (Dashboards, Employee Portal, Admin Portal).
- Notification, Report, and Audit Services.

---

## Proposed Changes (Phase 1)

I will create the base project structure in `c:\Users\divya\Desktop\Payroll Processing`.

### Project Root

#### [NEW] [pom.xml](file:///c:/Users/divya/Desktop/Payroll%20Processing/pom.xml)
Parent Maven POM to manage common dependencies (Spring Boot 3, Spring Cloud, Lombok, MapStruct) across all microservices.

#### [NEW] [docker-compose.yml](file:///c:/Users/divya/Desktop/Payroll%20Processing/docker-compose.yml)
Infrastructure definitions for MySQL, Redis, Kafka, Zookeeper, and Zipkin.

### Infrastructure Services

#### [NEW] [discovery-server](file:///c:/Users/divya/Desktop/Payroll%20Processing/discovery-server)
Spring Cloud Eureka server for service registration.

#### [NEW] [config-server](file:///c:/Users/divya/Desktop/Payroll%20Processing/config-server)
Spring Cloud Config server to serve centralized configurations (application.yml) for all services.

#### [NEW] [api-gateway](file:///c:/Users/divya/Desktop/Payroll%20Processing/api-gateway)
Spring Cloud Gateway configured to route requests and validate JWT tokens at the edge.

### Domain Microservices

#### [NEW] [auth-service](file:///c:/Users/divya/Desktop/Payroll%20Processing/auth-service)
Handles user credentials, generates JWT/Refresh tokens. Includes Entity, Repository, Service, Controller, and Spring Security configurations.

#### [NEW] [employee-service](file:///c:/Users/divya/Desktop/Payroll%20Processing/employee-service)
Manages employee lifecycle, personal information, and department assignment. Includes REST APIs with Swagger documentation.

## Verification Plan

### Automated Verification
- Run `mvn clean install` on the parent project to verify all Phase 1 services compile successfully.
- Start the infrastructure using `docker-compose up -d`.

### Manual Verification
- Start Discovery Server, Config Server, API Gateway, Auth Service, and Employee Service.
- Verify services register successfully in the Eureka Dashboard.
- Test the `/login` endpoint in Auth Service via Gateway.
- Test creating an employee through the API Gateway using the generated JWT.
