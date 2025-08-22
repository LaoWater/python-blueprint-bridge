-- Add installation guide content for Python Foundations page
INSERT INTO public.content (page, section, title, description, code) VALUES
-- Installation Overview
('foundations', 'installation-overview', 'Setting Up Your Python Development Environment', 'Before we dive into Python programming, let''s set up a proper development environment. We''ll install Python, Git for version control, and set up a code editor.', NULL),

-- Python Installation Windows
('foundations', 'installation-python-windows', 'Installing Python on Windows', 'Step-by-step guide to install Python on Windows systems.', 'Step 1: Download Python
1. Go to https://www.python.org/downloads/
2. Click "Download Python 3.12.x" (latest stable version)
3. Make sure to download the 64-bit version for modern computers

Step 2: Run the Installer
1. Run the downloaded .exe file
2. IMPORTANT: Check "Add Python to PATH" checkbox
3. Choose "Install Now" for default installation
4. Wait for installation to complete

Step 3: Verify Installation
1. Open Command Prompt (cmd)
2. Type: python --version
3. You should see: Python 3.12.x
4. Type: pip --version
5. You should see pip version information'),

-- Python Installation Mac
('foundations', 'installation-python-mac', 'Installing Python on macOS', 'Step-by-step guide to install Python on macOS systems.', 'Method 1: Official Python Installer (Recommended)
Step 1: Download Python
1. Go to https://www.python.org/downloads/
2. Click "Download Python 3.12.x" for macOS
3. Download the macOS 64-bit installer

Step 2: Run the Installer
1. Open the downloaded .pkg file
2. Follow the installation wizard
3. Keep all default settings
4. Enter your password when prompted

Method 2: Using Homebrew (Advanced)
Step 1: Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

Step 2: Install Python via Homebrew
brew install python

Step 3: Verify Installation
1. Open Terminal
2. Type: python3 --version
3. You should see: Python 3.12.x
4. Type: pip3 --version
5. You should see pip version information

Note: On macOS, you might need to use "python3" and "pip3" instead of "python" and "pip"'),

-- Git Installation Windows  
('foundations', 'installation-git-windows', 'Installing Git on Windows', 'Git is essential for version control and collaborating on code projects.', 'Step 1: Download Git
1. Go to https://git-scm.com/download/win
2. Download will start automatically
3. Choose the 64-bit version for modern computers

Step 2: Run the Installer
1. Run the downloaded .exe file
2. Click "Next" through most options (defaults are good)
3. Important choices:
   - Choose "Use Git from the Windows Command Prompt"
   - Choose "Checkout Windows-style, commit Unix-style line endings"
   - Choose "Use Windows'' default console window"

Step 3: Verify Installation
1. Open Command Prompt or Git Bash
2. Type: git --version
3. You should see: git version 2.x.x

Step 4: Configure Git (First time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"'),

-- Git Installation Mac
('foundations', 'installation-git-mac', 'Installing Git on macOS', 'Git installation options for macOS systems.', 'Method 1: Using Homebrew (Recommended)
Step 1: Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

Step 2: Install Git
brew install git

Method 2: Official Git Installer
Step 1: Download Git
1. Go to https://git-scm.com/download/mac
2. Download the installer for macOS

Step 2: Run the Installer
1. Open the downloaded .dmg file
2. Run the .pkg installer
3. Follow the installation wizard

Method 3: Xcode Command Line Tools
xcode-select --install

Step 3: Verify Installation
1. Open Terminal
2. Type: git --version
3. You should see: git version 2.x.x

Step 4: Configure Git (First time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"'),

-- Installation Verification
('foundations', 'installation-verification', 'Verifying Your Installation', 'Let''s make sure everything is working correctly.', 'Test Python Installation:
# Check Python version
python --version
# or on macOS:
python3 --version

# Test Python interactive mode
python
>>> print("Hello, Python!")
>>> exit()

Test pip (Python package installer):
pip --version
# or on macOS:
pip3 --version

Test Git:
git --version

Create Your First Python File:
1. Create a new file called "hello.py"
2. Add this content:
   print("Hello, World!")
   print("Python is working!")

3. Run it:
   python hello.py
   # or on macOS:
   python3 hello.py

Expected Output:
Hello, World!
Python is working!

If you see this output, congratulations! Your Python environment is ready.'),

-- Development Environment Setup
('foundations', 'development-environment', 'Setting Up Your Code Editor', 'A good code editor makes programming much more enjoyable and productive.', 'Recommended Code Editors:

Visual Studio Code (Recommended)
1. Download from: https://code.visualstudio.com/
2. Install the Python extension by Microsoft
3. Install these helpful extensions:
   - Python (by Microsoft)
   - Python Docstring Generator
   - GitLens
   - Bracket Pair Colorizer

PyCharm Community Edition
1. Download from: https://www.jetbrains.com/pycharm/
2. Choose Community Edition (free)
3. Great for larger Python projects

Sublime Text
1. Download from: https://www.sublimetext.com/
2. Lightweight and fast
3. Install Package Control for extensions

Basic VS Code Setup for Python:
1. Open VS Code
2. Install Python extension (Ctrl/Cmd + Shift + X)
3. Open a folder for your Python projects
4. Create a new file with .py extension
5. VS Code will automatically suggest Python interpreter

Essential VS Code Settings:
{
    "python.defaultInterpreterPath": "python",
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": true,
    "editor.tabSize": 4,
    "editor.insertSpaces": true
}

Your development environment is now ready for Python programming!');