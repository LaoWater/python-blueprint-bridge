import React, { useState, useEffect } from 'react';
import { useContent } from '../components/ContentProvider';
import { useNavigate } from 'react-router-dom';
import EditablePageHeader from '../components/EditablePageHeader';
import EditableContent from '../components/EditableContent';
import EditableCodeBlock from '../components/EditableCodeBlock';
import TableOfContents from '../components/TableOfContents';
import CourseNavigation from '../components/CourseNavigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Calculator, Zap, TrendingUp, ChevronRight, Play, CheckCircle2, Brain, BarChart3, Target, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dataCalculusHero from '@/assets/data-calculus-landscape.jpg';

const DataCalculus = () => {
  const { getContent, loading } = useContent();
  const navigate = useNavigate();
  
  const [tocItems] = useState([
    { id: 'journey-begins', title: 'The Data Journey Begins', sessions: 'Introduction' },
    { id: 'data-structures', title: 'Data Structures & Algorithms', sessions: 'Sessions 9-12' },
    { id: 'numerical-computing', title: 'Numerical Computing & Analysis', sessions: 'Sessions 13-17' },
    { id: 'ai-foundations', title: 'Foundations for AI', sessions: 'Theory & Practice' },
    { id: 'newton-legacy', title: 'Newton\'s Legacy', sessions: 'Historical Perspective' }
  ]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const dataStructuresContent = {
    session9: getContent('data-calculus', 'session-9'),
    session10: getContent('data-calculus', 'session-10'),
    session11: getContent('data-calculus', 'session-11'),
    session12: getContent('data-calculus', 'session-12'),
  };

  const numericalContent = {
    session13: getContent('data-calculus', 'session-13'),
    session14: getContent('data-calculus', 'session-14'),
    session15: getContent('data-calculus', 'session-15'),
    session16: getContent('data-calculus', 'session-16'),
    session17: getContent('data-calculus', 'session-17'),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section with Background Image */}
      <div className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${dataCalculusHero})`,
            filter: 'brightness(0.3) contrast(1.2)',
          }}
        />
        
        {/* Gradient Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent dark:from-black/70 dark:via-black/50 dark:to-black/20" />
        
        {/* Additional overlay for theme adaptation */}
        <div className="absolute inset-0 bg-background/10 dark:bg-background/5" />
        
        {/* Content with forced white text */}
        <div className="relative z-10 [&_*]:!text-white [&_*]:!text-opacity-100">
          <EditablePageHeader 
            page="data-calculus"
            defaultTitle="Data: Calculus" 
            defaultSubtitle="From data structures to numerical computing - building the foundation for AI"
          />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Main content - Keep wide and clean */}
        <div className="flex-grow min-w-0 max-w-none">
          
          {/* The Journey Continues */}
          <section id="journey-begins" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">The Data Journey Begins</h2>
                <p className="text-muted-foreground">From Python foundations to the mathematics that powers AI</p>
              </div>
            </div>

            {/* The Philosophy */}
            <Card className="border-emerald-200 dark:border-emerald-800 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                  <Brain className="w-5 h-5" />
                  Bridging Logic and Mathematics
                </CardTitle>
                <CardDescription className="text-lg">
                  Every algorithm tells a story. Every data structure solves a real-world problem. Every mathematical operation brings us closer to artificial intelligence.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-foreground leading-relaxed">
                    Now that you understand Python's language and soul, we embark on the next chapter: 
                    <strong className="text-emerald-600 dark:text-emerald-400"> transforming data into intelligence</strong>. 
                  </p>
                  
                  <p className="text-muted-foreground">
                    In the world of modern systems, data is the new oil, and algorithms are the refineries that transform 
                    raw information into actionable insights. From managing millions of user sessions to training AI models 
                    that recognize patterns, we'll explore how Python's ecosystem enables these transformations.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <Database className="w-8 h-8 text-blue-600 mb-2" />
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200">Data Structures</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">Organizing information efficiently</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                      <Calculator className="w-8 h-8 text-purple-600 mb-2" />
                      <h4 className="font-semibold text-purple-800 dark:text-purple-200">Numerical Computing</h4>
                      <p className="text-sm text-purple-700 dark:text-purple-300">Mathematical operations at scale</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                      <Brain className="w-8 h-8 text-amber-600 mb-2" />
                      <h4 className="font-semibold text-amber-800 dark:text-amber-200">AI Foundations</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-300">Building towards intelligence</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Data Structures & Algorithms */}
          <section id="data-structures" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Data Structures & Algorithms</h2>
                <p className="text-muted-foreground">The building blocks of efficient software systems</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Session 9 - Essential Data Structures */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="mb-2">Session 9</Badge>
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Database className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors">
                    Essential Data Structures in Python
                  </CardTitle>
                  <CardDescription>
                    From lists to graphs - understanding when and how to organize data for maximum efficiency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/artifacts/data-structures')}
                      className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20"
                    >
                      <ChevronRight className="w-4 h-4 mr-1" />
                      Open Artifact
                    </Button>
                  </div>
                  
                  <details className="cursor-pointer">
                    <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                      Real-World Scenario: Social Media Feed
                    </summary>
                    <EditableCodeBlock
                      title="Building a Social Media Feed System"
                      page="data-calculus"
                      section="session-9"
                      code={`# Real-world scenario: Building a social media feed
# Challenge: Display posts from friends efficiently

from collections import deque, defaultdict
from datetime import datetime, timedelta
import heapq
import uuid

class SocialMediaFeed:
    """
    A real social media feed system demonstrating 
    different data structures for different needs
    """
    
    def __init__(self):
        # List: For ordered timeline (insertion order matters)
        self.user_timeline = []
        
        # Deque: For efficient adding/removing from both ends
        self.recent_notifications = deque(maxlen=50)
        
        # Dict: For O(1) user lookups
        self.users = {}
        
        # Set: For unique followers (no duplicates)
        self.followers = set()
        
        # Priority Queue: For trending posts
        self.trending_posts = []
        
        # Graph: For friend connections
        self.friend_network = defaultdict(set)
    
    def add_post(self, user_id, content, timestamp=None):
        """Add a post to the timeline - why use a list?"""
        post = {
            'user_id': user_id,
            'content': content,
            'timestamp': timestamp or datetime.now(),
            'likes': 0,
            'engagement_score': 0
        }
        
        # List is perfect here: we need ordered insertion
        # and will iterate from newest to oldest
        self.user_timeline.append(post)
        
        # Add to trending if high engagement potential
        if len(content) > 100:  # Longer posts might trend
            unique_id = uuid.uuid4()
            heapq.heappush(self.trending_posts, 
                          (-post['engagement_score'], unique_id, post))

    def add_notification(self, message):
        """Add notification - why use deque?"""
        # Deque automatically removes old notifications
        # when we exceed maxlen (50). Perfect for recent notifications!
        self.recent_notifications.append({
            'message': message,
            'timestamp': datetime.now()
        })

    def add_friend(self, user1, user2):
        """Add friendship - why use a graph structure?"""
        # Social networks are graphs by nature!
        # Each person is a node, friendships are edges
        self.friend_network[user1].add(user2)
        self.friend_network[user2].add(user1)  # Bidirectional

    def get_mutual_friends(self, user1, user2):
        """Find mutual friends - set intersection is perfect here"""
        friends1 = self.friend_network[user1]
        friends2 = self.friend_network[user2]
        
        # Set intersection: O(min(len(friends1), len(friends2)))
        return friends1 & friends2

    def get_feed_for_user(self, user_id, limit=20):
        """Generate personalized feed"""
        user_friends = self.friend_network[user_id]
        
        # Filter posts from friends and sort by timestamp
        friend_posts = [
            post for post in self.user_timeline 
            if post['user_id'] in user_friends
        ]
        
        # Sort by timestamp (newest first) and limit
        return sorted(friend_posts, 
                     key=lambda p: p['timestamp'], 
                     reverse=True)[:limit]

# Usage: Real social media operations
feed = SocialMediaFeed()

# Add some users and connections
feed.add_friend("alice", "bob")
feed.add_friend("alice", "charlie")
feed.add_friend("bob", "charlie")

# Add posts
feed.add_post("bob", "Just finished reading about Python data structures!")
feed.add_post("charlie", "Building my first social media algorithm 🚀")

# Get Alice's personalized feed
alice_feed = feed.get_feed_for_user("alice")
print(f"Alice sees {len(alice_feed)} posts from friends")

# Find mutual friends
mutual = feed.get_mutual_friends("alice", "bob")
print(f"Alice and Bob have {len(mutual)} mutual friends")`}
                      language="python"
                    />
                  </details>
                </CardContent>
              </Card>

              {/* Session 10 - Advanced Algorithms */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="mb-2">Session 10</Badge>
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-purple-600" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-purple-600 transition-colors">
                    Advanced Algorithms & Optimization
                  </CardTitle>
                  <CardDescription>
                    Solving complex problems efficiently - from sorting millions of records to pathfinding
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/artifacts/advanced-algorithms')}
                      className="text-purple-600 border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/20"
                    >
                      <ChevronRight className="w-4 h-4 mr-1" />
                      Open Artifact
                    </Button>
                  </div>
                  
                  <details className="cursor-pointer">
                    <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                      Real-World Scenario: Delivery Route Optimization
                    </summary>
                    <EditableCodeBlock
                      title="Optimizing Delivery Routes"
                      page="data-calculus"
                      section="session-10"
                      code={`# Real-world scenario: Optimizing delivery routes
# Challenge: Find the most efficient path for delivery drivers

import heapq
from collections import defaultdict
import math

class DeliveryOptimizer:
    """
    A delivery route optimization system demonstrating
    advanced algorithms in real-world applications
    """
    
    def __init__(self):
        # Graph representing the city road network
        self.road_network = defaultdict(dict)
        self.delivery_points = {}
        
    def add_road(self, point_a, point_b, distance, traffic_factor=1.0):
        """Add a road between two points with distance and traffic"""
        # Weighted graph - distance affected by traffic
        actual_time = distance * traffic_factor
        
        self.road_network[point_a][point_b] = actual_time
        self.road_network[point_b][point_a] = actual_time  # Bidirectional
    
    def add_delivery_point(self, point_id, address, priority=1):
        """Add a delivery destination with priority"""
        self.delivery_points[point_id] = {
            'address': address,
            'priority': priority,  # Higher = more urgent
            'delivered': False
        }
    
    def dijkstra_shortest_path(self, start, end):
        """
        Dijkstra's algorithm for shortest path
        Used by logistics companies like UPS, FedEx
        """
        # Priority queue: (distance, current_node, path)
        pq = [(0, start, [start])]
        visited = set()
        
        while pq:
            current_dist, current_node, path = heapq.heappop(pq)
            
            if current_node in visited:
                continue
                
            visited.add(current_node)
            
            if current_node == end:
                return current_dist, path
            
            # Explore neighbors
            for neighbor, weight in self.road_network[current_node].items():
                if neighbor not in visited:
                    new_dist = current_dist + weight
                    new_path = path + [neighbor]
                    heapq.heappush(pq, (new_dist, neighbor, new_path))
        
        return float('inf'), []  # No path found
    
    def optimize_delivery_route(self, depot, max_deliveries=10):
        """
        Greedy algorithm for vehicle routing problem (VRP)
        A simplified version of what Amazon uses
        """
        undelivered = [
            point_id for point_id, info in self.delivery_points.items()
            if not info['delivered']
        ]
        
        # Sort by priority (highest first)
        undelivered.sort(
            key=lambda p: self.delivery_points[p]['priority'], 
            reverse=True
        )
        
        # Select top priority deliveries within limit
        selected_deliveries = undelivered[:max_deliveries]
        
        # Greedy route construction: always go to nearest unvisited
        route = [depot]
        current_location = depot
        remaining_deliveries = set(selected_deliveries)
        total_distance = 0
        
        while remaining_deliveries:
            # Find nearest undelivered point
            nearest_point = None
            nearest_distance = float('inf')
            
            for delivery_point in remaining_deliveries:
                distance, _ = self.dijkstra_shortest_path(
                    current_location, delivery_point
                )
                
                if distance < nearest_distance:
                    nearest_distance = distance
                    nearest_point = delivery_point
            
            if nearest_point:
                route.append(nearest_point)
                current_location = nearest_point
                total_distance += nearest_distance
                remaining_deliveries.remove(nearest_point)
        
        # Return to depot
        distance_home, _ = self.dijkstra_shortest_path(current_location, depot)
        total_distance += distance_home
        route.append(depot)
        
        return route, total_distance
    
    def analyze_route_efficiency(self, route):
        """Analyze the efficiency of a route"""
        total_time = 0
        route_details = []
        
        for i in range(len(route) - 1):
            current = route[i]
            next_point = route[i + 1]
            
            distance, path = self.dijkstra_shortest_path(current, next_point)
            total_time += distance
            
            route_details.append({
                'from': current,
                'to': next_point,
                'distance': distance,
                'path': path
            })
        
        return {
            'total_time': total_time,
            'num_stops': len(route) - 2,  # Exclude depot start/end
            'avg_time_per_stop': total_time / max(1, len(route) - 2),
            'details': route_details
        }

# Usage: Real delivery optimization
optimizer = DeliveryOptimizer()

# Build city road network (simplified)
optimizer.add_road("depot", "residential_a", 5.0, 1.2)  # Traffic factor
optimizer.add_road("depot", "commercial_b", 3.0, 1.5)
optimizer.add_road("residential_a", "residential_c", 2.0, 1.0)
optimizer.add_road("commercial_b", "residential_c", 4.0, 1.1)
optimizer.add_road("commercial_b", "industrial_d", 6.0, 2.0)  # Heavy traffic

# Add delivery points with priorities
optimizer.add_delivery_point("residential_a", "123 Main St", priority=3)
optimizer.add_delivery_point("residential_c", "456 Oak Ave", priority=1)
optimizer.add_delivery_point("commercial_b", "789 Business Blvd", priority=2)

# Optimize route
optimal_route, total_distance = optimizer.optimize_delivery_route("depot")
print(f"Optimal route: {' -> '.join(optimal_route)}")
print(f"Total distance: {total_distance:.2f} units")

# Analyze efficiency
analysis = optimizer.analyze_route_efficiency(optimal_route)
print(f"Average time per stop: {analysis['avg_time_per_stop']:.2f} units")`}
                      language="python"
                    />
                  </details>
                </CardContent>
              </Card>

              {/* Session 11 - Hashing */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="mb-2">Session 11</Badge>
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <Target className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-green-600 transition-colors">
                    Hashing & Optimized Structures
                  </CardTitle>
                  <CardDescription>
                    Lightning-fast lookups and data integrity - the backbone of modern databases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/artifacts/hashing')}
                      className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-950/20"
                    >
                      <ChevronRight className="w-4 h-4 mr-1" />
                      Open Artifact
                    </Button>
                  </div>
                  
                  <details className="cursor-pointer">
                    <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                      Real-World Scenario: User Authentication System
                    </summary>
                    <EditableCodeBlock
                      title="Secure User Authentication with Hashing"
                      page="data-calculus"
                      section="session-11"
                      code={`# Real-world scenario: Secure user authentication
# Challenge: Store passwords securely and enable fast user lookups

import hashlib
import secrets
import time
from collections import defaultdict

class SecureUserDatabase:
    """
    A production-ready user authentication system
    demonstrating advanced hashing techniques
    """
    
    def __init__(self):
        # Hash table for O(1) user lookups
        self.users = {}
        
        # Bloom filter simulation for quick "user exists" checks
        self.user_bloom_filter = set()
        
        # Rate limiting using hashing
        self.login_attempts = defaultdict(list)
        
    def _generate_salt(self):
        """Generate a random salt for password hashing"""
        return secrets.token_hex(32)
    
    def _hash_password(self, password, salt):
        """
        Secure password hashing using PBKDF2
        Used by companies like Dropbox, 1Password
        """
        # PBKDF2 with SHA-256: computationally expensive by design
        return hashlib.pbkdf2_hmac(
            'sha256',
            password.encode('utf-8'),
            salt.encode('utf-8'),
            100000  # 100,000 iterations - makes brute force attacks slow
        ).hex()
    
    def register_user(self, username, password, email):
        """Register a new user with secure password storage"""
        if self.user_exists(username):
            return False, "User already exists"
        
        # Generate unique salt for this user
        salt = self._generate_salt()
        
        # Hash the password with salt
        password_hash = self._hash_password(password, salt)
        
        # Store user data
        user_data = {
            'username': username,
            'email': email,
            'password_hash': password_hash,
            'salt': salt,
            'created_at': time.time(),
            'last_login': None,
            'login_count': 0
        }
        
        # Hash table storage: O(1) lookup by username
        self.users[username] = user_data
        
        # Add to bloom filter for quick existence checks
        self.user_bloom_filter.add(username)
        
        return True, "User registered successfully"
    
    def user_exists(self, username):
        """
        Quick user existence check using bloom filter concept
        In production, use actual bloom filters for massive scale
        """
        # First check bloom filter (super fast)
        if username not in self.user_bloom_filter:
            return False  # Definitely doesn't exist
        
        # Then check actual hash table (still fast)
        return username in self.users
    
    def authenticate_user(self, username, password, ip_address=None):
        """
        Authenticate user with rate limiting
        Demonstrates how hash tables enable security features
        """
        # Rate limiting check
        if ip_address and self._is_rate_limited(ip_address):
            return False, "Too many login attempts. Try again later."
        
        # Quick existence check
        if not self.user_exists(username):
            self._record_login_attempt(ip_address, False)
            return False, "Invalid credentials"
        
        user_data = self.users[username]
        
        # Hash the provided password with stored salt
        provided_hash = self._hash_password(password, user_data['salt'])
        
        # Constant-time comparison (prevents timing attacks)
        if secrets.compare_digest(provided_hash, user_data['password_hash']):
            # Update login statistics
            user_data['last_login'] = time.time()
            user_data['login_count'] += 1
            self._record_login_attempt(ip_address, True)
            
            return True, "Authentication successful"
        else:
            self._record_login_attempt(ip_address, False)
            return False, "Invalid credentials"
    
    def _is_rate_limited(self, ip_address, max_attempts=5, window_seconds=300):
        """Rate limiting using time-based hashing"""
        current_time = time.time()
        attempts = self.login_attempts[ip_address]
        
        # Remove old attempts outside the time window
        self.login_attempts[ip_address] = [
            attempt_time for attempt_time in attempts
            if current_time - attempt_time < window_seconds
        ]
        
        return len(self.login_attempts[ip_address]) >= max_attempts
    
    def _record_login_attempt(self, ip_address, success):
        """Record login attempt for rate limiting"""
        if ip_address:
            current_time = time.time()
            if not success:  # Only count failed attempts
                self.login_attempts[ip_address].append(current_time)
    
    def get_user_stats(self):
        """Get database statistics using hash table properties"""
        total_users = len(self.users)
        active_users = sum(
            1 for user in self.users.values()
            if user['last_login'] and 
            time.time() - user['last_login'] < 86400  # Last 24 hours
        )
        
        return {
            'total_users': total_users,
            'active_users_24h': active_users,
            'hash_table_load_factor': len(self.users) / (len(self.users) + 100),
            'avg_login_count': sum(u['login_count'] for u in self.users.values()) / max(1, total_users)
        }

# Usage: Real authentication system
auth_db = SecureUserDatabase()

# Register users
success, msg = auth_db.register_user("alice", "secure_password_123", "alice@example.com")
print(f"Registration: {msg}")

success, msg = auth_db.register_user("bob", "another_password_456", "bob@example.com")
print(f"Registration: {msg}")

# Authenticate users
success, msg = auth_db.authenticate_user("alice", "secure_password_123", "192.168.1.100")
print(f"Login Alice: {msg}")

success, msg = auth_db.authenticate_user("alice", "wrong_password", "192.168.1.100")
print(f"Wrong password: {msg}")

# Check system statistics
stats = auth_db.get_user_stats()
print(f"System stats: {stats}")

# Demonstrate rate limiting
for i in range(6):  # Try 6 failed logins
    success, msg = auth_db.authenticate_user("alice", "wrong", "192.168.1.200")
    print(f"Attempt {i+1}: {msg}")`}
                      language="python"
                    />
                  </details>
                </CardContent>
              </Card>

              {/* Session 12 - Caching */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="mb-2">Session 12</Badge>
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-orange-600" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-orange-600 transition-colors">
                    Caching & Intelligent Memory Systems
                  </CardTitle>
                  <CardDescription>
                    LRU caches and smart memory management - making applications lightning fast
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/artifacts/memory-optimization')}
                      className="text-orange-600 border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/20"
                    >
                      <ChevronRight className="w-4 h-4 mr-1" />
                      Open Artifact
                    </Button>
                  </div>
                  
                  <details className="cursor-pointer">
                    <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                      Real-World Scenario: CDN Cache System
                    </summary>
                    <EditableCodeBlock
                      title="Building a Content Delivery Network Cache"
                      page="data-calculus"
                      section="session-12"
                      code={`# Real-world scenario: CDN (Content Delivery Network) Cache
# Challenge: Cache web content efficiently across global servers

from collections import OrderedDict
import time
import threading
from functools import wraps

class LRUCache:
    """
    LRU (Least Recently Used) Cache implementation
    Used by Redis, CDNs, operating systems, and web browsers
    """
    
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()  # Maintains insertion order
        self.lock = threading.Lock()  # Thread-safe operations
        
        # Statistics for monitoring
        self.hits = 0
        self.misses = 0
        self.evictions = 0
    
    def get(self, key):
        """Get value and mark as recently used"""
        with self.lock:
            if key in self.cache:
                # Move to end (most recently used)
                value = self.cache.pop(key)
                self.cache[key] = value
                self.hits += 1
                return value
            else:
                self.misses += 1
                return None
    
    def put(self, key, value):
        """Add/update value and manage capacity"""
        with self.lock:
            if key in self.cache:
                # Update existing key
                self.cache.pop(key)
            elif len(self.cache) >= self.capacity:
                # Evict least recently used item
                self.cache.popitem(last=False)  # Remove first (oldest)
                self.evictions += 1
            
            # Add new item (most recently used)
            self.cache[key] = value
    
    def get_stats(self):
        """Get cache performance statistics"""
        total_requests = self.hits + self.misses
        hit_rate = (self.hits / total_requests * 100) if total_requests > 0 else 0
        
        return {
            'hits': self.hits,
            'misses': self.misses,
            'evictions': self.evictions,
            'hit_rate': f"{hit_rate:.2f}%",
            'current_size': len(self.cache),
            'capacity': self.capacity
        }

class CDNServer:
    """
    Content Delivery Network server with intelligent caching
    Demonstrates multi-level caching like Cloudflare, AWS CloudFront
    """
    
    def __init__(self, location, cache_size=1000):
        self.location = location
        self.cache = LRUCache(cache_size)
        
        # Different cache TTLs for different content types
        self.ttl_policies = {
            'image': 86400,      # 24 hours
            'css': 3600,         # 1 hour
            'html': 300,         # 5 minutes
            'api': 60,           # 1 minute
            'video': 604800      # 1 week
        }
        
        # Simulate network latency to origin server
        self.origin_latency = 200  # ms
    
    def _get_content_type(self, url):
        """Determine content type from URL"""
        if url.endswith(('.jpg', '.png', '.gif', '.webp')):
            return 'image'
        elif url.endswith('.css'):
            return 'css'
        elif url.endswith('.html'):
            return 'html'
        elif '/api/' in url:
            return 'api'
        elif url.endswith(('.mp4', '.avi', '.mov')):
            return 'video'
        else:
            return 'html'  # Default
    
    def _fetch_from_origin(self, url):
        """Simulate fetching from origin server"""
        # Simulate network delay
        time.sleep(self.origin_latency / 1000)  # Convert ms to seconds
        
        # Generate mock content based on URL
        content_type = self._get_content_type(url)
        mock_content = {
            'url': url,
            'content': f"Content for {url}",
            'type': content_type,
            'size': len(url) * 100,  # Mock size
            'fetched_at': time.time(),
            'origin_server': 'origin.example.com'
        }
        
        return mock_content
    
    def _is_content_fresh(self, cached_content):
        """Check if cached content is still fresh"""
        content_type = cached_content['type']
        ttl = self.ttl_policies.get(content_type, 300)
        
        age = time.time() - cached_content['fetched_at']
        return age < ttl
    
    def serve_content(self, url):
        """
        Serve content with intelligent caching
        This is how CDNs like Cloudflare actually work
        """
        start_time = time.time()
        
        # Try to get from cache first
        cached_content = self.cache.get(url)
        
        if cached_content and self._is_content_fresh(cached_content):
            # Cache hit with fresh content
            response_time = (time.time() - start_time) * 1000  # ms
            
            return {
                'content': cached_content,
                'cache_status': 'HIT',
                'response_time_ms': response_time,
                'served_from': self.location
            }
        
        else:
            # Cache miss or stale content - fetch from origin
            fresh_content = self._fetch_from_origin(url)
            
            # Cache the fresh content
            self.cache.put(url, fresh_content)
            
            response_time = (time.time() - start_time) * 1000  # ms
            
            return {
                'content': fresh_content,
                'cache_status': 'MISS' if not cached_content else 'STALE',
                'response_time_ms': response_time,
                'served_from': self.location
            }
    
    def get_cache_analytics(self):
        """Get detailed cache performance analytics"""
        stats = self.cache.get_stats()
        stats['location'] = self.location
        stats['ttl_policies'] = self.ttl_policies
        
        return stats

def cache_decorator(cache_instance, ttl=300):
    """
    Function decorator for caching
    Used in web frameworks like Flask, Django
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Create cache key from function name and arguments
            cache_key = f"{func.__name__}:{str(args)}:{str(kwargs)}"
            
            # Try to get from cache
            cached_result = cache_instance.get(cache_key)
            if cached_result:
                cached_value, timestamp = cached_result
                if time.time() - timestamp < ttl:
                    return cached_value
            
            # Execute function and cache result
            result = func(*args, **kwargs)
            cache_instance.put(cache_key, (result, time.time()))
            
            return result
        return wrapper
    return decorator

# Usage: Real CDN simulation
# Simulate CDN servers in different locations
us_server = CDNServer("US-East", cache_size=500)
eu_server = CDNServer("EU-West", cache_size=500)
asia_server = CDNServer("Asia-Pacific", cache_size=300)

# Simulate user requests
urls = [
    "https://example.com/index.html",
    "https://example.com/styles.css",
    "https://example.com/image.jpg",
    "https://example.com/api/users",
    "https://example.com/video.mp4"
]

print("=== CDN Cache Performance Simulation ===")

# Simulate multiple requests to show cache behavior
for i in range(3):
    print(f"\\n--- Request Round {i+1} ---")
    for url in urls:
        response = us_server.serve_content(url)
        print(f"{url}: {response['cache_status']} ({response['response_time_ms']:.1f}ms)")

# Show cache analytics
print("\\n=== Cache Analytics ===")
analytics = us_server.get_cache_analytics()
for key, value in analytics.items():
    print(f"{key}: {value}")

# Demonstrate function caching
function_cache = LRUCache(100)

@cache_decorator(function_cache, ttl=60)
def expensive_calculation(n):
    """Simulate expensive computation"""
    time.sleep(0.1)  # Simulate work
    return sum(i * i for i in range(n))

# First call: slow (cache miss)
start = time.time()
result1 = expensive_calculation(1000)
time1 = time.time() - start

# Second call: fast (cache hit)
start = time.time()
result2 = expensive_calculation(1000)
time2 = time.time() - start

print(f"\\n=== Function Caching Demo ===")
print(f"First call: {time1:.3f}s (cache miss)")
print(f"Second call: {time2:.3f}s (cache hit)")
print(f"Speedup: {time1/time2:.1f}x faster")`}
                      language="python"
                    />
                  </details>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Numerical Computing & Analysis */}
          <section id="numerical-computing" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Numerical Computing & Data Analysis</h2>
                <p className="text-muted-foreground">From NumPy arrays to Pandas DataFrames - the foundation of data science</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* NumPy Sessions */}
              <div className="space-y-6">
                <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-indigo-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="mb-2">Session 13-14</Badge>
                      <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                        <Calculator className="w-4 h-4 text-indigo-600" />
                      </div>
                    </div>
                    <CardTitle className="group-hover:text-indigo-600 transition-colors">
                      NumPy: Intro
                    </CardTitle>
                    <CardDescription>
                      Complete guide to numerical computing - arrays, operations, and performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <details className="cursor-pointer">
                      <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                        🌌 Session 13: Gateway către NumPy - De la liste naive la calcule care mișcă lumea
                      </summary>
                      <EditableCodeBlock
                        title="Povestea Originilor și Prima Întâlnire cu NumPy"
                        page="data-calculus"
                        section="session-13"
                        code={`"""
🧠 1. POVESTEA ORIGINILOR - Anul 2000: Când Python întâlnește știința

Imaginează-te în anul 2000: biologii analizează secvențe ADN, fizicienii 
studiază date de la telescoape, economiștii procesează piețe financiare...
Toți folosesc Python pentru că e simplu și intuitiv.

Dar când trebuie să analizeze MILIOANE de puncte de date?
→ Listele Python explodează în slow motion! 🐌

Travis Oliphant și comunitatea vin cu un hack genial: un singur tip de 
cutie pentru date numerice, stocate compact, cu operații vectorizate 
scrise în C.

Rezultatul? NumPy — nervul central al întregii științe în Python.
"""

# Să demonstrăm problema: Lista Python vs. realitatea științei
import time
import sys

print("=== PROBLEMA LISTELOR PYTHON CU DATE MASIVE ===")

# Simularea unor date astronomice - poziții de stele
stars_python_list = []
for i in range(100000):  # 100k stele (versiune redusă pentru demo)
    x = i * 0.1
    y = i * 0.2  
    z = i * 0.3
    stars_python_list.append([x, y, z])

# Încercăm să calculăm distanța medie de la centrul galaxiei
start_time = time.time()

total_distance = 0
for star in stars_python_list:
    # Distanța euclidiană: sqrt(x² + y² + z²)
    distance = (star[0]**2 + star[1]**2 + star[2]**2) ** 0.5
    total_distance += distance

avg_distance_list = total_distance / len(stars_python_list)
list_time = time.time() - start_time

print(f"Lista Python:")
print(f"  Timpul de calcul: {list_time:.3f} secunde")
print(f"  Memoria: {sys.getsizeof(stars_python_list) / 1024 / 1024:.1f} MB")
print(f"  Distanța medie: {avg_distance_list:.2f}")

"""
💡 CONEXIUNEA REALĂ: 
Fiecare imagine medicală (CT, RMN) = matrice de milioane de pixeli
Fiecare rețea neuronală = milioane/miliarde de parametri  
Fiecare analiză de Big Data = datasets cu terabytes

Diferența dintre secunde și millisecunde = 
ani de viață salvați într-un laborator medical!
"""

print("\\n=== SALVAREA: NUMPY INTRĂ ÎN SCENĂ ===")

import numpy as np

# Același calcul cu NumPy
stars_numpy = np.random.rand(100000, 3) * [1000, 2000, 3000]

start_time = time.time()

# O singură linie face ceea ce bucla Python făcea în 100000 de pași!
distances = np.sqrt(np.sum(stars_numpy**2, axis=1))
avg_distance_numpy = np.mean(distances)

numpy_time = time.time() - start_time

print(f"NumPy:")
print(f"  Timpul de calcul: {numpy_time:.3f} secunde")
print(f"  Memoria: {stars_numpy.nbytes / 1024 / 1024:.1f} MB")  
print(f"  Distanța medie: {avg_distance_numpy:.2f}")
print(f"  SPEEDUP: {list_time/numpy_time:.1f}x mai rapid!")

"""
🧭 2. DE LA LISTE LA REALITATE - Ce face NumPy special?

Un array NumPy nu e doar "o listă mai rapidă". Este:
- COMPACT ca un fișier .zip (date stocate eficient)
- RIGID ca o matrice matematică (un singur tip de date)  
- MALEABIL ca plastilina (reshape, slice, broadcast)
- VECTORIZAT (operațiile se aplică pe întreg array-ul odată)
"""

print("\\n=== ANATOMIA UNUI ARRAY NUMPY ===")

# Lista Python - fiecare element e un obiect separat
python_list = [1, 2, 3, 4, 5]
print(f"Lista Python: {python_list}")
print(f"  Fiecare element e un obiect Python separat")
print(f"  Tip: {type(python_list[0])}")

# Array NumPy - date continue în memorie  
numpy_array = np.array([1, 2, 3, 4, 5])
print(f"\\nArray NumPy: {numpy_array}")
print(f"  Tipul de date: {numpy_array.dtype}")
print(f"  Forma: {numpy_array.shape}")
print(f"  Dimensiuni: {numpy_array.ndim}D")
print(f"  Total bytes: {numpy_array.nbytes}")

"""
🔬 3. PRIMUL CONTACT CU DIMENSIUNI

1D = semnal audio (vector de amplitudini în timp)
2D = imagine alb-negru (matrice de pixeli)  
3D = imagine color (RGB - 3 canale de culoare)
4D = batch de imagini pentru AI (multe imagini simultan)
"""

print("\\n=== DIMENSIUNILE NUMPY ===")

# 1D: Semnalul cardiac al unui pacient
heartbeat = np.array([72, 75, 78, 74, 71, 73, 76, 79])
print(f"1D - Puls cardiac: {heartbeat} BPM")
print(f"     Forma: {heartbeat.shape}")

# 2D: Temperatura într-o cameră (senzori pe grilă 4x4)
room_temp = np.array([
    [22.5, 23.1, 22.8, 22.9],
    [22.7, 24.2, 23.5, 23.1], 
    [22.4, 23.8, 24.1, 23.6],
    [22.1, 23.2, 23.4, 22.8]
])
print(f"\\n2D - Temperaturi cameră:")
print(room_temp)
print(f"     Forma: {room_temp.shape}")
print(f"     Media: {np.mean(room_temp):.1f}°C")

# 3D: Imagine RGB
rgb_image = np.random.randint(0, 256, (8, 8, 3))  # 8x8 mini-imagine
print(f"\\n3D - Imagine RGB: {rgb_image.shape}")
print(f"     8x8 pixeli, fiecare cu 3 culori (R,G,B)")

# 4D: Batch pentru AI
batch_images = np.random.rand(4, 8, 8, 3)  # 4 imagini mici
print(f"\\n4D - Batch AI: {batch_images.shape}")
print(f"     4 imagini pentru antrenarea unei rețele neuronale")

"""
⚡ 4. OPERAȚII CARE SCHIMBĂ SCARA

NumPy oferă funcții specializate pentru domenii întregi:
- np.fft → transformate Fourier (audio, telecomunicații)
- np.linalg → algebra liniară (baza AI-ului)  
- np.random → simulări Monte Carlo
"""

print("\\n=== OPERAȚII CARE MIȘCĂ LUMEA ===")

# FFT: Analiza frecvențelor
sample_rate = 100
time = np.linspace(0, 1, sample_rate)
# Semnal cu două frecvențe
signal = np.sin(2 * np.pi * 5 * time) + 0.5 * np.sin(2 * np.pi * 12 * time)

fft_result = np.fft.fft(signal)
frequencies = np.fft.fftfreq(len(signal), 1/sample_rate)

print("FFT - Analiza frecvențelor:")
print(f"  Puncte semnal: {len(signal)}")
print(f"  Frecvențe detectate în top 5: {frequencies[1:6]} Hz")
print(f"  → Folosit în: compresia MP3, detectarea vocii")

# Algebra liniară: Sistem de ecuații
A = np.array([[2, 1], [1, 3]])
b = np.array([3, 4])
x = np.linalg.solve(A, b)

print(f"\\nAlgebra liniară:")
print(f"  Sistem Ax = b rezolvat: x = {x}")
print(f"  Verificare: Ax = {np.dot(A, x)} (= b)")
print(f"  → Baza pentru: rețele neuronale, grafică 3D")

# Monte Carlo: Estimarea π
n_points = 10000
points = np.random.uniform(-1, 1, (n_points, 2))
inside_circle = np.sum(points[:, 0]**2 + points[:, 1]**2 <= 1)
pi_estimate = 4 * inside_circle / n_points

print(f"\\nMonte Carlo - Estimarea π:")
print(f"  π estimat: {pi_estimate:.4f}")
print(f"  π real: {np.pi:.4f}")
print(f"  → Folosit în: modelarea riscurilor financiare")

print("\\n" + "="*50)
print("🎓 Session 13 - NumPy Gateway completată!")
print("="*50)
print("\\n💡 AI urmează: cu aceste fundamente NumPy,")
print("   ești gata să construiești rețele neuronale!")
`}
                        language="python"
                      />
                    </details>
                    
                    <div className="mt-4">
                      <details className="cursor-pointer">
                        <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                          🌀 Broadcasting și Exerciții Practice - Aplicații în lumea reală
                        </summary>
                        <EditableCodeBlock
                          title="Broadcasting Magic și Scenarii Practice"
                          page="data-calculus"
                          section="session-13-advanced"
                          code={`"""
🌀 5. BROADCASTING CA SUPERPUTERE

Broadcasting = capacitatea NumPy de a efectua operații între array-uri
de forme diferite, fără să copieze datele.

Este motivul pentru care poți:
- Adăuga un vector la fiecare imagine într-un batch
- Ajusta luminozitatea unei poze cu arr + 50
- Simula simultan mii de traiectorii de particule
"""

import numpy as np

print("=== BROADCASTING - MAGIA NUMPY ===")

# Exemplu 1: Procesarea batch-ului de imagini pentru AI
print("1. PROCESARE BATCH IMAGINI PENTRU AI")
batch = np.random.rand(32, 64, 64, 3)  # 32 imagini 64x64 RGB
mean = np.array([0.485, 0.456, 0.406])  # Media RGB din ImageNet
std = np.array([0.229, 0.224, 0.225])   # Deviația RGB

# Broadcasting magic: normalizăm toate imaginile simultan
normalized = (batch - mean) / std
print(f"  Batch: {batch.shape}")
print(f"  Media RGB: {mean.shape}")
print(f"  → Toate cele 32 imagini normalizate într-o operație!")

# Exemplu 2: Simularea particulelor în spațiu 3D
print("\\n2. SIMULAREA FIZICII PARTICULELOR")
n_particles = 1000
positions = np.random.rand(n_particles, 3) * 100  # Poziții 3D
velocities = np.random.randn(n_particles, 3)      # Viteze aleatoare
acceleration = np.array([0, 0, -9.81])           # Gravitația

dt = 0.01  # Pas de timp
# Actualizăm toate pozițiile simultan (legile lui Newton)
new_positions = positions + velocities * dt + 0.5 * acceleration * dt**2
new_velocities = velocities + acceleration * dt

print(f"  Particule: {n_particles}")
print(f"  Gravitație aplicată: {acceleration}")
print(f"  → Toate particulele actualizate simultan în dt={dt}s")

"""
📊 6. EXERCIȚII PRACTICE - POVEȘTI DIN LUMEA REALĂ

Aplicăm NumPy pe scenarii concrete din:
astronomie, medicină, economie, arte digitale
"""

print("\\n=== EXERCIȚII PRACTICE ===")

# ASTRONOMIE: Calculul orbitelor planetare
print("🌌 ASTRONOMIE - Orbitele planetelor")
planets = np.array([
    [0.39, "Mercur"],   [0.72, "Venus"],    [1.00, "Terra"],
    [1.52, "Marte"],    [5.20, "Jupiter"],  [9.58, "Saturn"]
], dtype=object)

distances = planets[:, 0].astype(float)  # Distanțe în AU
# Legea a III-a a lui Kepler: T² ∝ a³
orbital_periods = np.sqrt(distances**3)  # Ani

print(f"  Calculul perioadelor orbitale:")
for i, planet in enumerate(planets[:4]):
    print(f"    {planet[1]}: {orbital_periods[i]:.2f} ani")

# MEDICINĂ: Analiza semnalului cardiac EKG
print("\\n🏥 MEDICINĂ - Analiza EKG")
time = np.linspace(0, 5, 500)  # 5 secunde
heart_rate = 72  # bătăi pe minut

# Semnal cardiac simulat
heartbeat = np.sin(2 * np.pi * heart_rate/60 * time)
noise = np.random.normal(0, 0.1, len(time))
ekg_signal = heartbeat + noise

# Detectarea anomaliilor (arhitmii)
signal_power = np.abs(np.fft.fft(ekg_signal))**2
dominant_freq = np.argmax(signal_power[1:len(signal_power)//2]) + 1
detected_hr = dominant_freq * 60 / 5  # conversie la BPM

print(f"  Durată analiză: 5 secunde")
print(f"  HR real: {heart_rate} BPM")
print(f"  HR detectat: {detected_hr:.0f} BPM")
print(f"  Precizie: {100-abs(detected_hr-heart_rate)/heart_rate*100:.1f}%")

# ECONOMIE: Optimizarea portofoliului Markowitz
print("\\n💰 ECONOMIE - Portfolio Optimization")
n_assets = 5
returns = np.random.normal(0.08, 0.15, n_assets)  # Randamente așteptate
risks = np.random.uniform(0.1, 0.3, n_assets)     # Riscuri (volatilități)

# Calculăm raportul Sharpe pentru fiecare activ
risk_free_rate = 0.03
sharpe_ratios = (returns - risk_free_rate) / risks

# Portofoliul optimal (simplified)
optimal_weights = sharpe_ratios / np.sum(sharpe_ratios)
portfolio_return = np.dot(optimal_weights, returns)
portfolio_risk = np.sqrt(np.dot(optimal_weights**2, risks**2))

print(f"  Active analizate: {n_assets}")
print(f"  Randament portofoliu: {portfolio_return*100:.2f}%")
print(f"  Risc portofoliu: {portfolio_risk*100:.2f}%")
print(f"  Sharpe ratio: {(portfolio_return-risk_free_rate)/portfolio_risk:.3f}")

# ARTĂ: Generarea unui fractal Julia
print("\\n🎨 ARTĂ - Fractal Julia Set")
size = 80
c = -0.7 + 0.27015j  # Parametrul pentru setul Julia

x = np.linspace(-1.5, 1.5, size)
y = np.linspace(-1.5, 1.5, size)
X, Y = np.meshgrid(x, y)
Z = X + 1j * Y

# Algoritmul Julia vectorizat
julia_set = np.zeros((size, size))
for i in range(30):
    mask = np.abs(Z) <= 2
    Z[mask] = Z[mask]**2 + c
    julia_set[mask] = i

fractal_density = np.sum(julia_set > 0) / (size**2) * 100
print(f"  Dimensiune: {size}x{size}")
print(f"  Parametru c: {c}")
print(f"  Densitate fractală: {fractal_density:.1f}%")

# METEOROLOGIE: Simularea propagării unui nor
print("\\n🌤️  METEOROLOGIE - Simularea norilor")
grid_size = 40
# Inițializăm norul cu densitatea vaporilor
cloud_density = np.zeros((grid_size, grid_size))
cloud_density[18:22, 18:22] = 1.0  # Nor inițial în centru

# Simulăm difuzia vaporilor (ecuația căldurii simplificată)
diffusion_rate = 0.1
time_steps = 50

for t in range(time_steps):
    # Aplicăm difuzia în toate direcțiile
    new_density = cloud_density.copy()
    # Difuzie în direcțiile N, S, E, W
    new_density[1:-1, 1:-1] = (cloud_density[1:-1, 1:-1] + 
                               diffusion_rate * (
                                   cloud_density[:-2, 1:-1] +   # Nord
                                   cloud_density[2:, 1:-1] +    # Sud  
                                   cloud_density[1:-1, :-2] +   # Vest
                                   cloud_density[1:-1, 2:] -    # Est
                                   4 * cloud_density[1:-1, 1:-1]))
    cloud_density = new_density

total_water = np.sum(cloud_density)
max_density = np.max(cloud_density)
print(f"  Grilă simulare: {grid_size}x{grid_size}")
print(f"  Pași temporali: {time_steps}")
print(f"  Apă rămasă în nor: {total_water:.3f}")
print(f"  Densitate maximă: {max_density:.3f}")

"""
🌍 CONCLUZIE - DE CE NUMPY E GATEWAY-UL

Fără NumPy → n-ai TensorFlow, PyTorch, scikit-learn
Cu NumPy → intri în lumea unde o linie de cod 
           poate procesa milioane de date

Fiecare array NumPy te conectează la:
🔬 Cercetarea științifică
💊 Descoperirea medicamentelor  
📈 Analiza financiară
🎨 Arta generativă
🚀 Explorarea spațiului
🤖 Inteligența artificială

BUN VENIT ÎN LUMEA ȘTIINȚEI COMPUTAȚIONALE! 🌟
"""

print("\\n" + "🎯"*20)
print("🏆 SESSION 13 COMPLETĂ!")
print("🎯"*20)

print("\\n📚 URMĂTOAREA AVENTURĂ:")
print("  Session 14: Operații avansate NumPy")
print("  Session 15: Linear Algebra pentru AI")
print("  Sessions 16-17: Pandas - Big Data Analysis")

print("\\n💪 CHALLENGE PENTRU ACASĂ:")
print("  1. 🌍 Simulează schimbările climatice")
print("  2. 💹 Analizează bursa de pe o lună")
print("  3. 🧬 Procesează secvențe ADN")
print("  4. 🎵 Analizează un fișier MP3")
print("\\n  → Toate cu NumPy! Tu poți! 🚀")
`}
                          language="python"
                        />
                      </details>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <Button
                        onClick={() => navigate('/artifacts/numpy')}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                      >
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-2xl">🌌</span>
                          <span>Open NumPy Interactive Artifact</span>
                        </div>
                      </Button>
                      <p className="text-center text-sm text-gray-600 mt-2">
                        Explorează lumea NumPy într-o experiență interactivă completă!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* More Sessions */}
              <div className="space-y-6">
                <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-pink-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="mb-2">Session 15</Badge>
                      <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 text-pink-600" />
                      </div>
                    </div>
                    <CardTitle className="group-hover:text-pink-600 transition-colors">
                      NumPy for AI: Linear Algebra
                    </CardTitle>
                    <CardDescription>
                      Mathematical operations, linear algebra, and AI applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <details className="cursor-pointer">
                      <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                        ✨ Momentul Revelației: Când Matematica Devine Conștiință
                      </summary>
                      <div className="text-sm text-muted-foreground mb-4">
                        Discover how 18th century linear algebra becomes modern artificial intelligence.
                        From simple matrices to ChatGPT, Tesla, and face recognition - it's all linear algebra applied masterfully!
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-pink-50 rounded-lg p-3 border border-pink-200">
                          <h4 className="font-semibold text-pink-700 mb-2">🧠 Interactive Experiences:</h4>
                          <ul className="text-sm text-pink-600 space-y-1">
                            <li>• <strong>Matrix Calculator:</strong> Operații live cu matrici</li>
                            <li>• <strong>Neural Network Simulator:</strong> Forward pass în timp real</li>
                            <li>• <strong>Computer Vision Lab:</strong> Edge detection interactiv</li>
                            <li>• <strong>3D Transformations:</strong> Rotații și scalări ca în jocuri</li>
                            <li>• <strong>Eigenvalue Analyzer:</strong> Sufletul matricilor dezvăluit</li>
                          </ul>
                        </div>
                        
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <h4 className="font-semibold text-blue-700 mb-2">🌍 Real-World Connections:</h4>
                          <ul className="text-sm text-blue-600 space-y-1">
                            <li>• <strong>ChatGPT & AI:</strong> Miliarde de înmulțiri matriceale</li>
                            <li>• <strong>Face ID:</strong> Eigenfaces și PCA</li>
                            <li>• <strong>Tesla Autopilot:</strong> Computer vision live</li>
                            <li>• <strong>Spotify:</strong> Matrix factorization pentru recomandări</li>
                            <li>• <strong>Jocuri 3D:</strong> Transformări în timp real</li>
                          </ul>
                        </div>
                      </div>
                    </details>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <Button
                        onClick={() => navigate('/artifacts/linear-algebra')}
                        className="w-full bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                      >
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-2xl">🧠</span>
                          <span>Linear Algebra Interactive Artifact</span>
                        </div>
                      </Button>
                      <p className="text-center text-sm text-gray-600 mt-2">
                        Călătoria epică de la Gauss și Euler până la ChatGPT și Tesla!
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="mb-2">Sessions 16-17</Badge>
                      <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                        <Database className="w-4 h-4 text-emerald-600" />
                      </div>
                    </div>
                    <CardTitle className="group-hover:text-emerald-600 transition-colors">
                      Pandas: De la haosul datelor brute la insight-uri curate
                    </CardTitle>
                    <CardDescription>
                      Povestea lui Wes McKinney și cum a revolutionat analiza datelor în Python
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <details className="cursor-pointer">
                      <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                        🏦 Povestea: De ce s-a născut Pandas?
                      </summary>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <p><strong>Anul 2008:</strong> Wes McKinney, analist quantitative la AQR Capital Management, se confrunta cu milioane de tranzacții financiare care nu puteau fi procesate în Excel.</p>
                        <p><strong>Problema:</strong> Excel - limitare la ~1M rânduri, calcule lente, analize complexe imposibile</p>
                        <p><strong>Soluția:</strong> Pandas - Panel Data Analysis născut din nevoi reale, nu din teorie</p>
                      </div>
                    </details>
                    
                    <details className="cursor-pointer">
                      <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                        🛍️ Exemplu real: E-commerce Intelligence
                      </summary>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <p>• <strong>Data Cleaning:</strong> Completarea valorilor lipsă, eliminarea duplicatelor</p>
                        <p>• <strong>Filtrare & Grupare:</strong> Comenzi peste 100 lei, vânzări pe orașe</p>
                        <p>• <strong>Time Series:</strong> Analiza trendurilor lunare și sezoniere</p>
                        <p>• <strong>Pivot Tables:</strong> Rapoarte executive din CSV-uri brute</p>
                        <p>• <strong>Pipeline-uri:</strong> Automatizarea procesului de curățare</p>
                      </div>
                    </details>

                    <Button
                      onClick={() => navigate('/artifacts/pandas')}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl">🐼</span>
                        <span>Open Pandas Interactive Artifact</span>
                      </div>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* AI Foundations Preview */}
          <section id="ai-foundations" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">The Path to AI</h2>
                <p className="text-muted-foreground">Where data structures meet machine learning</p>
              </div>
            </div>

            <Card className="border-amber-200 dark:border-amber-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                  <TrendingUp className="w-5 h-5" />
                  Your Journey Continues...
                </CardTitle>
                <CardDescription className="text-lg">
                  Every algorithm you've learned, every data structure you've mastered, brings you closer to artificial intelligence.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-foreground leading-relaxed">
                    You've now built the foundation: from Python's language mechanics to efficient data structures, 
                    from algorithms that power the web to numerical computing that processes billions of data points.
                  </p>
                  
                  <p className="text-muted-foreground">
                    Next, we'll explore how these fundamentals combine to create intelligent systems that can learn, 
                    predict, and make decisions. The journey from algorithms to AI is just beginning.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                        Coming Next: Machine Learning Foundations
                      </h5>
                      <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
                        We'll explore how linear algebra becomes neural networks, how optimization algorithms train AI models, 
                        and how the data structures you've learned become the backbone of machine learning pipelines.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Newton's Legacy Section */}
          <section id="newton-legacy" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">On the Shoulders of Giants</h2>
                <p className="text-muted-foreground">How calculus was born from solitude and collective wisdom</p>
              </div>
            </div>

            <Card className="border-amber-200 dark:border-amber-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                  <Brain className="w-5 h-5" />
                  Newton's Revolutionary Moment
                </CardTitle>
                <CardDescription className="text-lg">
                  In 1665, during the plague years, Isaac Newton retreated to his family farm and revolutionized mathematics forever.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-foreground leading-relaxed">
                    In the quiet of Woolsthorpe Manor, far from the bustle of Cambridge, Newton gazed upon the mathematical foundations 
                    laid by his predecessors. <strong className="text-amber-600 dark:text-amber-400">Euclid's geometry</strong>, 
                    <strong className="text-amber-600 dark:text-amber-400"> Archimedes' method of exhaustion</strong>, and 
                    <strong className="text-amber-600 dark:text-amber-400"> Descartes' coordinate system</strong> – all became stepping stones 
                    to something unprecedented.
                  </p>
                  
                  <blockquote className="border-l-4 border-amber-500 pl-4 italic text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/20 p-4 rounded-r-lg">
                    "If I have seen further, it is by standing on the shoulders of giants."
                    <footer className="text-sm mt-2 not-italic">— Isaac Newton</footer>
                  </blockquote>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-6 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-3">The Mathematical Lineage</h4>
                      <ul className="text-sm text-emerald-700 dark:text-emerald-300 space-y-2">
                        <li><strong>Euclid (300 BCE):</strong> Geometric foundations</li>
                        <li><strong>Archimedes (287-212 BCE):</strong> Early integration concepts</li>
                        <li><strong>Fermat (1601-1665):</strong> Analytic geometry</li>
                        <li><strong>Descartes (1596-1650):</strong> Coordinate systems</li>
                        <li><strong>Newton (1642-1727):</strong> Unified calculus</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Newton's Breakthroughs</h4>
                      <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                        <li><strong>Method of Fluxions:</strong> Differential calculus</li>
                        <li><strong>Inverse Method:</strong> Integral calculus</li>
                        <li><strong>Fundamental Theorem:</strong> Connecting derivatives and integrals</li>
                        <li><strong>Applications:</strong> Physics, astronomy, engineering</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-4">The Honor of Continuity</h4>
                    <p className="text-purple-700 dark:text-purple-300 leading-relaxed">
                      Today, as we write algorithms that process millions of data points and train neural networks with billions of parameters, 
                      we continue this sacred mathematical lineage. Every <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">numpy.gradient()</code> call, 
                      every optimization step in machine learning, every derivative computed by our AI systems – they all echo Newton's revolutionary insights.
                    </p>
                    
                    <p className="text-purple-700 dark:text-purple-300 leading-relaxed mt-4">
                      <strong>We stand on the shoulders of giants, and it is our honor to be the giants for those who come after us.</strong> 
                      <br></br>In our Python code, in our data structures, in our algorithms – we carry forward the torch of human mathematical achievement.
                    </p>
                  </div>

                  <div className="text-center mt-8">
                    <p className="text-muted-foreground italic">
                      "In mathematics, there is no royal road to understanding, but there is a continuous path of discovery 
                      that connects every Learner to the greatest Minds in History."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Navigation - Compact and positioned better */}
        <div className="hidden lg:block w-72">
          <div className="space-y-4">
            <CourseNavigation 
              previousCourse={{
                path: "/foundations",
                title: "Foundations"
              }}
              nextCourse={{
                path: "/data-visualizing", 
                title: "Data Visualizing"
              }}
            />
            
            <TableOfContents items={tocItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCalculus;