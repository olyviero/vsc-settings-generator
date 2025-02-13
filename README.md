# VSCode Settings Builder

## 📝 Description

Simple CLI tool to generate a `.vscode/settings.json` file with custom project title and color customizations for the Visual Studio Code interface. It allows you to dynamically set the title of your workspace and customize the colors of the title bar based on a primary color input.

The script adjusts brightness and desaturation of the provided main color to generate additional shades for `activeBackground` and `inactiveBackground`.

---

## 🚀 Features

- Interactive CLI input for project title and main HEX color.
- Generates `.vscode/settings.json` with custom colors:
  - `titleBar.activeBackground` → Darker version of the main color.
  - `titleBar.inactiveBackground` → Even darker and desaturated version.
  - `titleBar.inactiveForeground` → Main color.
  - `titleBar.activeForeground` → Contrasted color (white or black).
  - `editor.findMatchBackground` → Main color.
- Automatic HEX color validation and formatting (supports shorthand like `#FFF`).

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/olyviero/vsc-settings-generator.git
cd vscode-settings-builder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Link the CLI globally

```bash
npm link
```

This will create a global command `vscset` (or any other name you configured in `package.json` `bin` field).

---

## 📦 Usage

Navigate to any project folder where you want to generate the `.vscode/settings.json` file:

```bash
cd /path/to/your/project
vscset
```

The tool will prompt you for:

1. **Project title:** This will appear in the VSCode window title.
2. **Main HEX color:** Used as a base for title bar customizations (e.g., `#656ad6` or `656ad6` or `f00`).

Once input is provided, the `.vscode/settings.json` file is created with the customized colors.

---

## 🖥️ Example Output

```json
{
  "window.title": "My Project",
  "workbench.colorCustomizations": {
    "titleBar.activeBackground": "#4c3fa2",
    "titleBar.activeForeground": "#ffffff",
    "titleBar.inactiveForeground": "#656ad6",
    "titleBar.inactiveBackground": "#3a316f",
    "editor.findMatchBackground": "#656ad6"
  }
}
```

---

## 🔄 Updating

If you modify the script, simply run:

```bash
npm link
```

again to update the globally linked version.

---

## 🧑‍💻 Development

This project relies on:

- `zx` → Simplifying shell scripting with JavaScript.
- `chalk` → Colored CLI outputs.

---

## 📝 License

This project is licensed under the MIT License.
