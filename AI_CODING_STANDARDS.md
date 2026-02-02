# AI Coding Standards & Architectural Guidelines / AI 開發規範指南

This document outlines the architectural standards, directory structure, and development practices for this project.
本文件概述了本專案的架構標準、目錄結構與開發規範。

---

## 🇺🇸 English Version

### 1. Core Architecture: Feature-based

We strictly follow a **Feature-based Architecture**. Code is organized by **business domain (feature)** rather than by technical layer.

#### Rule of Thumb
- If a component/hook/type is **only used by one feature** -> It belongs in `src/features/<feature-name>/`.
- If a component/hook/type is **truly generic and reused across multiple features** -> It belongs in `src/components/`, `src/hooks/`, or `src/utils/`.

### 2. Directory Structure

The `src` directory must follow this structure:

```text
src/
├── assets/             # Static assets (global images, fonts)
├── components/         # GLOBAL shared components (UI Kit)
│   ├── Button/         # Complex components can have their own folder
│   ├── Input/
│   └── Modal/
├── features/           # ★ CORE: Feature-based modules
│   ├── auth/           # Example Feature: Authentication
│   │   ├── api/        # API calls specific to Auth (login, logout)
│   │   ├── components/ # Components only used in Auth (LoginForm)
│   │   ├── hooks/      # Hooks specific to Auth
│   │   ├── routes/     # Routes definition for Auth
│   │   └── types/      # TypeScript interfaces for Auth
│   └── users/          # Example Feature: User Management
│       ├── api/
│       ├── components/
│       └── ...
├── hooks/              # GLOBAL shared hooks (useOnClickOutside, useMediaQuery)
├── layouts/            # Page Layouts (MainLayout, AuthLayout)
├── lib/                # Third-party library configurations (axios, queryClient)
├── pages/              # Page entries (Route targets)
│   ├── dashboard/      # Dashboard page
│   └── auth/           # Auth pages
├── routes/             # Global router configuration
├── stores/             # Global state stores (Zustand)
├── types/              # Global shared types (APIResponse, User)
└── utils/              # Global utility functions (dateFormatter, validators)
```

### 3. Technology Stack & Patterns

#### 3.1 State Management
- **Server State (API Data)**: MUST use **TanStack Query (React Query)**.
  - Do NOT store API data in a global store (Redux/Zustand) manually.
  - Create custom hooks in `features/<feature>/api/` (e.g., `useUsers`, `useUpdateUser`).
- **Client State (UI State)**: Use **Zustand**.
  - For complex global UI state (e.g., Sidebar toggle, User Session, Theme).
  - Defined in `src/stores/`.
- **Local State**: Use `useState` or `useReducer` for component-local logic.

#### 3.2 API & Networking
- Use **Native Fetch API** as the HTTP client.
- A wrapper utility (e.g., `src/lib/api-client.ts`) should be used to handle:
  - Base URL configuration.
  - Automatic JSON parsing/stringifying.
  - JWT Token injection (Authorization header).
  - Error handling standardization.
- All API request functions should be strictly typed.

#### 3.3 Routing
- Use **React Router DOM (v6)**.
- Adopt the **Layout Pattern**:
  - `src/routes/index.tsx` defines the main router.
  - Wrap protected routes with a `<ProtectedRoute>` component that checks authentication.

#### 3.4 Styling
- **Methodology**: Vanilla CSS / CSS Variables.
- **Organization**:
  - Global styles: `src/index.css`.
  - Component styles: Use CSS Modules (`*.module.css`) or scoped CSS to avoid conflicts.
- **Design System**: Use defined CSS variables for colors, spacing, and typography to ensure consistency.

### 4. Coding Conventions

- **File Naming**:
  - Components: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
  - Hooks: `camelCase.ts` (e.g., `useAuth.ts`)
  - Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- **Component Structure**:
  ```tsx
  // Imports
  // Types/Interfaces
  // Component Definition
  export const ComponentName = ({ prop }: Props) => {
    // Hooks
    // Derived State
    // Return JSX
  };
  ```
- **Exports**: Use Named Exports (`export const ...`) over Default Exports to ensure better refactoring support.

---

## 🇹🇼 繁體中文版

### 1. 核心架構：功能導向 (Feature-based)

我們嚴格遵循 **Feature-based Architecture (功能導向架構)**。程式碼應依照「業務功能領域」來分類，而不是依照「技術層級」。

#### 判斷準則
- 如果一個組件/Hook/型別 **只在一個功能中使用** -> 它屬於 `src/features/<feature-name>/`。
- 如果一個組件/Hook/型別 **是真正通用的，且被多個功能共用** -> 它屬於 `src/components/`, `src/hooks/`, 或 `src/utils/`。

### 2. 目錄結構

`src` 目錄必須遵循以下結構：

```text
src/
├── assets/             # 靜態資源 (全局圖片、字型)
├── components/         # 全局共用組件 (UI Kit)
│   ├── Button/         # 複雜組件可擁有獨立資料夾
│   ├── Input/
│   └── Modal/
├── features/           # ★ 核心：功能模組
│   ├── auth/           # 範例功能：身份驗證 (Authentication)
│   │   ├── api/        # Auth 專屬的 API 請求 (login, logout)
│   │   ├── components/ # Auth 專屬的組件 (LoginForm)
│   │   ├── hooks/      # Auth 專屬的 Hooks
│   │   ├── routes/     # Auth 相關的路由定義
│   │   └── types/      # Auth 相關的 TypeScript 定義
│   └── users/          # 範例功能：使用者管理 (User Management)
│       ├── api/
│       ├── components/
│       └── ...
├── hooks/              # 全局共用 Hooks (useOnClickOutside, useMediaQuery)
├── layouts/            # 頁面佈局 (MainLayout, AuthLayout)
├── lib/                # 第三方套件設定 (axios, queryClient)
├── pages/              # 頁面入口 (路由的目標組件)
│   ├── dashboard/      # 儀表板頁面
│   └── auth/           # 登入註冊頁面
├── routes/             # 全局路由設定
├── stores/             # 全局狀態管理 (Zustand)
├── types/              # 全局共用型別 (APIResponse, User)
└── utils/              # 全局工具函式 (dateFormatter, validators)
```

### 3. 技術棧與模式

#### 3.1 狀態管理 (State Management)
- **伺服器狀態 (Server State / API Data)**：必須使用 **TanStack Query (React Query)**。
  - **不要** 手動將 API 資料存入全局 Store (Redux/Zustand)。
  - 在 `features/<feature>/api/` 中建立 Custom Hooks (例如 `useUsers`, `useUpdateUser`)。
- **客戶端狀態 (Client State / UI State)**：使用 **Zustand**。
  - 用於複雜的全局 UI 狀態 (例如：側邊欄開關、使用者 Session、主題切換)。
  - 定義於 `src/stores/`。
- **區域狀態 (Local State)**：使用 `useState` 或 `useReducer` 處理組件內部的邏輯。

#### 3.2 API 與網路請求
- 使用 **原生 Fetch API** 作為 HTTP 客戶端。
- 應建立一個封裝工具 (例如 `src/lib/api-client.ts`) 來處理：
  - Base URL 設定。
  - 自動 JSON 解析與字串化。
  - JWT Token 注入 (Authorization header)。
  - 錯誤處理標準化。
- 所有 API 請求函式都必須有嚴格的型別定義。

#### 3.3 路由 (Routing)
- 使用 **React Router DOM (v6)**。
- 採用 **Layout Pattern (佈局模式)**：
  - `src/routes/index.tsx` 定義主路由結構。
  - 使用 `<ProtectedRoute>` 組件包裹需要權限的路由，用以檢查登入狀態。

#### 3.4 樣式 (Styling)
- **方法論**: Vanilla CSS / CSS Variables。
- **組織方式**:
  - 全局樣式: `src/index.css`。
  - 組件樣式: 使用 CSS Modules (`*.module.css`) 或 scoped CSS 以避免衝突。
- **設計系統**: 使用定義好的 CSS 變數來管理顏色、間距和排版，確保一致性。

### 4. 開發規範 (Coding Conventions)

- **檔案命名**:
  - 組件: `PascalCase.tsx` (例如 `UserProfile.tsx`)
  - Hooks: `camelCase.ts` (例如 `useAuth.ts`)
  - 工具函式: `camelCase.ts` (例如 `formatDate.ts`)
- **組件結構**:
  ```tsx
  // Imports
  // Types/Interfaces (型別定義)
  // Component Definition (組件定義)
  export const ComponentName = ({ prop }: Props) => {
    // Hooks
    // Derived State (衍生狀態)
    // Return JSX
  };
  ```
- **導出 (Exports)**：優先使用具名導出 (`export const ...`)，避免使用預設導出 (Default Exports)，以利於重構。
