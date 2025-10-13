#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs/promises";
import semver from "semver";

const execAsync = promisify(exec);

class DependencyManagerMCP {
  constructor() {
    this.server = new Server(
      {
        name: "dependency-manager-mcp",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  setupErrorHandling() {
    this.server.onerror = (error) => console.error("[MCP Error]", error);
    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "check_outdated_dependencies",
          description: "Check for outdated dependencies in a project",
          inputSchema: {
            type: "object",
            properties: {
              projectPath: {
                type: "string",
                description: "Path to the project directory (defaults to current directory)",
              },
              packageManager: {
                type: "string",
                enum: ["npm", "yarn", "pnpm"],
                description: "Package manager to use (defaults to npm)",
              },
            },
          },
        },
        {
          name: "update_dependencies",
          description: "Update dependencies to latest stable versions",
          inputSchema: {
            type: "object",
            properties: {
              projectPath: {
                type: "string",
                description: "Path to the project directory (defaults to current directory)",
              },
              target: {
                type: "string",
                enum: ["latest", "minor", "patch"],
                description: "Update target: latest, minor, or patch versions only",
              },
              interactive: {
                type: "boolean",
                description: "Run in interactive mode to choose which updates to apply",
              },
              devDependencies: {
                type: "boolean",
                description: "Include dev dependencies in updates",
              },
            },
          },
        },
        {
          name: "check_security_vulnerabilities",
          description: "Check for security vulnerabilities in dependencies",
          inputSchema: {
            type: "object",
            properties: {
              projectPath: {
                type: "string",
                description: "Path to the project directory (defaults to current directory)",
              },
              fix: {
                type: "boolean",
                description: "Automatically fix vulnerabilities if possible",
              },
            },
          },
        },
        {
          name: "analyze_dependency_tree",
          description: "Analyze dependency tree and find potential issues",
          inputSchema: {
            type: "object",
            properties: {
              projectPath: {
                type: "string",
                description: "Path to the project directory (defaults to current directory)",
              },
              depth: {
                type: "number",
                description: "Maximum depth to analyze (defaults to unlimited)",
              },
            },
          },
        },
        {
          name: "get_package_info",
          description: "Get detailed information about a specific package",
          inputSchema: {
            type: "object",
            properties: {
              packageName: {
                type: "string",
                description: "Name of the package to get info about",
              },
            },
            required: ["packageName"],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "check_outdated_dependencies":
            return await this.checkOutdatedDependencies(args);
          case "update_dependencies":
            return await this.updateDependencies(args);
          case "check_security_vulnerabilities":
            return await this.checkSecurityVulnerabilities(args);
          case "analyze_dependency_tree":
            return await this.analyzeDependencyTree(args);
          case "get_package_info":
            return await this.getPackageInfo(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async checkOutdatedDependencies(args) {
    const projectPath = args.projectPath || process.cwd();
    const packageManager = args.packageManager || "npm";

    try {
      let command;
      switch (packageManager) {
        case "npm":
          command = "npm outdated --json";
          break;
        case "yarn":
          command = "yarn outdated --json";
          break;
        case "pnpm":
          command = "pnpm outdated --format json";
          break;
        default:
          command = "npm outdated --json";
      }

      const { stdout, stderr } = await execAsync(command, { cwd: projectPath });
      
      let outdatedPackages;
      try {
        outdatedPackages = JSON.parse(stdout);
      } catch {
        // npm outdated returns non-zero exit code when packages are outdated
        outdatedPackages = {};
      }

      const results = Object.entries(outdatedPackages).map(([name, info]) => ({
        name,
        current: info.current,
        wanted: info.wanted,
        latest: info.latest,
        location: info.location,
      }));

      return {
        content: [
          {
            type: "text",
            text: results.length > 0 
              ? `Found ${results.length} outdated dependencies:\\n\\n` +
                results.map(pkg => 
                  `📦 ${pkg.name}: ${pkg.current} → ${pkg.wanted} (latest: ${pkg.latest})`
                ).join("\\n")
              : "✅ All dependencies are up to date!",
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to check outdated dependencies: ${error.message}`);
    }
  }

  async updateDependencies(args) {
    const projectPath = args.projectPath || process.cwd();
    const target = args.target || "latest";
    const interactive = args.interactive || false;
    const devDependencies = args.devDependencies !== false;

    try {
      let command = "npx npm-check-updates";
      
      if (target === "minor") command += " --target minor";
      else if (target === "patch") command += " --target patch";
      
      if (interactive) command += " --interactive";
      if (!devDependencies) command += " --dep prod";
      
      command += " --upgrade";

      const { stdout, stderr } = await execAsync(command, { cwd: projectPath });

      return {
        content: [
          {
            type: "text",
            text: `Dependencies update completed:\\n\\n${stdout}\\n\\nRun 'npm install' to install the updated packages.`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to update dependencies: ${error.message}`);
    }
  }

  async checkSecurityVulnerabilities(args) {
    const projectPath = args.projectPath || process.cwd();
    const fix = args.fix || false;

    try {
      const command = fix ? "npm audit fix --json" : "npm audit --json";
      const { stdout, stderr } = await execAsync(command, { cwd: projectPath });

      const auditResult = JSON.parse(stdout);
      const vulnerabilities = auditResult.vulnerabilities || {};
      const vulnCount = Object.keys(vulnerabilities).length;

      let summary = "";
      if (vulnCount === 0) {
        summary = "✅ No security vulnerabilities found!";
      } else {
        const levels = {};
        Object.values(vulnerabilities).forEach(vuln => {
          levels[vuln.severity] = (levels[vuln.severity] || 0) + 1;
        });

        summary = `⚠️ Found ${vulnCount} vulnerabilities:\\n` +
          Object.entries(levels).map(([level, count]) => 
            `  ${level}: ${count}`
          ).join("\\n");

        if (fix) {
          summary += "\\n\\n🔧 Attempted to fix vulnerabilities automatically.";
        }
      }

      return {
        content: [
          {
            type: "text",
            text: summary,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to check security vulnerabilities: ${error.message}`);
    }
  }

  async analyzeDependencyTree(args) {
    const projectPath = args.projectPath || process.cwd();
    const depth = args.depth ? `--depth=${args.depth}` : "";

    try {
      const { stdout } = await execAsync(`npm list --json ${depth}`, { cwd: projectPath });
      const tree = JSON.parse(stdout);

      const analysis = {
        totalDependencies: this.countDependencies(tree),
        duplicates: this.findDuplicates(tree),
        largePackages: await this.findLargePackages(projectPath),
      };

      let report = `📊 Dependency Analysis:\\n\\n`;
      report += `Total dependencies: ${analysis.totalDependencies}\\n`;
      
      if (analysis.duplicates.length > 0) {
        report += `\\n🔄 Duplicate packages found:\\n`;
        analysis.duplicates.forEach(dup => {
          report += `  ${dup.name}: ${dup.versions.join(", ")}\\n`;
        });
      }

      return {
        content: [
          {
            type: "text",
            text: report,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to analyze dependency tree: ${error.message}`);
    }
  }

  async getPackageInfo(args) {
    const packageName = args.packageName;

    try {
      const { stdout } = await execAsync(`npm view ${packageName} --json`);
      const packageInfo = JSON.parse(stdout);

      const info = `📦 Package Information for ${packageName}:\\n\\n` +
        `Version: ${packageInfo.version}\\n` +
        `Description: ${packageInfo.description || "N/A"}\\n` +
        `Homepage: ${packageInfo.homepage || "N/A"}\\n` +
        `Repository: ${packageInfo.repository?.url || "N/A"}\\n` +
        `License: ${packageInfo.license || "N/A"}\\n` +
        `Dependencies: ${Object.keys(packageInfo.dependencies || {}).length}\\n` +
        `Last Published: ${packageInfo.time?.[packageInfo.version] || "N/A"}`;

      return {
        content: [
          {
            type: "text",
            text: info,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get package info: ${error.message}`);
    }
  }

  countDependencies(tree, count = 0) {
    if (tree.dependencies) {
      count += Object.keys(tree.dependencies).length;
      Object.values(tree.dependencies).forEach(dep => {
        count = this.countDependencies(dep, count);
      });
    }
    return count;
  }

  findDuplicates(tree) {
    const packages = {};
    this.collectPackages(tree, packages);
    
    return Object.entries(packages)
      .filter(([name, versions]) => versions.size > 1)
      .map(([name, versions]) => ({
        name,
        versions: Array.from(versions),
      }));
  }

  collectPackages(tree, packages = {}) {
    if (tree.dependencies) {
      Object.entries(tree.dependencies).forEach(([name, info]) => {
        if (!packages[name]) packages[name] = new Set();
        packages[name].add(info.version);
        this.collectPackages(info, packages);
      });
    }
  }

  async findLargePackages(projectPath) {
    try {
      const { stdout } = await execAsync("npm list --depth=0 --json", { cwd: projectPath });
      const tree = JSON.parse(stdout);
      // This is a simplified implementation - in reality, you'd analyze package sizes
      return [];
    } catch {
      return [];
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Dependency Manager MCP server running on stdio");
  }
}

const server = new DependencyManagerMCP();
server.run().catch(console.error);
