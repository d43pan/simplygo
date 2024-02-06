# Simplygo

Simplygo is a lightweight, easy-to-use PHP library designed to streamline the process of setting up redirects. With a minimalistic approach, Simplygo focuses on simplicity and ease of use, making it an ideal choice for small projects or for those just starting with PHP.

The setup process is as straightforward as it gets. If you're using Docker, you can have Simplygo up and running with just a single command. Even if you prefer to run it locally, all you need is PHP and a simple command to start the server.

Simplygo also comes with a simple database interface for managing redirects, making it easy to add, update, or delete redirects as needed. The database schema is designed to be simple yet flexible, allowing for soft deletes and unique constraints on paths and URLs.

In short, if you're looking for a simple, easy-to-use solution for managing redirects in PHP, simply go to Simplygo.

# Using

## URL structure
`example.com/<path>`  
Create a redirect at `<path>`.  
The next time you go to `example.com/<path>` you will be redirected to the url you entered.  


`example.com/<path>/delete`  
Delete the redirect at `<path>`.  
The next time you to go `example.com/<path>` you will be prompted to enter a url.  

That's it. That's the api.




# Installing
## Run dockerized php and simply  (start here) 
* `cd php`  
* Build and run your simplygo server: `docker build -t simplygo . && docker run --rm -p 8000:80 -e SERVER_NAME=localhost:8000 --name simplygo_server simplygo`  
* Visit `localhost:8000`
* Your database will not persist outside of the container. Feel free to download the links and then reupload them.
* Simple.

## Remove dockerized app
* `docker rm -f sgophp` This will stop and delete the container.


## Run locally and simply
`php -S localhost:8000 -c php.ini`   

* You might have to edit the php.ini file if your php is in a different location.  
* You might have to ensure all the plugins are installed  


# Development
## Local


`cd node`
`set -o allexport && source ../.env && set +o allexport`
`bash db/postgres_init.sh`
`npx knex migrate:up`
`npm run knex -- seed:run`


# Running the node code
`yarn install`
`yarn dev`

# Kill zombie process
`fuser -k 9000/tcp`


# React App
`yarn dev`

## Notes
## Entities 

* Redirect
  * Path
  * URL 
  * Path Params (optional)
  * Tags (optional)

* User
  * Email

* Organization 
  * Subdomain

Users belong to many organizations.  

Redirects belong to one organization.  

Redirects belong to one user.  

Redirects are soft deleted.
Redirects are unique at the path,url for each organization.  

Organizations have rbac which control the behavior of actions for path, user, org. 

Organization roles.
* Admin - can change organization settings.
* User - can create and delete redirects 




## Routes
<organization>.hostname


`
/go/<path>/<path_action>  
/u/<user>/<user_action>  
/o/<org>/<org_action>  
/a/<app_path>  
/<single_chars_reserved>/
`


## AI based instructions

Certainly! Let's integrate the details of your entities and their relationships into the setup guide.

---

# Full-Stack App Setup Guide with Entities and RBAC

This guide outlines the steps to set up a full-stack application using Express, PostgreSQL, React, Knex.js, TypeScript, focusing on your specific entities (Redirect, User, Organization) and implementing Role-Based Access Control (RBAC).

## Prerequisites

- Node.js and npm installed
- PostgreSQL installed
- Basic knowledge of TypeScript

## Step 1: Initialize the Project

```bash
mkdir my-fullstack-app
cd my-fullstack-app
npm init -y
```

## Step 2: Backend Setup

### Install Dependencies

```bash
npm install express knex pg body-parser cors
npm install @types/express @types/node typescript ts-node @types/cors @types/body-parser --save-dev
```

### Initialize TypeScript

```bash
npx tsc --init
```

### Setup Express

Create a `src` directory. Inside, add a `server.ts` file for your Express server setup.

### Setup Knex.js for PostgreSQL

Initialize Knex and configure it for PostgreSQL.

```bash
npx knex init
```

Configure `knexfile.js` for your database connection.

### Define Entities and Relationships

Your application involves three main entities: `Redirect`, `User`, and `Organization`, with specific relationships:

- Users belong to many Organizations.
- Redirects belong to one Organization and one User.
- Redirects are unique within an Organization based on `path` and `url`.

#### Database Migrations

Create migrations for each entity, ensuring to capture their relationships and unique constraints.

```bash
npx knex migrate:make create_users
npx knex migrate:make create_organizations
npx knex migrate:make create_redirects
```

Implement the migrations to define tables that reflect the entities and their relationships, including foreign keys and unique constraints as necessary.

## Step 3: Frontend Setup with React and TypeScript

```bash
npx create-react-app client --template typescript
```

## Step 4: Implementing RBAC

### Backend

1. **Database Design**: Extend your database schema to include roles within the `OrganizationUsers` join table.
2. **Middleware**: Implement middleware in Express to check a user's role before allowing access to certain endpoints.
3. **Business Logic**: Enforce role-based logic in your service layer or controllers, ensuring users can only perform actions allowed by their role.

### Frontend

1. **Role Management**: After login, fetch and store the user's roles.
2. **Conditional UI**: Adjust the UI based on the user's roles to enable or disable features.
3. **Route Guards**: Use React Router to protect routes based on the user's role.

## Step 5: Running Your Application

Ensure your PostgreSQL database is running. Apply migrations to set up your database schema.

Start the backend server:

```bash
ts-node src/server.ts
```

In a new terminal, launch the React frontend:

```bash
cd client
npm start
```

Your application is now running with the defined entities, their relationships, and RBAC implemented.

## Security Considerations

- Enforce all access controls on the server side.
- Regularly review and update roles, permissions, and access controls to ensure they meet your application's security requirements.

---

Certainly! Adding an administration section to your guide will help in managing the application, especially for tasks related to user and role management, monitoring, and maintenance. Here's how you can integrate an "Administration" section into your markdown guide.

---

# Administration of the Full-Stack App

After setting up your application with the necessary entities, relationships, and RBAC, it's crucial to have an administration mechanism in place for managing users, organizations, redirects, and roles effectively. This section outlines the key components and features you might include in your administration dashboard or tools.

## Admin Dashboard

An admin dashboard provides a graphical interface for administrators to manage the application's core functionalities. Consider including the following features:

### User Management

- **List Users**: Display all users with pagination, search, and filter capabilities.
- **Create/Edit/Delete Users**: Allow admins to add new users, edit existing user details, and delete users (with appropriate safeguards against accidental deletion).

### Organization Management

- **List Organizations**: Show all organizations with options to search and filter.
- **Create/Edit/Delete Organizations**: Enable admins to manage organizations, including assigning users to organizations and setting their roles.

### Redirect Management

- **List Redirects**: Provide a view of all redirects, including soft-deleted ones, with options to filter by organization or user.
- **Create/Edit/Delete Redirects**: Facilitate the management of redirects, ensuring that only authorized admins can delete or edit redirects.

### Role and Access Control Management

- **Manage Roles**: Define and edit roles within organizations, including the permissions associated with each role.
- **Assign Roles to Users**: Allow admins to assign or change roles for users within organizations.

## Monitoring and Logs

Implement logging and monitoring to track user activities, system errors, and performance metrics. This can help in troubleshooting, auditing, and optimizing the application.

### Activity Logs

- Track and display logs of user actions, such as creating or deleting redirects, and administrative actions.

### Error Logs

- Capture and review error logs to quickly address issues in the application.

### Performance Monitoring

- Monitor application performance, including response times and resource usage, to identify and resolve bottlenecks.

## Maintenance Tools

Provide tools or scripts for routine maintenance tasks, such as database backups, data cleanup, and performance tuning.

### Database Backups

- Implement automated backups of the PostgreSQL database to ensure data integrity and recovery.

### Data Cleanup

- Create tools for cleaning up old or unused data, such as soft-deleted redirects that are no longer needed.

### Updating Application Components

- Outline procedures for safely updating the application, including backend dependencies, the React frontend, and database schema migrations.

## Security

Ensure the administration features are securely accessible only to authorized users. Implement additional security measures such as two-factor authentication (2FA) for admin logins.

---


# other topics

Your guide covers a broad and solid foundation for setting up a full-stack application with Express, PostgreSQL, React, Knex.js, TypeScript, and implementing RBAC, including an administration section. However, here are a few additional considerations and components you might want to include to ensure a comprehensive setup:

### 1. **Testing Strategy**

- **Unit Tests**: For backend logic, models, and utility functions. Consider using Jest or Mocha with Chai for assertions.
- **Integration Tests**: To test the interactions between different parts of the application, such as API endpoints interacting with the database.
- **End-to-End Tests**: For frontend and user flow testing. Tools like Cypress or Selenium can automate browser-based tests to ensure the UI works as expected with the backend.

### 2. **API Documentation**

- Documenting your API endpoints is crucial for both internal development and if you plan to expose your API to third-party developers. Tools like Swagger (OpenAPI) can help document your API routes, parameters, and expected responses, making it easier for developers to understand and use your API.

### 3. **Continuous Integration/Continuous Deployment (CI/CD)**

- Setting up CI/CD pipelines can automate your testing and deployment processes, ensuring that every commit or merge into your main branch is automatically tested and deployed to your staging or production environments. GitHub Actions, GitLab CI/CD, and Jenkins are popular tools for setting up these pipelines.

### 4. **Environment Configuration**

- Managing different configurations for development, testing, staging, and production environments. This includes database connections, API keys, and other environment-specific settings. Tools like dotenv can help manage environment variables in a secure and efficient way.

### 5. **Security Measures**

- Beyond RBAC, ensure your application follows security best practices:
    - **HTTPS**: Use HTTPS for all connections to ensure data is encrypted in transit.
    - **Input Validation and Sanitization**: To protect against SQL injection, XSS, and other injection attacks.
    - **Dependency Security**: Regularly update dependencies to mitigate vulnerabilities. Tools like Snyk or npm audit can help identify and fix security issues.
    - **Data Encryption**: Encrypt sensitive data in your database, such as passwords and personal information.

### 6. **Error Handling and Logging**

- Implement comprehensive error handling and logging mechanisms to capture and respond to unexpected conditions or errors. This can aid in debugging and maintaining the application over time.

### 7. **User Feedback and Support System**

- Incorporating a system for users to report issues, request features, or get help can improve user satisfaction and engagement. This could be as simple as a feedback form or as complex as an integrated support ticket system.

### 8. **Performance Optimization**

- Consider strategies for optimizing the performance of both the backend and frontend. This includes database indexing, query optimization, code splitting in React, and efficient state management.

### 9. **Accessibility**

- Ensure your application is accessible to users with disabilities. This includes semantic HTML in the frontend, keyboard navigation, screen reader compatibility, and adherence to WCAG guidelines.

### 10. **Internationalization and Localization**

- If your application targets users in multiple regions or languages, consider implementing internationalization (i18n) and localization (l10n) to provide localized experiences.

Your comprehensive guide covers the setup and development of a full-stack application, including entity relationships, RBAC implementation, and administration features. Here are additional aspects to consider for a more complete guide:

### 11. **Frontend and Backend Interaction**

- **API Design and Management**: Detail how the frontend communicates with the backend, including RESTful API conventions, GraphQL usage, or other protocols. Mention how to handle API versioning and endpoint security.
- **State Management**: Discuss strategies for managing state in your React application, especially in relation to user roles and permissions. Consider libraries like Redux or the Context API for global state management.

### 12. **User Authentication and Session Management**

- **Authentication Flow**: Describe the authentication mechanism (e.g., JWT, OAuth2) and how tokens are managed and stored securely in the frontend.
- **Session Management**: Explain how sessions are maintained, including token refresh strategies and session expiration handling.

### 13. **Deployment and Infrastructure**

- **Docker and Containerization**: If applicable, include instructions for containerizing your application with Docker for development and production environments.
- **Cloud Services and Infrastructure as Code (IaC)**: Discuss deployment options on cloud platforms (AWS, Azure, Google Cloud) and the use of IaC tools like Terraform or CloudFormation for provisioning resources.

### 14. **Monitoring, Alerting, and Analytics**

- **Application Monitoring**: Introduce tools and practices for monitoring application health, performance metrics, and error tracking (e.g., Prometheus, Grafana, Sentry).
- **Alerting**: Set up alerting mechanisms for critical issues and performance degradation.
- **Analytics**: Implement analytics to gather insights on user behavior and application usage (e.g., Google Analytics, Mixpanel).

### 15. **Data Privacy and Compliance**

- **Compliance Standards**: Address any relevant legal and compliance standards your application must adhere to, such as GDPR, HIPAA, or CCPA.
- **Data Handling Practices**: Outline best practices for handling sensitive user data, including data minimization, encryption, and secure data storage and transmission.

### 16. **Backup and Disaster Recovery**

- **Backup Strategies**: Detail the strategies for backing up application data and codebases.
- **Disaster Recovery Plan**: Develop a disaster recovery plan to ensure quick restoration of services in case of significant outages or data loss.

### 17. **Scalability and High Availability**

- **Scaling Strategies**: Discuss how your application can be scaled horizontally or vertically to handle increased load.
- **High Availability**: Implement high availability practices to minimize downtime, including load balancing, database replication, and failover mechanisms.

### 18. **Development Workflow and Best Practices**

- **Code Review and Quality Assurance**: Establish a workflow for code reviews, quality assurance (QA), and coding standards to maintain code quality and consistency.
- **Feature Flagging**: Use feature flags to enable toggling features on and off without deploying new code, facilitating A/B testing and gradual feature rollouts.

### 19. **Community and Contribution Guidelines**

- If your project is open source or you're encouraging contributions, include guidelines for contributors, such as how to submit issues, pull requests, and coding standards to follow.

### 20. **Versioning and Change Management**

- **Application Versioning**: Adopt semantic versioning for your application releases to communicate changes and updates clearly.
- **Change Management**: Implement a change management process to handle updates and migrations smoothly, ensuring minimal disruption to users.
