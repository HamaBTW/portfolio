# T-Backup: self-hosted multi-source backup platform

> Built by Mohamed Abidi for Tache-Lik. Source: founder's description (Nov 2026).
> Source code was not available locally when this profile was built. Tache-Lik docs elsewhere describe it as
> "a self-hosted Docker platform for MinIO object backups". Not to be confused with *Tache-Lik Content Backup*, a separate Electron app.

## One-line pitch
A self-hosted backup platform I built out of frustration, because no existing tool gave the flexibility Tache-Lik needed. It backs up **any number of sources to any number of destinations** on a schedule, with retention rules. **It has been in production for months and runs reliably.**

## How it works
- **Sources (1…n):** SQL databases (MySQL/MariaDB), **PostgreSQL**, **MongoDB**, **MinIO**, **S3**, **Qdrant** (vector DB), and more
- **Destinations (1…n):** fan out each backup to one or many targets: **MinIO**, **S3**, **Google Drive**
- **Backup jobs:** scheduled per source (for example, "back this up every hour")
- **Cleanup / retention jobs:** for example, "keep the last 10" or "keep only the last hour"
- Self-hosted and containerized (Docker)

## Why it exists
Existing solutions didn't offer the flexibility needed: mixing database, object-storage and vector-DB sources with several destinations and custom retention in one place.

## Stack (confirmed)
Docker, MinIO, S3, Google Drive, MySQL, PostgreSQL, MongoDB, Qdrant.
*Implementation language and framework not confirmed. Add them before using this in a CV.*

## CV bullets (ready to tailor)
- Built T-Backup, a self-hosted backup platform that schedules backups from N sources (MySQL, PostgreSQL, MongoDB, MinIO, S3, Qdrant) to N destinations (MinIO, S3, Google Drive) with configurable retention. It has been in production for months.
