import React, { useState, useEffect } from 'react';
import { useContent } from '../components/ContentProvider';
import EditablePageHeader from '../components/EditablePageHeader';
import EditableContent from '../components/EditableContent';
import EditableCodeBlock from '../components/EditableCodeBlock';
import TableOfContents from '../components/TableOfContents';
import CourseNavigation from '../components/CourseNavigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Calculator, Zap, TrendingUp, ChevronRight, Play, CheckCircle2, Brain, BarChart3, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dataCalculusHero from '@/assets/data-calculus-hero.jpg';

const DataCalculus = () => {
  const { getContent, loading } = useContent();
  
  const [tocItems] = useState([
    { id: 'journey-begins', title: 'The Data Journey Begins', sessions: 'Introduction' },
    { id: 'data-structures', title: 'Data Structures & Algorithms', sessions: 'Sessions 9-12' },
    { id: 'numerical-computing', title: 'Numerical Computing & Analysis', sessions: 'Sessions 13-17' },
    { id: 'ai-foundations', title: 'Foundations for AI', sessions: 'Theory & Practice' }
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
      <EditablePageHeader 
        page="data-calculus"
        defaultTitle="Data: Calculus" 
        defaultSubtitle="From data structures to numerical computing - building the foundation for AI"
      />
      
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
            heapq.heappush(self.trending_posts, 
                          (-post['engagement_score'], post))
    
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
                      <Badge variant="secondary" className="mb-2">Session 13</Badge>
                      <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                        <Calculator className="w-4 h-4 text-indigo-600" />
                      </div>
                    </div>
                    <CardTitle className="group-hover:text-indigo-600 transition-colors">
                      NumPy for Beginners
                    </CardTitle>
                    <CardDescription>
                      Complete guide to numerical computing - arrays, operations, and performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <details className="cursor-pointer">
                      <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                        Real-World Scenario: Image Processing
                      </summary>
                      <div className="text-sm text-muted-foreground mb-3">
                        Understanding how NumPy powers computer vision and image processing
                      </div>
                    </details>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-cyan-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="mb-2">Session 14</Badge>
                      <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-cyan-600" />
                      </div>
                    </div>
                    <CardTitle className="group-hover:text-cyan-600 transition-colors">
                      Advanced NumPy: Operations & Broadcasting
                    </CardTitle>
                    <CardDescription>
                      Mathematical operations, broadcasting, and complex indexing for massive datasets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <details className="cursor-pointer">
                      <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                        Real-World Scenario: Financial Analytics
                      </summary>
                      <div className="text-sm text-muted-foreground mb-3">
                        How investment firms process millions of stock prices in real-time
                      </div>
                    </details>
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
                        Real-World Scenario: Neural Networks
                      </summary>
                      <div className="text-sm text-muted-foreground mb-3">
                        Building the mathematical foundation for deep learning
                      </div>
                    </details>
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
                      Pandas: Data Analysis & Cleaning
                    </CardTitle>
                    <CardDescription>
                      Master data manipulation, analysis, and preparation like an expert
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <details className="cursor-pointer">
                      <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                        Real-World Scenario: Business Intelligence
                      </summary>
                      <div className="text-sm text-muted-foreground mb-3">
                        How companies transform raw data into business insights
                      </div>
                    </details>
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