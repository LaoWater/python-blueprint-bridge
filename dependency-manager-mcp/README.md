# Dependency Manager MCP Server

This MCP (Model Context Protocol) server provides tools for managing project dependencies, keeping them up-to-date, and ensuring security and stability.

## Features

- **Check Outdated Dependencies**: Identify packages that have newer versions available
- **Update Dependencies**: Automatically update to latest stable versions with different target options (latest, minor, patch)
- **Security Vulnerability Scanning**: Check for and fix security issues in dependencies
- **Dependency Tree Analysis**: Analyze your dependency tree for duplicates and potential issues
- **Package Information**: Get detailed information about specific packages

## Tools Available

1. `check_outdated_dependencies` - Check for outdated dependencies
2. `update_dependencies` - Update dependencies to latest stable versions
3. `check_security_vulnerabilities` - Check for security vulnerabilities
4. `analyze_dependency_tree` - Analyze dependency tree and find issues
5. `get_package_info` - Get detailed package information

## Setup Instructions

### 1. Configure Your AI Assistant

Add the MCP server to your AI assistant's configuration. The configuration depends on which AI assistant you're using:

#### For Claude Desktop (config.json):
```json
{
  "mcpServers": {
    "dependency-manager": {
      "command": "node",
      "args": ["C:\\\\Users\\\\baciu\\\\Desktop\\\\Neo Study\\\\BluePigeon\\\\python-blueprint-bridge\\\\dependency-manager-mcp\\\\index.js"]
    }
  }
}
```

#### For Other MCP-Compatible Assistants:
Use the `mcp-config.json` file in the parent directory.

### 2. Test the Installation

You can test the MCP server directly:

```powershell
cd dependency-manager-mcp
node index.js
```

The server should output: "Dependency Manager MCP server running on stdio"

## Usage Examples

Once configured with your AI assistant, you can ask:

- "Check if my project has any outdated dependencies"
- "Update all dependencies to their latest stable versions"
- "Scan for security vulnerabilities in my dependencies"
- "Analyze my dependency tree for potential issues"
- "Tell me about the react package"

## Safety Features

- **Stable Version Preference**: Prioritizes stable releases over pre-releases
- **Interactive Mode**: Option to review changes before applying
- **Target-Specific Updates**: Choose between latest, minor, or patch updates only
- **Security First**: Built-in vulnerability scanning and fixing

## Dependencies

The MCP server uses these key dependencies:
- `@modelcontextprotocol/sdk` - MCP protocol implementation
- `npm-check-updates` - For updating dependencies
- `semver` - For semantic version handling

## Supported Package Managers

- npm (default)
- Yarn
- pnpm

## Configuration Options

Each tool supports various options:

### Update Dependencies Options:
- `target`: "latest", "minor", or "patch"
- `interactive`: true/false for interactive mode
- `devDependencies`: include/exclude dev dependencies

### Security Check Options:
- `fix`: automatically attempt to fix vulnerabilities

### Analysis Options:
- `depth`: limit analysis depth
- `packageManager`: specify which package manager to use

This MCP server helps ensure your project stays up-to-date with the latest stable versions while maintaining security and avoiding breaking changes.
