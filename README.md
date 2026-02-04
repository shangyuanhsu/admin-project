# Admin Portal Project

This project is a modern web application built with **React** and **TypeScript**, using **Vite** for fast development and build tooling. This document outlines the technology stack, setup instructions, and key configuration details.

---

## GO
### 📜 Introduction
This project is a modern web application built with **React** and **TypeScript**, using **Vite** for fast development and build tooling. This document outlines the technology stack, setup instructions, and key configuration details.
> **Note**: This project is currently under construction in collaboration with AI.

### 🚀 Technology Stack

- **Runtime**: Node.js (Latest stable version recommended, e.g., v18 or v20)
- **Framework**: React v19.2.0
- **Language**: TypeScript ~5.9.3
- **Build Tool**: Vite v7.2.4
- **Routing**: React Router DOM v6.22.0
- **State Management**: Redux Toolkit (^2.11.2) & React Redux (^9.2.0)
- **Styling Utility**: clsx (for conditional classes)
- **Linting**: ESLint (v9)

### 🛠️ Setup & Installation

Follow these steps to set up the project locally:

1.  **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd admin-project
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    - **IMPORTANT**: Copy the example environment file to create your local `.env` file.
    - Check `.env.example` for the required keys.
    ```bash
    cp .env.example .env
    ```
    - Configure the values in `.env` as needed (e.g., API base URL).

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    - The server typically starts at `http://localhost:5173`.

### 📦 Key Dependencies & Tools
- **Redux Toolkit**: Used for efficient global state management.
- **clsx**: A tiny utility for constructing `className` strings conditionally.
- **Standard Tooling**: The project uses standard Vite + TypeScript setup. No heavy third-party UI libraries (like MUI or AntD) are pre-installed; we build custom components (Tabs, Table, Accordion, etc.) in `src/components/`.

> **Note**: This project is currently under construction in collaboration with AI.

---

## GO

### 📜 專案簡介 (Introduction)

本專案是一個基於 **React** 與 **TypeScript** 的現代化 Web 應用程式，使用 **Vite** 進行快速開發與建置。本文件概述了技術棧、安裝教學以及關鍵設定細節。

> **注意**: 本專案目前正與 AI 協作建置中。

### 🚀 技術棧 (Technology Stack)
- **執行環境**: Node.js (建議使用最新穩定版，如 v18 或 v20)
- **框架**: React v19.2.0
- **語言**: TypeScript ~5.9.3
- **建置工具**: Vite v7.2.4
- **路由**: React Router DOM v6.22.0
- **狀態管理**: Redux Toolkit (^2.11.2) 與 React Redux (^9.2.0)
- **樣式工具**: clsx (用於條件式類別名稱)
- **程式碼檢查**: ESLint (v9)

### 🛠️ 專案建置與啟動 (Setup)

請依照以下步驟在本地端啟動專案：

1.  **複製專案 (Clone)**:
    ```bash
    git clone <repository_url>
    cd admin-project
    ```

2.  **安裝依賴 (Install)**:
    ```bash
    npm install
    ```

3.  **環境變數 (.env)**:
    - **重要**: 請務必複製範例檔案來建立您本地端的 `.env` 檔案。
    - 參考 `.env.example` 檔案查看需要哪些 Key。
    ```bash
    cp .env.example .env
    ```
    - 根據需求設定 `.env` 中的值 (例如 API Base URL)。

4.  **啟動開發伺服器**:
    ```bash
    npm run dev
    ```
    - 預設通常會運行在 `http://localhost:5173`。

### 📦 關鍵套件與工具
- **Redux Toolkit**: 用於高效的全域狀態管理。
- **clsx**: 一個輕量級的工具，用於動態組裝 `className` 字串。
- **標準化工具**: 本專案使用標準的 Vite + TypeScript 設定。目前未預裝大型 UI Library (如 MUI 或 AntD)，我們主要在 `src/components/` 中自行建置客製化組件 (如 Table, Tabs, Accordion 等)。
