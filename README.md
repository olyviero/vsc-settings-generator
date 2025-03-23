# VSCode Settings Builder

## 📝 Description

Simple CLI tool to generate a `.vscode/settings.json` file with custom project title and color customizations for the Visual Studio Code interface.

---

## 🚀 Features

- Interactive CLI input.
- Automatic HEX color validation and formatting (supports shorthand like `#FFF`).
- Next.js convention files renaming

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

1. **Project title**
2. **Main HEX color**
3. **Using Next.js**

---

## 🖥️ Example Output

```json
{
  "-- EDITOR --": "",
  "window.title": "VSCS",
  "workbench.colorCustomizations": {
    "titleBar.activeBackground": "#365f69",
    "titleBar.activeForeground": "#FFFFFF",
    "titleBar.inactiveForeground": "#FFFFFF80",
    "titleBar.inactiveBackground": "#3f5c63",
    "editor.findMatchBackground": "#4e8996"
  },
  "-- NEXT.JS --": "",
  "workbench.editor.customLabels.patterns": {
    "**/app/**/page.{js,ts,tsx}": "Page - ${dirname}",
    "**/app/**/layout.{js,ts,tsx}": "Layout - ${dirname}",
    "**/app/**/route.{js,ts,tsx}": "Route - ${dirname}"
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

## 📝 TODO

- Add special syntax highlights with styles
- Add 'see as' .exts for some useful cases
