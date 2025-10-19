# 🧾 Debida Diligencia de Proveedores - Frontend (React + Material UI)

Single Page Application (SPA) that allows users to manage a supplier inventory and perform **risk screening (cruce con listas de alto riesgo)** through integration with the backend API.  
This project is part of the "Ejercicio 2: Desarrollo de aplicación web para Debida Diligencia de Proveedores y Cruce con Listas de Alto Riesgo".

**🔗 Repository:** [https://github.com/JanielFranz/diligence-app](https://github.com/JanielFranz/diligence-app)

---

## 🚀 Overview

This frontend application enables:
- **User Authentication:** Login system with session management.
- **Supplier Management (CRUD):** Create, view, edit, and delete supplier information.
- **Risk Screening:** Select one or more external sources and automatically perform screening requests (API calls) to identify potential risk associations.
- **User Experience:** Built as a modern, responsive SPA using **React 19** and **Material UI 6**, ensuring fluid interaction without full page reloads.

The frontend consumes the backend REST API built with **.NET 8 (ASP.NET Core)** and **SQL Server** for data persistence.

---

## 🧠 Features

### Authentication
- Login form with email/username and password fields using Material UI components.
- Session management with token storage.
- Protected routes - users must be authenticated to access supplier management.
- Automatic redirect to login page for unauthenticated users.
- Logout functionality with session cleanup.

### Supplier Management
- CRUD operations (Create, Read, Update, Delete).
- Form validations (email, numeric formats, required fields, etc.).
- Display suppliers in a paginated and sortable Material UI DataGrid.
- Columns:
    - Razón Social
    - Nombre Comercial
    - Identificación Tributaria
    - Teléfono
    - Correo Electrónico
    - Sitio Web
    - Dirección
    - País
    - Facturación Anual (USD)
    - Fecha de Última Edición

### Screening (Cruce con Listas de Alto Riesgo)
- Option available per supplier in the table.
- Opens a **Material UI Modal** with:
    - Checkbox selection for sources (OFAC, WolrdBank).
    - Automatic API call once the user selects the sources.
- Displays results in a dynamic table

### User Experience
- SPA routing handled by React Router.
- Responsive design (Material UI).
- Toast or snackbar notifications for success/error.
- Loading spinners during API calls.

---

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Language** | TypeScript |
| **Framework** | React 19 |
| **UI Library** | Material UI (MUI v6) |
| **State Management** | React Query / Context API |
| **Routing** | React Router DOM v6 |
| **HTTP Client** | Axios |
| **Build Tool** | Vite |
| **Linting** | ESLint + Prettier |

---

## 🧱 Folder Structure

```
frontend/
├── public/
│ └── index.html
├── src/
│ ├── api/
│ │ ├── authApi.ts
│ │ ├── suppliersApi.ts
│ │ └── screeningApi.ts
│ ├── components/
│ │ ├── auth/
│ │ │ ├── LoginForm.tsx
│ │ │ └── ProtectedRoute.tsx
│ │ ├── SupplierForm.tsx
│ │ ├── SupplierTable.tsx
│ │ ├── ScreeningModal.tsx
│ │ └── Layout/
│ ├── pages/
│ │ ├── LoginPage.tsx
│ │ ├── SuppliersPage.tsx
│ │ └── NotFound.tsx
│ ├── hooks/
│ │ └── useAuth.ts
│ ├── utils/
│ ├── context/
│ │ └── AuthContext.tsx
│ ├── App.tsx
│ ├── main.tsx
│ └── theme.ts
├── .env
├── package.json
└── vite.config.ts
```


---

## 🔐 Authentication Flow

1. **Initial Access:** Users are redirected to `/login` if not authenticated.
2. **Login Process:** 
   - Simple Material UI form with email/username and password fields
   - Form validation using Material UI form components
   - API call to backend authentication endpoint
   - Token storage in localStorage/sessionStorage
3. **Protected Navigation:** After successful login, users are redirected to the main supplier management screen (`/suppliers`).
4. **Session Management:** Authentication state managed through React Context API.
5. **Logout:** Clear stored tokens and redirect back to login page.

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```bash
VITE_API_BASE_URL=https://localhost:44312/api
```

## ️🧩 Installation and Setup
1. **Install Dependencies and run:**
   ```bash
   npm install
   npm run dev

    ```