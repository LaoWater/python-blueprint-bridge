# Scikit-learn Training Sessions - Complete Guide

## Table of Contents
- [Session 30: Introduction to Scikit-learn](#session-30)
- [Session 31: Advanced Classification, Pipelines & Tuning](#session-31)
- [Session 32: Advanced Regression Project - Real Estate](#session-32)
- [Session 33: Classification on Iris Dataset](#session-33)

---

## Session 30 – Introduction to Scikit-learn (sklearn) {#session-30}

**Duration:** 3 hours

**Objective:** Familiarization with the Scikit-learn library used for machine learning, covering basic steps: data loading, dataset splitting, model training, predictions, and evaluation.

### What is Scikit-learn?

Scikit-learn is a widely-used Python library for:
- **Classification** (e.g., spam vs. non-spam)
- **Regression** (e.g., predicting apartment prices)
- **Clustering** (e.g., customer segmentation)
- **Dimensionality reduction** (PCA)

Built on top of NumPy, SciPy, and Matplotlib.

### General Steps in an sklearn Project

1. Load data (internal/external)
2. Split data into train/test sets
3. Choose a model
4. Train the model
5. Make predictions on test data
6. Evaluate performance

### Core Concepts

#### Basic Imports
Essential libraries needed:
- NumPy and Pandas for data manipulation
- `train_test_split` for dataset splitting
- `LinearRegression` for modeling
- Metrics for evaluation (`mean_squared_error`, `r2_score`)

#### Example Project: House Price Prediction
- Simple dataset with square meters as features
- Price in euros as target variable
- 80/20 train-test split strategy
- Linear regression model training
- Coefficient and bias visualization

#### Model Training Process
1. Create training and test datasets
2. Initialize the Linear Regression model
3. Fit the model on training data
4. Display model coefficients and intercept
5. Generate predictions on test data

#### Model Evaluation Metrics
- **RMSE** (Root Mean Squared Error) - measures prediction error
- **R² Score** - indicates model performance (0 to 1, higher is better)

### Practical Exercises

1. Load the `diabetes` dataset from sklearn and train a regression model
2. Use the `iris` dataset to train a `KNeighborsClassifier`
3. Experiment with different `test_size` values and observe R² score changes

---

## Session 31 – Advanced Scikit-learn: Classification, Pipelines, Tuning {#session-31}

**Duration:** 3 hours 30 minutes

**Objective:** Deep dive into classification with Scikit-learn using multiple models, pipelines, normalization, advanced evaluation, and hyperparameter optimization.

### Real Dataset: Breast Cancer

**Dataset Overview:**
- Using sklearn's built-in breast cancer dataset
- Contains 30 features describing cell characteristics
- Binary classification: malignant vs benign
- DataFrame creation with feature names for better readability
- Dataset exploration using `.shape`, `.head()`, `.info()`

### Complete Preprocessing

#### Data Preparation Steps
1. **Train-Test Split** - 80/20 ratio with fixed random state
2. **Feature Scaling** - StandardScaler for normalization
3. **Important Distinction:**
   - Use `fit_transform()` on training data
   - Use `transform()` only on test data to prevent data leakage

### Multiple Classifiers Comparison

#### Three Models Evaluated:

**1. SVM (Support Vector Machine)**
- Effective for high-dimensional spaces
- Finds optimal hyperplane for separation
- Works well with clear margin of separation

**2. Random Forest**
- Ensemble method using multiple decision trees
- Reduces overfitting through averaging
- Handles non-linear relationships well

**3. KNN (K-Nearest Neighbors)**
- Distance-based classification
- Simple yet effective algorithm
- Performance depends on k value choice

#### Evaluation Metrics
Each model assessed with:
- **Confusion Matrix** - visual representation of predictions
- **Classification Report** - detailed metrics including:
  - Precision (positive predictive value)
  - Recall (sensitivity/true positive rate)
  - F1-score (harmonic mean of precision and recall)
  - Support (number of samples per class)

### Pipeline Creation

#### Benefits of Pipelines:
- Combines preprocessing and model training into one object
- Prevents data leakage automatically
- Simplifies code structure
- Ensures reproducibility
- Makes deployment easier

#### Example Structure:
StandardScaler → Classifier (all in one pipeline object)

### Cross-Validation

**5-Fold Cross-Validation:**
- Dataset split into 5 equal parts
- Model trained 5 times, each time using different fold as test
- Mean accuracy calculated across all folds
- Provides better estimate of model generalization
- Reduces variance in performance estimation

### Hyperparameter Tuning with GridSearchCV

#### Grid Search Implementation:

**What it does:**
- Exhaustive search across specified parameter combinations
- Uses cross-validation for each combination
- Identifies best performing parameters

**Parameters tested (for SVM example):**
- **C** - regularization parameter [0.1, 1, 10]
- **kernel** - algorithm type ['linear', 'rbf']
- **gamma** - kernel coefficient [0.001, 0.01, 0.1]

**Output:**
- Best parameter combination
- Best cross-validation score
- Trained model with optimal parameters

### Confusion Matrix Visualization

**Using ConfusionMatrixDisplay:**
- Visual representation of classification results
- Shows true positives, false positives, true negatives, false negatives
- Helps identify which classes are confused
- Useful for understanding model errors

### Practical Exercises

1. Run all three models (SVM, RandomForest, KNN) on the Iris dataset
2. Create a pipeline combining StandardScaler + RandomForest
3. Use GridSearchCV for KNN to optimize `n_neighbors` parameter
4. Write a comparative report analyzing performance of all three models

---

## Session 32 – Advanced Regression Project: Real Estate Price Prediction {#session-32}

**Duration:** 3 hours 30 minutes

**Objective:** Build a complete real-world regression project using Scikit-learn to predict housing prices based on complex datasets.

### Learning Outcomes

By the end of this session, you will master:
- Advanced data preprocessing techniques
- Handling missing data effectively
- Processing categorical features
- Dealing with outliers
- Selection and comparison of multiple regression models
- Cross-validation strategies
- Hyperparameter tuning for regression
- Professional results visualization and interpretation

### Project Context

#### Real-World Application Scenario

**Goal:** Develop a price prediction application for real estate

**Input Features:**
- **Location/zone** - neighborhood or district
- **Number of rooms** - total room count
- **Usable area** - square meters
- **Construction year** - building age
- **Floor number** - apartment level
- **Balcony** - presence/absence (binary)
- **Parking** - availability (binary)

**Output:** Predicted price in currency units

**Dataset:** Working with `housing_data.csv` - fictional but realistic data

### Data Cleaning and Preprocessing

#### Initial Data Exploration
- Load dataset using pandas
- Examine first rows with `.head()`
- Check data types and null values with `.info()`
- Identify missing values with `.isnull().sum()`

#### Handling Missing Values Strategy

**Two-Track Approach:**

**Numerical Features:** `suprafata`, `etaj`, `an_constructie`
- Strategy: Impute with mean value
- Reasoning: Preserves overall distribution
- Applied via `SimpleImputer(strategy="mean")`

**Categorical Features:** `zona`, `balcon`, `parcare`
- Strategy: Impute with most frequent value
- Reasoning: Maintains mode of distribution
- Applied via `SimpleImputer(strategy="most_frequent")`

#### Feature Engineering Pipeline

**Numerical Transformer:**
1. SimpleImputer (mean strategy)
2. StandardScaler (normalization)

**Categorical Transformer:**
1. SimpleImputer (most frequent strategy)
2. OneHotEncoder (converts categories to binary columns)
   - `handle_unknown="ignore"` for unseen categories

**ColumnTransformer:**
- Applies different transformations to different column types
- Maintains column integrity
- Ensures proper preprocessing order

### Model Development

#### Data Splitting
- **Training Set:** 80% of data for model learning
- **Test Set:** 20% of data for final evaluation
- **Random State:** Fixed for reproducibility
- Features (X) vs Target (y - price) separation

#### Model 1: Linear Regression

**Characteristics:**
- Baseline model for comparison
- Assumes linear relationship between features and target
- Fast training and prediction
- Easily interpretable coefficients

**Implementation:**
- Complete pipeline with preprocessing
- Model training on transformed data
- R² score calculation for performance assessment

**Use Case:** Good starting point, works well when relationships are approximately linear

#### Model 2: Ridge Regression with Grid Search

**Characteristics:**
- Regularized linear model (L2 regularization)
- Prevents overfitting by penalizing large coefficients
- Hyperparameter: alpha (regularization strength)

**Grid Search Configuration:**
- **Alpha values tested:** [0.1, 1, 10, 100]
- **Cross-validation:** 5 folds
- **Scoring metric:** Negative MSE (mean squared error)
- Automatically selects best alpha value

**Advantages:**
- Better generalization than simple linear regression
- Handles multicollinearity well
- Systematic hyperparameter optimization

#### Model 3: Random Forest Regressor

**Characteristics:**
- Ensemble method using 100 decision trees
- Captures non-linear relationships effectively
- Robust to outliers
- Provides feature importance metrics

**Configuration:**
- `n_estimators=100` - number of trees in forest
- Complete preprocessing pipeline integration
- No manual feature scaling needed for tree-based models (but we include it for consistency)

**Advantages:**
- Handles complex patterns
- Less prone to overfitting than single decision tree
- Works well with mixed feature types

### Results Visualization

#### Prediction vs Actual Plot

**Purpose:** Visual assessment of model accuracy

**Components:**
- Scatter plot: actual prices (x-axis) vs predicted prices (y-axis)
- Reference line (y=x): represents perfect predictions
- Alpha transparency: shows density of predictions

**Interpretation:**
- Points close to line = good predictions
- Points above line = overestimation
- Points below line = underestimation
- Spread around line = prediction variance

#### Residual Analysis

**Residuals Definition:** Difference between actual and predicted values

**Visualization:**
- Histogram of residuals
- KDE (Kernel Density Estimation) overlay for smooth distribution
- Shows error distribution pattern

**What to Look For:**
- **Normal distribution:** Centered at zero (good)
- **Skewness:** Systematic over/under prediction (problematic)
- **Heavy tails:** Large errors on some predictions (investigate outliers)
- **Bimodal distribution:** Model might be missing important features

### Practical Exercises

1. **Algorithm Comparison:** Replace Random Forest with `GradientBoostingRegressor` and compare:
   - Training time
   - R² scores
   - Prediction patterns
   - Residual distributions

2. **Feature Engineering:** Add new column `numar_camere` (number of rooms):
   - Include in numerical features
   - Retrain all models
   - Compare performance improvement

3. **Target Engineering:** Build new model predicting price per square meter:
   - Create new target: `y = df["pret"] / df["suprafata"]`
   - Retrain models
   - Compare interpretability and accuracy

---

## Session 33 – Classification on the Iris Dataset {#session-33}

**Duration:** 2 hours 30 minutes

**Objective:** Build a classification model on one of the most famous machine learning datasets – the Iris dataset.

### Dataset Overview

#### The Iris Dataset

**Historical Context:**
- Introduced by Ronald Fisher in 1936
- One of the most well-known datasets in pattern recognition
- Standard benchmark for classification algorithms

**Dataset Characteristics:**
- **Samples:** 150 iris flowers
- **Features:** 4 numerical measurements (in centimeters)
  - Sepal length
  - Sepal width
  - Petal length
  - Petal width
- **Target:** 3 iris species
  - Iris setosa
  - Iris versicolor
  - Iris virginica
- **Balance:** 50 samples per species (perfectly balanced)

### Dataset Loading

**Implementation Steps:**
1. Import `load_iris` from sklearn.datasets
2. Load dataset into iris object
3. Create DataFrame for features (better readability)
4. Create Series for target variable
5. Explore data structure using `.head()`

**Why DataFrame?**
- Named columns for clarity
- Easier data manipulation
- Better integration with pandas ecosystem
- Clearer visualization

### Train-Test Split

**Configuration:**
- **Split Ratio:** 80% training, 20% testing
- **Random State:** 42 (for reproducibility)
- **Stratification:** Not explicitly shown but recommended for small datasets

**Purpose:**
- Training set: model learns patterns
- Test set: unbiased evaluation of model performance

### Model Selection and Training

#### K-Nearest Neighbors Classifier

**Algorithm Overview:**
- Stores all training examples
- Makes predictions based on k nearest neighbors
- Uses distance metric (typically Euclidean)

**Configuration:**
- `n_neighbors=5` - considers 5 closest points
- Voting mechanism: majority class wins

**Why KNN for Iris?**
- Simple and intuitive algorithm
- No training phase (lazy learning)
- Works well with small datasets
- Good baseline for comparison
- Naturally handles multi-class problems

**Training Process:**
1. Initialize KNeighborsClassifier
2. Fit model on training data (stores data points)
3. Ready for predictions

### Model Evaluation

#### Confusion Matrix

**Structure:**
- Rows: actual classes
- Columns: predicted classes
- Diagonal: correct predictions
- Off-diagonal: misclassifications

**Information Provided:**
- True positives for each class
- Confusion between specific class pairs
- Overall classification pattern

#### Classification Report

**Metrics Explained:**

**Precision:**
- Formula: TP / (TP + FP)
- Meaning: Of all predicted positive, how many are correct?
- Important when false positives are costly

**Recall (Sensitivity):**
- Formula: TP / (TP + FN)
- Meaning: Of all actual positives, how many did we find?
- Important when false negatives are costly

**F1-Score:**
- Formula: 2 × (Precision × Recall) / (Precision + Recall)
- Meaning: Harmonic mean balancing precision and recall
- Good for overall performance assessment

**Support:**
- Number of actual samples per class
- Important for understanding metric reliability

**Accuracy:**
- Overall percentage of correct predictions
- Simple but can be misleading with imbalanced data

### Prediction on New Data

#### Real-World Application

**Scenario:** Biologist finds new iris flower

**Process:**
1. Measure flower characteristics: [5.1, 3.5, 1.4, 0.2]
2. Format as 2D array (sklearn requirement)
3. Pass to model's predict method
4. Map numerical prediction to species name

**Output Interpretation:**
- Model returns numerical class (0, 1, or 2)
- Use `iris.target_names` to get actual species name
- Example output: "Specia prezisă: setosa"

**Practical Value:**
- Demonstrates model deployment
- Shows real prediction workflow
- Validates model usability

### Practical Exercises

#### Exercise 1: Algorithm Comparison

**Test Alternative Algorithms:**

**SVC (Support Vector Classifier):**
- Find optimal hyperplane
- Effective in high-dimensional spaces
- Compare accuracy with KNN

**RandomForestClassifier:**
- Ensemble of decision trees
- Robust and typically high accuracy
- Provides feature importance

**Task:**
- Train both models on same data
- Compare confusion matrices
- Analyze classification reports
- Determine which works best for Iris

#### Exercise 2: Hyperparameter Exploration

**Experiment with n_neighbors:**

Test values: [1, 3, 5, 7, 9, 11, 15]

**Observe:**
- Accuracy changes
- Overfitting vs underfitting
- Training vs test performance
- Optimal k value for this dataset

**Analysis Questions:**
- Why does k=1 often overfit?
- What happens with very large k?
- How to choose optimal k systematically?

#### Exercise 3: Comparative Visualization

**Create Comparison Chart:**

**Chart Requirements:**
- X-axis: Different models/configurations
- Y-axis: Accuracy score
- Separate bars/points for train vs test accuracy
- Visual identification of best performer

**Additional Visualizations:**
- Precision comparison across models
- Recall comparison across models
- F1-score comparison
- Training time comparison (optional)

**Deliverable:**
- Professional chart with clear labels
- Title describing the comparison
- Legend explaining elements
- Brief written analysis of findings

---

## Key Takeaways Across All Sessions

### Session 30: Foundation
- Basic sklearn workflow
- Simple regression concepts
- Train-test splitting
- Model evaluation fundamentals

### Session 31: Advanced Techniques
- Multiple classification algorithms
- Pipeline construction
- Cross-validation strategies
- Hyperparameter optimization
- Comprehensive evaluation metrics

### Session 32: End-to-End Project
- Real-world data challenges
- Advanced preprocessing
- Multiple model comparison
- Professional visualization
- Complete ML pipeline

### Session 33: Practical Application
- Classic dataset exploration
- Classification fundamentals
- Model comparison methodology
- Practical prediction examples

---

## General Best Practices

### Code Organization
1. Always import all libraries at the beginning
2. Use meaningful variable names
3. Comment complex operations
4. Separate data preparation from modeling

### Data Preparation
1. Always explore data before modeling
2. Handle missing values systematically
3. Scale features when appropriate
4. Use pipelines to prevent data leakage

### Model Development
1. Start with simple baseline models
2. Use cross-validation for reliable evaluation
3. Compare multiple algorithms
4. Tune hyperparameters systematically

### Evaluation
1. Use multiple metrics, not just accuracy
2. Visualize results for better understanding
3. Analyze errors (residuals/confusion matrix)
4. Consider real-world costs of different error types

### Documentation
1. Document all modeling decisions
2. Record hyperparameters used
3. Save model performance metrics
4. Maintain reproducible code (set random states)

---

*End of Training Sessions 30-33*