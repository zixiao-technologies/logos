const fs = require('fs')
const path = require('path')

const repoRoot = path.resolve(__dirname, '..')
const packageJsonPath = path.join(repoRoot, 'package.json')
const outputPath = path.join(repoRoot, 'packaging', 'windows', 'version.iss')

const raw = fs.readFileSync(packageJsonPath, 'utf8')
const pkg = JSON.parse(raw)

if (!pkg.version || typeof pkg.version !== 'string') {
  throw new Error('package.json missing "version"')
}

const content = `#define AppVersion "${pkg.version}"\n`
fs.writeFileSync(outputPath, content, 'utf8')
console.log(`Wrote ${path.relative(repoRoot, outputPath)} with version ${pkg.version}`)
