# T-Hub: Tache-Lik's management app (Flutter)

> Built by Mohamed Abidi (643 of 730 commits). Source: `D:\projects\tache-lik\t_hub` (package `tache_lik_studio`, v0.8.3).
> Git history: Jul 2025 → Nov 2026.

## One-line pitch
The full internal app that runs Tache-Lik: admins, staff and teachers manage users, courses, videos, payments, invoices, contracts and the AI pipeline from one cross-platform Flutter app (Windows, macOS, Android).

## Scale
- **455 Dart files, ~154k lines**, **33 feature modules**
- 730 commits (643 by Mohamed); small team with 1–2 other contributors

## Features (by module)
- **Role-based access:** Admin, Teacher, Store Staff. Permission-based UI, access guards, session management
- **Dashboard and analytics/statistics:** users, revenue, sales, course performance
- **Users and teachers:** accounts, roles, ban/unban, teacher applications and approvals, sessions
- **Courses and videos:** course CRUD, approval workflow for teacher content, video management, academic years, classes and categories
- **Payments:** cash payments, gift cards (create/redeem), invoices, user credits, transaction history
- **Contracts, ambassadors, founders, requests, contacts, notifications** (real time over Socket.io)
- **AI:** **T-Agent chat** (pipeline editor agent with approval prompts), the **Video Pipeline** console (start/track the multi-agent course pipeline with live queue status), and AI services
- **Design Studio:** task board, workspaces, version submission and review flow for the design team
- **File manager**, **app releases** and **in-app auto-update**

## Engineering
- **Clean architecture**, feature-first (presentation / application / domain / infrastructure)
- **BLoC** state management, **get_it** dependency injection, **dio** HTTP, **dartz** Either error handling, equatable
- Real time with **socket_io_client**. JWT handling, crypto/cryptography
- i18n (`flutter_localizations`, intl), light/dark themes, Nunito via Google Fonts, `flutter_dotenv` environments
- Firebase integration
- **Release pipeline (Nov 2026):** from the phone, *T-Hub → App Releases → New build*. The backend triggers **GitHub Actions** (`workflow_dispatch`) to build signed **Android, Windows (Inno Setup installer) and macOS** artifacts and stamps the version into `pubspec.yaml` and the Inno script. A backend watcher pulls the artifacts, checks provenance and version, hashes them and stores them in **MinIO** as drafts. An admin publishes, and users get the update. Versions can never go backwards (build number = MAJOR·10⁶ + MINOR·10³ + PATCH).

## Stack
Flutter, Dart, BLoC, get_it, dio, Socket.io, Firebase, GitHub Actions, Inno Setup, MinIO, Node.js/Express backend (TypeScript, MySQL).

## CV bullets (ready to tailor)
- Built T-Hub, Tache-Lik's cross-platform Flutter admin app (**~154k lines, 33 feature modules**) covering users, courses, payments, invoices, contracts and AI pipeline control for admins, staff and teachers.
- Applied clean architecture with BLoC, get_it and dio, with real-time updates over Socket.io and role-based access control.
- Designed a phone-triggered release pipeline: GitHub Actions builds signed Android/Windows/macOS artifacts, and the backend verifies them, stores them in MinIO and ships auto-updates with a no-downgrade version policy.
