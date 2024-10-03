# **Construction Company Resource Management Application - Server-Side Documentation**

### **🚀 Tech Stack and Overview**

This system is built using **Nest.js** for the backend, **PostgreSQL** for the database, and **TypeORM** for ORM. It follows a modular architecture to ensure scalability and maintainability.

- **Nest.js**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications using TypeScript.
- **PostgreSQL**: The primary database used for its reliability and powerful features, managed via **TypeORM**.
- **JWT Authentication**: Used for securing endpoints with role-based access control.
- **Docker**: The application can be containerized using Docker for easier deployment and consistent environments across different stages (development, staging, production).

---

## 1. **📁 Folder Structure Overview**

The backend is organized into logical modules, each handling a specific part of the system's functionality. This ensures the system is modular, maintainable, and easy to extend.

- **modules/**: Contains all the individual modules of the application (e.g., `AuthModule`, `ProjectsModule`, `RequestsModule`, etc.)
- **entities/**: Defines the entities (models) used in the database via TypeORM.
- **controllers/**: Contains the controller logic for handling API requests.
- **services/**: Contains business logic and interaction with repositories.
- **middlewares/**: Handles cross-cutting concerns like authentication, validation, and error handling.
- **interceptors/**: Used for transforming responses before they are sent to the client.
  
---

## 2. **🔧 Modules Breakdown**

- **auth**: Handles user authentication and role-based access control. Manages login, registration, and access to secured endpoints.
- **users**: Manages the CRUD operations for users and roles in the system.
- **inventory**: Manages the materials in the warehouse, including stock updates, CRUD operations, and low-stock alerts.
- **projects**: Handles the creation and management of construction projects. Tracks project status, descriptions, and team assignments.
- **requests**: Manages material requests for projects, from creation by the Foreman to approval by the Administrator and execution by the Warehouse Manager.
- **suppliers**: Manages suppliers, including adding, updating, and tracking material orders from suppliers.
- **accounting**: Manages financial calculations related to material costs and supplier payments. Tracks expenses and maintains budgets.
- **reports**: Generates reports based on inventory, material requests, project statuses, and financial data.

---

## 3. **⚙️ Controllers and Services**

- **AuthController**: Provides endpoints for user authentication, including login and registration. Handles token generation and validation via JWT.
- **UsersController**: Manages user-related endpoints, such as fetching user information, updating profiles, and assigning roles.
- **ProjectsController**: Handles the creation, updating, and deletion of projects, including fetching the list of projects.
- **RequestsController**: Manages material requests, from creation to approval, including status updates and validations.
- **SuppliersController**: Manages supplier-related operations, including creating and updating supplier information and placing orders.
- **InventoryController**: Provides CRUD functionality for materials, updates stock, and tracks material usage.
- **AccountingController**: Tracks all expenses and manages the project budgets, providing endpoints for calculating and recording financial information.

---

## 4. **🚦 API Endpoints**

### **Auth**
- **POST** `/auth/login`: Authenticate a user and generate a JWT token.
- **POST** `/auth/register`: Register a new user (Admin only).

### **Projects**
- **GET** `/projects`: Retrieve all projects with status and team information.
- **POST** `/projects`: Create a new project with assigned status and foreman.
- **PATCH** `/projects/:id`: Update a project’s details.
- **DELETE** `/projects/:id`: Delete a project (restricted if there are associated requests).

### **Requests**
- **GET** `/requests`: Retrieve all material requests.
- **POST** `/requests`: Create a new material request for a project.
- **PATCH** `/requests/:id`: Update the status or details of a material request.
- **DELETE** `/requests/:id`: Delete a material request.

### **Inventory**
- **GET** `/inventory`: Retrieve all materials and their stock levels.
- **POST** `/inventory`: Add a new material to the warehouse.
- **PATCH** `/inventory/:id`: Update the quantity or details of a material.
- **DELETE** `/inventory/:id`: Remove a material from the inventory.

### **Suppliers**
- **GET** `/suppliers`: Retrieve all suppliers and their contact details.
- **POST** `/suppliers`: Add a new supplier.
- **PATCH** `/suppliers/:id`: Update supplier details.
- **DELETE** `/suppliers/:id`: Delete a supplier.

### **Accounting**
- **GET** `/accounting`: Fetch all expenses and transactions.
- **POST** `/accounting`: Record a new financial transaction.

### **Reports**
- **GET** `/reports`: Generate a report on various parts of the system (inventory, requests, projects, financials).

---

## 5. **📝 Application Workflow**

### **Step 1: Project Creation**
The **Manager** creates a project, defining details such as the project name, description, and assigned foreman. The project is stored with a status (e.g., "Not Started", "In Progress", "Completed"). This is the starting point for all workflow activities, as material requests are tied to these projects.

### **Step 2: Material Inventory Management**
The **Warehouse Manager** manages all materials in the inventory, updating stock levels and prices, ensuring materials are ready for requests. This includes CRUD operations for adding, updating, or removing materials and keeping track of quantities. Low-stock alerts are triggered automatically when quantities fall below a threshold.

### **Step 3: Request Creation**
A **Foreman** selects a project that hasn't started and creates a **Material Request** specifying the required materials and their quantities. The request is submitted to the **Manager** for review and approval.

### **Step 4: Request Processing**
The **Manager** receives the request and checks the inventory for availability. If the materials are available, the **Manager** forwards the request to the **Administrator**. If materials are unavailable, the **Manager** consults the **Accountant** and contacts **Suppliers** to place new orders.

### **Step 5: Request Approval**
The **Administrator** reviews the request after the **Manager** closes it. If approved, the request is sent to the **Warehouse Manager** for fulfillment. If rejected, it is sent back to the **Manager** for adjustment.

### **Step 6: Request Fulfillment**
The **Warehouse Manager** fulfills the request by delivering the materials to the project site. After fulfillment, the inventory is updated, and the request is marked as completed.

### **Step 7: Financial Management**
Once the materials are delivered, the **Accountant** calculates the expenses related to the materials used and updates the system’s financial records. This includes recording supplier costs, material prices, and project budgets.

### **Step 8: Project Completion**
As the project progresses, the **Manager** or **Administrator** updates the project’s status to reflect its phase ("In Progress", "Completed"). Upon completion, all associated requests and expenses are closed, and the project is finalized.

---

## 6. **🛠️ Database Schema**

- **Users**: Handles all user-related information, including roles.
- **Projects**: Stores all project-related data such as project name, status, and assigned foreman.
- **Requests**: Tracks all material requests, their status, and related project details.
- **Materials**: Stores all materials in the inventory with quantity, cost, and type.
- **Suppliers**: Keeps track of supplier information and their associated material orders.
- **Accounting**: Logs all expenses and tracks the financial side of material requests and supplier payments.

