# Promptile
<img src="./assets/promptile-full-icon-std.svg" />
<img src="./assets/promptile-demo.gif" />
<br />

## About
Promptile is a cross-platform GUI application that allows you to save and reuse prompts as templates for inputting into LLMs.
- Mustache-based template functionality
- Type setting and type-based template application features
- Cross-platform support for Windows/Linux/Mac (Experimental)

## Install
### Prerequisites
Builds are performed for each platform. You need to have a Golang development environment and the `wails` command pre-installed for building. Please install the latest version of `wails` following the [Wails installation guide](https://wails.io/docs/gettingstarted/installation).
### Install Promptile
Run the following command in the root of the project.
```sh
wails build
```
After building, the binary will be generated in the `./build/bin` directory.

If you want to build for a specific platform, please set the platform.
```sh
wails build --platform windows
```
