# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- A button to change the data folder, making it possible to change folder during the app runtime

## [0.1.2] - 2026-06-02

### Fixed

- The GUI's path to the API was still configured for local testing

## [0.1.1] - 2026-06-02

### Changed

- Overall better error handling, more details about what went wrong.

### Added

- The API now starts in the app rather than before the app, you need to quit if the API fails.
- A new notification system is here, using toasts to show errors rather than dedicated fields. This will also be used for warnings, info and notifications.

## [0.1.0] - 2026-05-28

- First documented version
