#!/usr/bin/env node

import path from 'path'
import fs from 'fs'
import { question } from 'zx'
import chalk from 'chalk'
import { adjustColor, desaturateColor, getContrastColor } from './helpers/colors.js'

async function main() {
  console.log(`🌴 ${chalk.green('Welcome to VSCode Settings Builder')} 🌴`)

  const windowTitle = (await question(`${chalk.gray('Project title : ')}`)).trim() || 'Default Title'
  const mainColor =
    (await question(`${chalk.gray('Main HEX color (with or without #, e.g. 656ad6): ')}`)).trim() || '727272'

  const mainColorHex = mainColor.startsWith('#') ? mainColor : `#${mainColor}`

  const useNextJs = (await question(`${chalk.gray('Do you use Next.Js ? (y/n) ')}`)).trim() || 'n'

  // 🔹 Generate relative colors
  const activeBackground = adjustColor(mainColorHex, -30)
  const inactiveBackground = desaturateColor(activeBackground, 0.7)
  const activeForeground = getContrastColor(mainColorHex)
  const inactiveForeground = `${activeForeground}80` // Adds 50% opacity

  const settings = {
    '-- EDITOR --': '',
    'window.title': windowTitle,
    'workbench.colorCustomizations': {
      'titleBar.activeBackground': activeBackground,
      'titleBar.activeForeground': activeForeground,
      'titleBar.inactiveForeground': inactiveForeground,
      'titleBar.inactiveBackground': inactiveBackground,
      'editor.findMatchBackground': mainColorHex,
    },
    ...(useNextJs === 'y' && {
      '-- NEXT.JS --': '',
      'workbench.editor.customLabels.patterns': {
        '**/app/**/page.{js,ts,tsx}': 'Page - ${dirname}',
        '**/app/**/layout.{js,ts,tsx}': 'Layout - ${dirname}',
        '**/app/**/route.{js,ts,tsx}': 'Route - ${dirname}',
      },
    }),
  }

  const vscodeDir = path.join(process.cwd(), '.vscode')
  if (!fs.existsSync(vscodeDir)) fs.mkdirSync(vscodeDir)

  fs.writeFileSync(path.join(vscodeDir, 'settings.json'), JSON.stringify(settings, null, 2))

  console.log(`✅ .vscode/settings.json created successfully in ${process.cwd()}`)
}

main().catch((err) => console.error('❌ Error:', err))
