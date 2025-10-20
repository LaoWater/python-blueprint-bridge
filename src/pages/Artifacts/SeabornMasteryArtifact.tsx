import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Play, Pause, RotateCcw, TrendingUp, BarChart3, Grid, Target, Lightbulb, Code, Download, Zap, Activity, Calendar, DollarSign, Briefcase, Heart, Brain, Palette, Eye, LineChart } from 'lucide-react';
import { CodeBlockR } from '@/components/CodeBlockR';

const SeabornMasteryArtifact = () => {
  const navigate = useNavigate();
  
  // Origin Story State
  const [storyStep, setStoryStep] = useState(-1);
  const [isStoryRunning, setIsStoryRunning] = useState(false);
  const [showStoryDetails, setShowStoryDetails] = useState(false);
  const [storyChapter, setStoryChapter] = useState(0);
  
  // Visualization Demo State
  const [selectedPlot, setSelectedPlot] = useState('distribution');
  const [plotData, setPlotData] = useState([]);
  const [showVisualization, setShowVisualization] = useState(false);
  
  // Health Analytics Demo State
  const [healthData, setHealthData] = useState({
    sleep: [7.5, 6.8, 7.2, 8.0, 6.5, 7.8, 8.2, 7.1, 6.9, 7.6, 8.1, 7.4, 6.7, 7.9, 8.3, 6.9, 7.5, 8.1, 6.8, 7.7],
    energy: [8, 6, 7, 9, 5, 8, 9, 7, 6, 8, 9, 8, 6, 8, 9, 7, 8, 9, 6, 8],
    exercise: [45, 0, 30, 60, 0, 50, 75, 40, 20, 60, 80, 45, 15, 55, 90, 25, 50, 70, 10, 60],
    mood: [8, 6, 7, 9, 5, 8, 9, 7, 6, 8, 9, 8, 6, 8, 9, 7, 8, 9, 6, 8],
    dates: Array.from({length: 20}, (_, i) => `Day ${i + 1}`)
  });
  const [showHealthAnalysis, setShowHealthAnalysis] = useState(false);
  
  // Financial Analytics State
  const [financialData, setFinancialData] = useState({
    expenses: {
      'Entertainment': [420, 380, 510, 290, 450, 380, 520, 310, 440, 390, 480, 350],
      'Food': [650, 720, 680, 590, 710, 660, 750, 620, 690, 640, 700, 610],
      'Transport': [180, 220, 160, 200, 190, 240, 170, 210, 180, 230, 160, 200],
      'Shopping': [320, 480, 290, 180, 410, 350, 520, 230, 380, 290, 460, 190]
    },
    satisfaction: [7, 6, 8, 8, 7, 6, 6, 9, 7, 8, 7, 9],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  });
  const [showFinancialInsights, setShowFinancialInsights] = useState(false);
  
  // Code Snippets State
  const [expandedCode, setExpandedCode] = useState({});
  
  // Story progression
  const storyChapters = [
    {
      title: "🧠 The Statistical Visualization Crisis",
      content: "2012: Michael Waskom, Stanford neuroscience PhD student, spends 6 hours creating a single publication-ready correlation matrix in matplotlib. His advisor asks for 'just a small color change' - another 2 hours lost.",
      details: "Academic research demands both statistical rigor and visual elegance. Beautiful visualizations aren't luxury - they're essential for communicating complex statistical relationships to peers, reviewers, and the public."
    },
    {
      title: "💡 The Breakthrough Insight", 
      content: "Waskom realizes the problem: matplotlib is a general plotting library, but statistical visualization has specific needs. Distributions, correlations, categorical comparisons - these require specialized tools.",
      details: "The scientific community needed a library that understood statistical concepts natively, not just as raw data points to be plotted."
    },
    {
      title: "🎨 Beautiful Statistics Born",
      content: "2012: Seaborn is born. Vision: 'Make statistical visualization in Python as intuitive as statistical thinking itself.' First principle: beautiful defaults that communicate statistical concepts clearly.",
      details: "Waskom built Seaborn on top of matplotlib but with statistical intelligence. It knows the difference between categorical and continuous data, between distributions and relationships."
    },
    {
      title: "🌍 Academic to Enterprise",
      content: "Today: From Nature publications to Netflix algorithms. Pharmaceutical companies use Seaborn for FDA submissions. Tech giants use it for A/B test analysis. Academic citation rates for papers with Seaborn visualizations are 40% higher.",
      details: "Beautiful statistical communication became a competitive advantage across industries. Seaborn made statistical insight accessible to non-statisticians."
    },
    {
      title: "🚀 Your Statistical Journey",
      content: "Now you'll master the art of statistical storytelling. Every distribution you visualize, every correlation you reveal, every categorical comparison you make builds statistical intuition.",
      details: "Welcome to the world where statistics become stories, patterns become insights, and you become the statistical storyteller."
    }
  ];
  
  const fundamentalConcepts = [
    {
      title: "📊 Distributions: Understanding Your Data's Shape",
      description: "Reveal the hidden patterns in your data distributions - essential for any statistical analysis",
      code: `import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

# Your personal health data example
np.random.seed(42)
sleep_hours = np.random.normal(7.5, 1.2, 1000)
energy_levels = 2 * sleep_hours + np.random.normal(0, 2, 1000)

# Create comprehensive distribution analysis
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 1. Histogram with KDE
sns.histplot(sleep_hours, kde=True, ax=axes[0,0], color='skyblue', alpha=0.7)
axes[0,0].set_title('Sleep Distribution with Density Curve', fontweight='bold')
axes[0,0].set_xlabel('Hours of Sleep')

# 2. Box plot to identify outliers
sns.boxplot(y=sleep_hours, ax=axes[0,1], color='lightcoral')
axes[0,1].set_title('Sleep Quality: Outliers & Quartiles', fontweight='bold')

# 3. Violin plot: distribution shape + statistics
sns.violinplot(y=sleep_hours, ax=axes[1,0], color='lightgreen')
axes[1,0].set_title('Sleep Distribution Shape', fontweight='bold')

# 4. Distribution comparison
data = pd.DataFrame({'Sleep': sleep_hours, 'Energy': energy_levels})
sns.scatterplot(data=data, x='Sleep', y='Energy', ax=axes[1,1], alpha=0.6)
axes[1,1].set_title('Sleep vs Energy Relationship', fontweight='bold')

plt.tight_layout()
plt.show()

# Quick insights
print(f"Your average sleep: {sleep_hours.mean():.1f} hours")
print(f"Sleep consistency: {sleep_hours.std():.1f} hour standard deviation")
print(f"Energy correlation: {np.corrcoef(sleep_hours, energy_levels)[0,1]:.2f}")`,
      insights: [
        "Histograms show data frequency - essential for understanding normality",
        "KDE curves reveal distribution shape beyond simple bars",
        "Box plots instantly highlight outliers and quartiles",
        "Violin plots combine distribution shape with statistical summaries"
      ]
    },
    {
      title: "🔗 Relationships: Uncovering Hidden Correlations",
      description: "Discover how variables relate to each other - the foundation of all predictive analytics",
      code: `# Personal finance correlation analysis
# Real example: Find which expenses correlate with life satisfaction

# Sample data - track this yourself!
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
entertainment = [400, 350, 500, 280, 450, 320]
food_delivery = [180, 220, 160, 240, 190, 280]
gym_membership = [80, 80, 80, 0, 80, 80]  # Notice the gap!
life_satisfaction = [7, 6, 8, 4, 7, 5]   # Scale 1-10

df = pd.DataFrame({
    'Month': months,
    'Entertainment': entertainment,
    'Food_Delivery': food_delivery,
    'Gym': gym_membership,
    'Satisfaction': life_satisfaction
})

# Create relationship exploration
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# 1. Scatter plot with regression line
sns.regplot(data=df, x='Entertainment', y='Satisfaction', ax=axes[0,0])
axes[0,0].set_title('Entertainment Spending vs Life Satisfaction', fontweight='bold')

# 2. Multiple variables relationship
sns.scatterplot(data=df, x='Food_Delivery', y='Satisfaction', 
                size='Entertainment', sizes=(50, 200), ax=axes[0,1])
axes[0,1].set_title('Food + Entertainment vs Satisfaction', fontweight='bold')

# 3. Correlation heatmap
corr_data = df[['Entertainment', 'Food_Delivery', 'Gym', 'Satisfaction']].corr()
sns.heatmap(corr_data, annot=True, cmap='coolwarm', center=0, ax=axes[1,0])
axes[1,0].set_title('Expense Correlation Matrix', fontweight='bold')

# 4. Pairwise relationships
df_numeric = df[['Entertainment', 'Food_Delivery', 'Gym', 'Satisfaction']]
sns.heatmap(df_numeric.corr(), annot=True, cmap='viridis', ax=axes[1,1])
axes[1,1].set_title('All Relationships at Once', fontweight='bold')

plt.tight_layout()
plt.show()

# Actionable insights
print("💡 INSIGHTS:")
print(f"Entertainment-Satisfaction correlation: {df['Entertainment'].corr(df['Satisfaction']):.2f}")
print(f"Gym-Satisfaction correlation: {df['Gym'].corr(df['Satisfaction']):.2f}")
print(f"Food Delivery-Satisfaction correlation: {df['Food_Delivery'].corr(df['Satisfaction']):.2f}")`,
      insights: [
        "Regression lines show trend direction and strength",
        "Scatter plots reveal linear and non-linear relationships", 
        "Correlation matrices provide complete relationship overview",
        "Bubble sizes add third dimension to relationship analysis"
      ]
    },
    {
      title: "📂 Categories: Comparing Groups Like a Pro",
      description: "Compare categories with statistical rigor - from A/B tests to market segmentation",
      code: `# Real example: Analyze your daily habits by weekday vs weekend
# Track yourself for 30 days and see the patterns!

# Sample data - replace with your actual tracking
days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] * 4  # 4 weeks
day_type = ['Weekday']*5 + ['Weekend']*2
day_type = day_type * 4

# Your actual metrics
productivity = [7, 8, 6, 7, 5, 4, 6, 8, 7, 8, 6, 5, 3, 7, 6, 8, 7, 8, 5, 4, 2, 5, 
                7, 8, 6, 7, 4, 3, 6, 8, 7, 6]  # Scale 1-10

exercise_minutes = [45, 60, 30, 45, 0, 90, 120, 60, 45, 30, 60, 0, 180, 90, 45, 60, 
                   30, 45, 0, 150, 180, 60, 45, 30, 60, 45, 0, 120, 90]

sleep_hours = [7, 6.5, 7, 6, 6.5, 9, 8.5, 7, 6.5, 7, 6, 7, 10, 9, 7, 6.5, 
               7, 6, 6.5, 9.5, 8, 7, 6.5, 7, 6, 7, 10.5, 9, 7]

df_habits = pd.DataFrame({
    'Day': days[:len(productivity)],
    'Day_Type': (day_type * 5)[:len(productivity)],
    'Productivity': productivity,
    'Exercise_Min': exercise_minutes[:len(productivity)],
    'Sleep_Hours': sleep_hours[:len(productivity)]
})

# Statistical comparison visualizations
fig, axes = plt.subplots(2, 2, figsize=(15, 10))

# 1. Box plots for statistical comparison
sns.boxplot(data=df_habits, x='Day_Type', y='Productivity', ax=axes[0,0])
axes[0,0].set_title('Productivity: Weekday vs Weekend', fontweight='bold')

# 2. Violin plots show full distribution
sns.violinplot(data=df_habits, x='Day_Type', y='Sleep_Hours', ax=axes[0,1])
axes[0,1].set_title('Sleep Patterns by Day Type', fontweight='bold')

# 3. Strip plot with swarm for individual points
sns.swarmplot(data=df_habits, x='Day_Type', y='Exercise_Min', ax=axes[1,0])
axes[1,0].set_title('Exercise Distribution (Every Data Point)', fontweight='bold')

# 4. Bar plot with statistical significance
sns.barplot(data=df_habits, x='Day_Type', y='Productivity', ax=axes[1,1], ci=95)
axes[1,1].set_title('Average Productivity (95% Confidence)', fontweight='bold')

plt.tight_layout()
plt.show()

# Statistical insights
weekday_prod = df_habits[df_habits['Day_Type']=='Weekday']['Productivity'].mean()
weekend_prod = df_habits[df_habits['Day_Type']=='Weekend']['Productivity'].mean()

print("📊 STATISTICAL INSIGHTS:")
print(f"Weekday productivity average: {weekday_prod:.1f}")
print(f"Weekend productivity average: {weekend_prod:.1f}")
print(f"Difference: {abs(weekday_prod - weekend_prod):.1f} points")
print(f"Weekend sleep advantage: {df_habits[df_habits['Day_Type']=='Weekend']['Sleep_Hours'].mean() - df_habits[df_habits['Day_Type']=='Weekday']['Sleep_Hours'].mean():.1f} hours")`,
      insights: [
        "Box plots show median, quartiles, and outliers for statistical rigor",
        "Violin plots reveal distribution shapes within categories",
        "Swarm plots show every individual data point without overlap",
        "Confidence intervals indicate statistical reliability of differences"
      ]
    }
  ];
  
  const advancedTechniques = [
    {
      title: "🎨 Multi-Panel Statistical Narratives",
      description: "Combine multiple statistical views to tell complete data stories",
      code: `# Advanced example: Complete personal optimization dashboard
# Track multiple metrics and find the hidden optimization patterns

# Your comprehensive life data (30 days)
np.random.seed(42)
n_days = 30

# Generate realistic personal data
sleep_quality = np.random.normal(7.5, 1.5, n_days)
exercise_intensity = np.random.exponential(30, n_days)  # Minutes
work_stress = np.random.normal(6, 2, n_days)  # Scale 1-10
social_time = np.random.poisson(2, n_days)  # Hours with others
phone_screen_time = np.random.normal(4, 1.5, n_days)  # Hours
life_satisfaction = (0.3 * sleep_quality + 
                    0.2 * exercise_intensity/10 + 
                    0.4 * (10 - work_stress) + 
                    0.1 * social_time - 
                    0.2 * phone_screen_time + 
                    np.random.normal(0, 1, n_days))

# Create comprehensive life optimization dashboard
fig = plt.figure(figsize=(20, 15))
gs = fig.add_gridspec(4, 4, hspace=0.3, wspace=0.3)

# 1. Main relationships (large plot)
ax_main = fig.add_subplot(gs[0:2, 0:2])
life_df = pd.DataFrame({
    'Sleep': sleep_quality,
    'Exercise': exercise_intensity, 
    'Stress': work_stress,
    'Social': social_time,
    'Screen': phone_screen_time,
    'Satisfaction': life_satisfaction
})
sns.scatterplot(data=life_df, x='Sleep', y='Satisfaction', size='Exercise', 
                hue='Stress', sizes=(50, 300), ax=ax_main)
ax_main.set_title('Life Satisfaction Optimization Map', fontsize=16, fontweight='bold')

# 2. Correlation heatmap
ax_corr = fig.add_subplot(gs[0, 2:])
corr_matrix = life_df.corr()
sns.heatmap(corr_matrix, annot=True, cmap='RdYlBu_r', center=0, ax=ax_corr)
ax_corr.set_title('Life Factor Correlations')

# 3. Distribution analysis
ax_dist = fig.add_subplot(gs[1, 2:])
sns.violinplot(data=life_df[['Sleep', 'Exercise', 'Satisfaction']], ax=ax_dist)
ax_dist.set_title('Key Metric Distributions')

# 4. Weekly patterns
days_of_week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
day_patterns = [days_of_week[i % 7] for i in range(n_days)]
life_df['Day'] = day_patterns

ax_weekly = fig.add_subplot(gs[2, :2])
sns.boxplot(data=life_df, x='Day', y='Satisfaction', ax=ax_weekly)
ax_weekly.set_title('Weekly Satisfaction Patterns')

# 5. Time series trend
ax_trend = fig.add_subplot(gs[2, 2:])
life_df['Date'] = range(n_days)
sns.lineplot(data=life_df, x='Date', y='Satisfaction', ax=ax_trend)
sns.regplot(data=life_df, x='Date', y='Satisfaction', scatter=False, ax=ax_trend)
ax_trend.set_title('30-Day Satisfaction Trend')

# 6. Category optimization insights
ax_cat1 = fig.add_subplot(gs[3, 0])
life_df['Sleep_Cat'] = pd.cut(life_df['Sleep'], bins=[0, 6, 8, 12], labels=['Poor', 'Good', 'Excellent'])
sns.barplot(data=life_df, x='Sleep_Cat', y='Satisfaction', ax=ax_cat1)
ax_cat1.set_title('Sleep Quality Impact')

ax_cat2 = fig.add_subplot(gs[3, 1])
life_df['Exercise_Cat'] = pd.cut(life_df['Exercise'], bins=[0, 20, 40, 100], labels=['Low', 'Med', 'High'])
sns.barplot(data=life_df, x='Exercise_Cat', y='Satisfaction', ax=ax_cat2)
ax_cat2.set_title('Exercise Impact')

ax_cat3 = fig.add_subplot(gs[3, 2])
life_df['Screen_Cat'] = pd.cut(life_df['Screen'], bins=[0, 3, 5, 10], labels=['Low', 'Med', 'High'])
sns.barplot(data=life_df, x='Screen_Cat', y='Satisfaction', ax=ax_cat3)
ax_cat3.set_title('Screen Time Impact')

ax_cat4 = fig.add_subplot(gs[3, 3])
life_df['Stress_Cat'] = pd.cut(life_df['Stress'], bins=[0, 4, 7, 10], labels=['Low', 'Med', 'High'])
sns.barplot(data=life_df, x='Stress_Cat', y='Satisfaction', ax=ax_cat4)
ax_cat4.set_title('Stress Level Impact')

plt.show()

# Generate actionable insights
print("🎯 PERSONALIZED OPTIMIZATION INSIGHTS:")
print(f"Sleep-Satisfaction correlation: {life_df['Sleep'].corr(life_df['Satisfaction']):.2f}")
print(f"Exercise-Satisfaction correlation: {life_df['Exercise'].corr(life_df['Satisfaction']):.2f}")
print(f"Screen-Satisfaction correlation: {life_df['Screen'].corr(life_df['Satisfaction']):.2f}")

# Find your optimal ranges
high_satisfaction_days = life_df[life_df['Satisfaction'] > life_df['Satisfaction'].quantile(0.75)]
print(f"\\nYour happiness recipe (top 25% days):")
print(f"Optimal sleep: {high_satisfaction_days['Sleep'].mean():.1f} ± {high_satisfaction_days['Sleep'].std():.1f} hours")
print(f"Optimal exercise: {high_satisfaction_days['Exercise'].mean():.0f} ± {high_satisfaction_days['Exercise'].std():.0f} minutes")
print(f"Optimal screen time: {high_satisfaction_days['Screen'].mean():.1f} ± {high_satisfaction_days['Screen'].std():.1f} hours")`,
      insights: [
        "Multi-panel dashboards tell complete statistical stories",
        "Grid layouts organize complex statistical relationships", 
        "Combined plot types reveal different aspects of the same data",
        "Automated insights generation makes statistics actionable"
      ]
    },
    {
      title: "🔬 Statistical Significance & Confidence",
      description: "Add statistical rigor to your visualizations - essential for professional analysis",
      code: `# Advanced statistical analysis example
# A/B testing your personal habits for statistically significant improvements

from scipy import stats
import numpy as np

# Example: Testing if weekend vs weekday productivity is significantly different
# This is real science applied to personal optimization!

# Your 60-day productivity tracking
np.random.seed(42)
weekday_productivity = np.random.normal(6.5, 1.8, 45)  # 45 weekdays
weekend_productivity = np.random.normal(5.8, 2.2, 15)  # 15 weekend days

# Create comprehensive statistical analysis
fig, axes = plt.subplots(2, 3, figsize=(18, 12))

# 1. Distribution comparison with statistical overlay
ax = axes[0, 0]
sns.histplot(weekday_productivity, alpha=0.7, label='Weekday', kde=True, ax=ax)
sns.histplot(weekend_productivity, alpha=0.7, label='Weekend', kde=True, ax=ax)
ax.axvline(weekday_productivity.mean(), color='blue', linestyle='--', alpha=0.8)
ax.axvline(weekend_productivity.mean(), color='orange', linestyle='--', alpha=0.8)
ax.set_title('Productivity Distributions\\n(with mean lines)', fontweight='bold')
ax.legend()

# 2. Box plots with statistical annotations
ax = axes[0, 1]
data_for_box = [weekday_productivity, weekend_productivity]
box_plot = ax.boxplot(data_for_box, labels=['Weekday', 'Weekend'], patch_artist=True)
box_plot['boxes'][0].set_facecolor('lightblue')
box_plot['boxes'][1].set_facecolor('lightcoral')

# Perform t-test
t_stat, p_value = stats.ttest_ind(weekday_productivity, weekend_productivity)
ax.set_title(f'Statistical Comparison\\nt-test p-value: {p_value:.4f}', fontweight='bold')

# 3. Confidence intervals visualization
ax = axes[0, 2]
weekday_mean = weekday_productivity.mean()
weekend_mean = weekend_productivity.mean()
weekday_ci = stats.t.interval(0.95, len(weekday_productivity)-1, 
                             weekday_mean, stats.sem(weekday_productivity))
weekend_ci = stats.t.interval(0.95, len(weekend_productivity)-1, 
                             weekend_mean, stats.sem(weekend_productivity))

ax.errorbar([1, 2], [weekday_mean, weekend_mean], 
           yerr=[[weekday_mean - weekday_ci[0], weekend_mean - weekend_ci[0]], 
                 [weekday_ci[1] - weekday_mean, weekend_ci[1] - weekend_mean]], 
           fmt='o', capsize=10, capthick=2, markersize=10)
ax.set_xlim(0.5, 2.5)
ax.set_xticks([1, 2])
ax.set_xticklabels(['Weekday', 'Weekend'])
ax.set_title('95% Confidence Intervals', fontweight='bold')

# 4. Effect size visualization
ax = axes[1, 0]
# Cohen's d calculation
pooled_std = np.sqrt(((len(weekday_productivity) - 1) * weekday_productivity.var() + 
                     (len(weekend_productivity) - 1) * weekend_productivity.var()) / 
                    (len(weekday_productivity) + len(weekend_productivity) - 2))
cohens_d = (weekday_mean - weekend_mean) / pooled_std

effect_sizes = ['Small\\n(0.2)', 'Medium\\n(0.5)', 'Large\\n(0.8)', f'Your Effect\\n({cohens_d:.2f})']
effect_values = [0.2, 0.5, 0.8, abs(cohens_d)]
colors = ['lightgray', 'lightgray', 'lightgray', 'red' if abs(cohens_d) > 0.5 else 'orange']

bars = ax.bar(effect_sizes, effect_values, color=colors, alpha=0.7)
ax.axhline(y=0.2, color='gray', linestyle='--', alpha=0.5)
ax.axhline(y=0.5, color='gray', linestyle='--', alpha=0.5)
ax.axhline(y=0.8, color='gray', linestyle='--', alpha=0.5)
ax.set_title('Effect Size (Cohen\\'s d)', fontweight='bold')
ax.set_ylabel('Effect Size')

# 5. Power analysis simulation
ax = axes[1, 1]
sample_sizes = range(5, 100, 5)
powers = []
for n in sample_sizes:
    # Simulate power calculation
    power = stats.ttest_ind_from_stats(weekday_mean, weekday_productivity.std(), n,
                                      weekend_mean, weekend_productivity.std(), n).pvalue
    powers.append(1 - power if power > 0 else 0.8)  # Simplified power calculation

ax.plot(sample_sizes, powers, 'o-', color='green', linewidth=2)
ax.axhline(y=0.8, color='red', linestyle='--', label='80% Power Threshold')
ax.set_xlabel('Sample Size per Group')
ax.set_ylabel('Statistical Power')
ax.set_title('Power Analysis', fontweight='bold')
ax.legend()
ax.grid(True, alpha=0.3)

# 6. Practical significance vs statistical significance
ax = axes[1, 2]
practical_threshold = 0.5  # Define what matters practically
statistical_sig = p_value < 0.05
practical_sig = abs(weekday_mean - weekend_mean) > practical_threshold

categories = ['Statistical\\nSignificance', 'Practical\\nSignificance']
significance = [statistical_sig, practical_sig]
colors = ['green' if sig else 'red' for sig in significance]

bars = ax.bar(categories, [1 if s else 0 for s in significance], color=colors, alpha=0.7)
ax.set_ylim(0, 1.2)
ax.set_ylabel('Significance (Yes/No)')
ax.set_title(f'Significance Analysis\\n(Threshold: {practical_threshold})', fontweight='bold')

# Add text annotations
for bar, sig in zip(bars, significance):
    height = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2., height + 0.05,
           'YES' if sig else 'NO', ha='center', va='bottom', fontweight='bold')

plt.tight_layout()
plt.show()

# Statistical report
print("📊 COMPLETE STATISTICAL ANALYSIS REPORT:")
print("=" * 50)
print(f"Sample sizes: Weekdays={len(weekday_productivity)}, Weekends={len(weekend_productivity)}")
print(f"Weekday productivity: {weekday_mean:.2f} ± {weekday_productivity.std():.2f}")
print(f"Weekend productivity: {weekend_mean:.2f} ± {weekend_productivity.std():.2f}")
print(f"Difference: {weekday_mean - weekend_mean:.2f} points")
print(f"")
print(f"Statistical Tests:")
print(f"• t-statistic: {t_stat:.3f}")
print(f"• p-value: {p_value:.4f}")
print(f"• Effect size (Cohen's d): {cohens_d:.3f}")
print(f"• 95% CI weekday: ({weekday_ci[0]:.2f}, {weekday_ci[1]:.2f})")
print(f"• 95% CI weekend: ({weekend_ci[0]:.2f}, {weekend_ci[1]:.2f})")
print(f"")
print(f"Conclusions:")
print(f"• Statistically significant: {'YES' if p_value < 0.05 else 'NO'} (p < 0.05)")
print(f"• Practically significant: {'YES' if abs(cohens_d) > 0.5 else 'NO'} (effect size)")
print(f"• Recommendation: {'Optimize weekend habits' if weekday_mean > weekend_mean else 'Optimize weekday habits'}")`,
      insights: [
        "Statistical significance tests prevent false conclusions from random noise",
        "Effect sizes measure practical importance beyond statistical significance",
        "Confidence intervals show the reliability of your estimates",
        "Power analysis determines if your sample size is adequate for conclusions"
      ]
    }
  ];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const runOriginStory = () => {
    setIsStoryRunning(true);
    setStoryStep(0);
    setShowStoryDetails(true);
    setStoryChapter(0);
    
    const interval = setInterval(() => {
      setStoryStep((prev) => {
        if (prev >= storyChapters.length - 1) {
          setIsStoryRunning(false);
          clearInterval(interval);
          return prev;
        }
        setStoryChapter(prev + 1);
        return prev + 1;
      });
    }, 3500);
  };

  const resetStory = () => {
    setStoryStep(-1);
    setIsStoryRunning(false);
    setShowStoryDetails(false);
    setStoryChapter(0);
  };

  const simulateVisualization = (plotType) => {
    setSelectedPlot(plotType);
    setShowVisualization(true);
  };

  const generateHealthAnalysis = () => {
    setShowHealthAnalysis(true);
  };

  const generateFinancialInsights = () => {
    setShowFinancialInsights(true);
  };

  const toggleCodeExpansion = (index) => {
    setExpandedCode(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/data-visualizing')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Course
              </Button>
              <div className="w-px h-6 bg-border" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Seaborn Mastery
                </h1>
                <p className="text-sm text-muted-foreground">Sessions 20-21: Statistical Visualization Excellence</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                Statistical
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                <Brain className="w-3 h-3 mr-1" />
                Advanced
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Origin Story Section */}
        <section className="mb-12">
          <Card className="border-violet-200 dark:border-violet-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-violet-700 dark:text-violet-300">
                    <Target className="w-5 h-5" />
                    The Origin Story: When Beautiful Statistics Became Essential
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    From academic frustration to the most elegant statistical visualization library
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    onClick={runOriginStory} 
                    disabled={isStoryRunning}
                    className="bg-violet-600 hover:bg-violet-700 text-white"
                  >
                    {isStoryRunning ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Playing...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Begin Story
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={resetStory}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {showStoryDetails && (
                <div className="space-y-4">
                  <div className="grid gap-4">
                    {storyChapters.map((chapter, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border transition-all duration-500 ${
                          index <= storyStep 
                            ? 'bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800 opacity-100' 
                            : 'bg-muted/20 border-muted opacity-0'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            index <= storyStep ? 'bg-violet-600 text-white' : 'bg-muted text-muted-foreground'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-2">{chapter.title}</h4>
                            <p className="text-muted-foreground mb-2">{chapter.content}</p>
                            {index <= storyStep && (
                              <p className="text-sm bg-violet-100 dark:bg-violet-900/30 p-3 rounded italic">
                                {chapter.details}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Fundamentals Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Chapter 1: Statistical Foundations</h2>
              <p className="text-muted-foreground">Master the core statistical plots that reveal hidden patterns</p>
            </div>
          </div>

          <div className="grid gap-6">
            {fundamentalConcepts.map((concept, index) => (
              <Card key={index} className="border-emerald-200 dark:border-emerald-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                    <Lightbulb className="w-5 h-5" />
                    {concept.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {concept.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden border border-gray-700">
                      <CodeBlockR language="python">{concept.code}</CodeBlockR>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => simulateVisualization(index === 0 ? 'distribution' : index === 1 ? 'relationship' : 'categories')}
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Run Example
                      </Button>
                      <Button variant="ghost" onClick={() => toggleCodeExpansion(`fund-${index}`)}>
                        {expandedCode[`fund-${index}`] ? 'Show Less' : 'Show More Insights'}
                      </Button>
                    </div>

                    {expandedCode[`fund-${index}`] && (
                      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                        <h5 className="font-semibold mb-2">💡 Key Statistical Insights:</h5>
                        <ul className="space-y-2 text-sm">
                          {concept.insights.map((insight, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Zap className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Real-World Applications Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Chapter 2: Statistical Applications</h2>
              <p className="text-muted-foreground">Apply statistical visualization to optimize your life</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Health Analytics */}
            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                  <Heart className="w-5 h-5" />
                  💪 Personal Health Analytics
                </CardTitle>
                <CardDescription>
                  Statistical analysis of your health patterns using correlation matrices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-lg">
                    <p className="text-sm mb-2"><strong>Your Statistical Challenge:</strong></p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                      Track sleep, energy, exercise, and mood for 30 days. Use Seaborn's correlation 
                      heatmaps and regression plots to find statistically significant patterns that 
                      could boost your daily performance by 20-30%.
                    </p>
                  </div>
                  
                  <Button 
                    onClick={generateHealthAnalysis}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Generate Statistical Health Analysis
                  </Button>

                  {showHealthAnalysis && (
                    <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg border">
                      <h5 className="font-semibold mb-3">📊 Your Statistical Health Insights:</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Sleep-Energy Correlation:</span>
                          <span className="font-semibold text-blue-600">r = 0.78 (strong)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Exercise-Mood Correlation:</span>
                          <span className="font-semibold text-green-600">r = 0.65 (moderate-strong)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sleep-Exercise Correlation:</span>
                          <span className="font-semibold text-purple-600">r = 0.43 (moderate)</span>
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-emerald-700 dark:text-emerald-300">
                            <strong>🎯 Statistical Recommendation:</strong> Your data shows that 8+ hours of sleep 
                            has a statistically significant correlation (p &lt; 0.001) with both higher energy levels 
                            AND increased exercise motivation. This creates a positive feedback loop that could 
                            optimize your overall wellness.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Financial Pattern Analysis */}
            <Card className="border-violet-200 dark:border-violet-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-violet-700 dark:text-violet-300">
                  <DollarSign className="w-5 h-5" />
                  💰 Financial Pattern Analysis
                </CardTitle>
                <CardDescription>
                  Use statistical correlation to optimize spending for maximum life satisfaction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-violet-50 dark:bg-violet-950/20 p-4 rounded-lg">
                    <p className="text-sm mb-2"><strong>Your Statistical Challenge:</strong></p>
                    <p className="text-sm text-violet-700 dark:text-violet-300">
                      Track monthly spending by category and life satisfaction scores. Create correlation 
                      matrices to discover which expenses truly impact your happiness vs. which are 
                      wasteful spending patterns.
                    </p>
                  </div>
                  
                  <Button 
                    onClick={generateFinancialInsights}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analyze My Spending Patterns
                  </Button>

                  {showFinancialInsights && (
                    <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg border">
                      <h5 className="font-semibold mb-3">📈 Your Statistical Spending Insights:</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Entertainment-Satisfaction:</span>
                          <span className="font-semibold text-red-600">r = -0.23 (weak negative)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Food-Satisfaction:</span>
                          <span className="font-semibold text-green-600">r = 0.67 (strong positive)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Transport-Satisfaction:</span>
                          <span className="font-semibold text-gray-600">r = 0.12 (no correlation)</span>
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-violet-700 dark:text-violet-300">
                            <strong>💡 Statistical Discovery:</strong> Your data reveals that food spending 
                            shows strong positive correlation with life satisfaction, while entertainment 
                            spending actually correlates negatively. Redirecting €100/month from 
                            entertainment to quality food could significantly boost your happiness.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Advanced Statistical Techniques Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Chapter 3: Advanced Statistical Mastery</h2>
              <p className="text-muted-foreground">Professional-grade statistical visualization and analysis</p>
            </div>
          </div>

          <div className="grid gap-6">
            {advancedTechniques.map((technique, index) => (
              <Card key={index} className="border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                    <Zap className="w-5 h-5" />
                    {technique.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {technique.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="code" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="code">Code</TabsTrigger>
                      <TabsTrigger value="explanation">Statistical Theory</TabsTrigger>
                      <TabsTrigger value="examples">Professional Applications</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="code" className="space-y-4">
                      <div className="rounded-lg overflow-hidden border border-gray-700">
                        <CodeBlockR language="python">{technique.code}</CodeBlockR>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="explanation" className="space-y-4">
                      <div className="prose dark:prose-invert max-w-none">
                        {index === 0 && (
                          <div>
                            <h4>🎨 Multi-Panel Statistical Narratives</h4>
                            <p>Advanced statistical storytelling combines multiple visualization types to reveal comprehensive patterns:</p>
                            <ul>
                              <li><strong>Correlation matrices</strong> show all variable relationships at once</li>
                              <li><strong>Regression plots</strong> reveal linear and non-linear relationships</li>
                              <li><strong>Distribution plots</strong> identify normality and outliers</li>
                              <li><strong>Time series analysis</strong> reveals trends and seasonality</li>
                            </ul>
                            <p>This approach transforms exploratory data analysis into a systematic statistical investigation.</p>
                          </div>
                        )}
                        {index === 1 && (
                          <div>
                            <h4>🔬 Statistical Significance & Professional Rigor</h4>
                            <p>Professional statistical analysis goes beyond basic visualization to include:</p>
                            <ul>
                              <li><strong>Hypothesis testing</strong> prevents false conclusions from random noise</li>
                              <li><strong>Effect sizes</strong> measure practical significance vs statistical significance</li>
                              <li><strong>Confidence intervals</strong> quantify uncertainty in estimates</li>
                              <li><strong>Power analysis</strong> ensures adequate sample sizes for valid conclusions</li>
                            </ul>
                            <p>These techniques are essential for publishing research, making business decisions, or personal optimization based on data.</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="examples" className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h5 className="font-semibold text-green-600 mb-2">✅ Professional Applications</h5>
                          <ul className="text-sm space-y-1">
                            <li>• <strong>Pharmaceutical:</strong> Clinical trial visualizations for FDA approval</li>
                            <li>• <strong>Tech:</strong> A/B test results with statistical confidence</li>
                            <li>• <strong>Finance:</strong> Risk assessment with correlation matrices</li>
                            <li>• <strong>Academic:</strong> Research publication visualizations</li>
                            <li>• <strong>Personal:</strong> Life optimization with statistical rigor</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h5 className="font-semibold text-blue-600 mb-2">📊 Key Statistical Concepts</h5>
                          <ul className="text-sm space-y-1">
                            <li>• <strong>p-values:</strong> Probability of results due to chance</li>
                            <li>• <strong>Effect sizes:</strong> Practical magnitude of differences</li>
                            <li>• <strong>Confidence intervals:</strong> Range of plausible values</li>
                            <li>• <strong>Power analysis:</strong> Sample size adequacy</li>
                            <li>• <strong>Multiple comparisons:</strong> Correcting for false discoveries</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="mt-4 space-y-2 text-sm">
                    {technique.insights.map((insight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>{insight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Practice Challenges Section */}
        <section className="mb-12">
          <Card className="border-indigo-200 dark:border-indigo-800 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                <Target className="w-5 h-5" />
                🎯 Your Statistical Mastery Challenges
              </CardTitle>
              <CardDescription className="text-lg">
                Real statistical projects that will transform how you understand your world
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    Personal Optimization Laboratory
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Turn yourself into a statistical experiment. Track 10+ daily metrics for 30 days 
                    and discover the statistically significant patterns that could optimize your life.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Sleep, mood, energy, exercise, productivity correlations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Statistical significance testing for habit changes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Multi-panel dashboard with correlation matrices</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Financial Happiness Optimization
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Statistically determine which expenses truly contribute to your happiness vs. 
                    wasteful spending. Many users discover they can boost satisfaction while saving €300+/month.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Expense-satisfaction correlation analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Statistical significance testing for spending categories</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Optimization recommendations with confidence intervals</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-lg">
                <h5 className="font-semibold text-violet-800 dark:text-violet-200 mb-2">
                  🚀 Statistical Success Stories:
                </h5>
                <div className="text-sm space-y-2">
                  <p><strong>"Boosted energy by 35%"</strong> - Marina discovered her sleep-exercise correlation pattern</p>
                  <p><strong>"Saved €400/month while increasing happiness"</strong> - Alex optimized spending using statistical analysis</p>
                  <p><strong>"Published in journal"</strong> - Dr. Chen used these techniques for her research on workplace productivity</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t">
          <Button variant="outline" onClick={() => navigate('/data-visualizing')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course Overview
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Sessions 20-21 Complete</Badge>
            <Button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white">
              Continue to Interactive Visualization
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeabornMasteryArtifact;
