# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Light/dark mode is now available
- You can now manage the environment your project is using to run
    - You can create a virtual environment for your project via the application, you have to specify a base python executable for it, but you can use the default interpreters on your computer that the application found.
    - You can delete said virtual environment
    - You can list and see all the packages in your environment
    - You can install, update and uninstall packages
    - You can install a requirements file
    - You can see which package can be updated (this takes into consideration potential conflicts with other packages)
    - At any point, you can just unlink the environment and choose another python executable, however, if the project already has a venv, you'll have to either reuse it or delete it (via the application or by yourself).
- On long operations, a loading screen will appear so you know when the application is processing
- You can now specify advanced options to customize what the application does with your project.

### Changed

- The project creation form has been moved to a modal (floating window)
- The run creation form has been moved to a modal

## [0.1.3] - 2026-06-17

### Changed

- The project list has been redesigned and the version of the GUI is available at the top right of the screen when opening the project list
- The serde configuration has been redesigned to offer a cleaner and better experience
- The agent controller configuration has been redesigned to offer a cleaner and better experience
- The different configurations have been moved to their separate pages. This makes the active content less loaded.
- The project header now only appears in the project main page along with a new description, the run page only display run elements.

### Added

- A button to change the data folder, making it possible to change folder during the app runtime
- There is now a home page!
- Some description for the project list
- A modal that explains what a serde is and what it does.

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
