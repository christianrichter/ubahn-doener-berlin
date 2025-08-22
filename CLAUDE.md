# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple static website called "Berliner U-Bahn Döner Guide" - a guide for finding döner kebab near Berlin U-Bahn stations. It's built with HTML, JavaScript, Tailwind CSS, and DaisyUI components.

## Development Commands

- **Build CSS**: `npm run build:css` - Compiles Tailwind CSS from app.css to public/main.css
- **Install dependencies**: `npm install`

## Architecture

- **Frontend**: Static HTML with JavaScript, Tailwind CSS and DaisyUI
- **CSS Framework**: Tailwind CSS v4 with DaisyUI plugin for UI components
- **Build System**: Tailwind CLI for CSS compilation
- **Structure**:
  - `public/index.html` - Main HTML file
  - `public/tooltip.js` - JavaScript for interactive features
  - `app.css` - Tailwind CSS input file with DaisyUI plugin
  - `public/main.css` - Generated CSS output (not committed)
  - `public/pricing.json` - Pricing data for döner shops
  - `public/u1_elements.json` - U-Bahn line data
  - `public/network.svg` - U-Bahn network map
  - `public/images/` - Image assets

## Key Files

- `package.json` - Dependencies and build scripts
- `app.css` - Tailwind CSS configuration with DaisyUI plugin and custom styles
- `public/index.html` - Main page content with hero sections
- `public/tooltip.js` - JavaScript for interactive tooltips and features
- `public/pricing.json` - JSON data containing döner shop pricing information
- `public/u1_elements.json` - JSON data for U-Bahn line elements and stations
- `public/network.svg` - SVG map of the Berlin U-Bahn network
- `public/main.css` - Generated CSS (created by build process)

## Development Workflow

1. Run `npm install` to install dependencies
2. Run `npm run build:css` to compile CSS after making changes
3. Edit `public/index.html` for content changes
4. Edit `public/tooltip.js` for interactive functionality
5. Edit `app.css` for styling changes
6. Update JSON data files for döner shop information

The project uses Tailwind CSS v4's new source directive syntax to scan HTML files for utility classes.
- use mcp context7 server to lookup documentation and examples, use mcp serena server when writing code as it's a language server that understands javascript