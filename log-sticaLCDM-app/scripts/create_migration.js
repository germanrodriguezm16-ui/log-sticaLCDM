#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const migrationsDir = path.join(__dirname, '..', 'migrations');
if (!fs.existsSync(migrationsDir)) fs.mkdirSync(migrationsDir, { recursive: true });

const name = process.argv.slice(2).join('_') || 'migration';
const files = fs.readdirSync(migrationsDir).filter(f => f.match(/^\d+_/));
const max = files.map(f => parseInt(f.split('_')[0], 10)).filter(n => !isNaN(n));
const next = (max.length ? Math.max(...max) : 0) + 1;
const prefix = String(next).padStart(3, '0');
const filename = `${prefix}_${name}.sql`;
const filepath = path.join(migrationsDir, filename);

const template = `-- ${filename}\n-- Describe aquí el propósito de la migración\n\nBEGIN;\n\n-- Escribe tus sentencias SQL abajo\n\nCOMMIT;\n`;

fs.writeFileSync(filepath, template);
console.log(`Created migration: migrations/${filename}`);
