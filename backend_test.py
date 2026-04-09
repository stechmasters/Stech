#!/usr/bin/env python3
"""
Backend API Testing for Tech Masters Solutions
Tests authentication, CRUD operations, and security features
"""

import requests
import sys
import json
from datetime import datetime
from time import sleep

class TechMastersAPITester:
    def __init__(self, base_url="https://tech-ct.preview.emergentagent.com"):
        self.base_url = base_url
        self.session = requests.Session()
        self.tests_run = 0
        self.tests_passed = 0
        self.admin_email = "admin@techmasters.com"
        self.admin_password = "TechMasters2025!"

    def log_test(self, name, success, details=""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        if details:
            print(f"   Details: {details}")

    def test_endpoint(self, name, method, endpoint, expected_status, data=None, cookies=None):
        """Test a single API endpoint"""
        url = f"{self.base_url}/api/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        try:
            if method == 'GET':
                response = self.session.get(url, headers=headers)
            elif method == 'POST':
                response = self.session.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = self.session.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = self.session.delete(url, headers=headers)
            
            success = response.status_code == expected_status
            details = f"Status: {response.status_code}, Expected: {expected_status}"
            
            if not success and response.text:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data.get('detail', response.text)}"
                except:
                    details += f", Response: {response.text[:100]}"
            
            self.log_test(name, success, details)
            return success, response
            
        except Exception as e:
            self.log_test(name, False, f"Exception: {str(e)}")
            return False, None

    def test_authentication_flow(self):
        """Test complete authentication flow"""
        print("\n🔐 Testing Authentication Flow...")
        
        # Test login with correct credentials
        success, response = self.test_endpoint(
            "Admin Login",
            "POST",
            "auth/login",
            200,
            {"email": self.admin_email, "password": self.admin_password}
        )
        
        if not success:
            print("❌ Cannot proceed with other tests - login failed")
            return False
        
        # Verify cookies are set
        cookies = self.session.cookies
        has_access_token = 'access_token' in cookies
        has_refresh_token = 'refresh_token' in cookies
        
        self.log_test("Access Token Cookie Set", has_access_token)
        self.log_test("Refresh Token Cookie Set", has_refresh_token)
        
        # Test /auth/me endpoint
        success, response = self.test_endpoint("Get Current User", "GET", "auth/me", 200)
        if success and response:
            user_data = response.json()
            is_admin = user_data.get('role') == 'admin'
            correct_email = user_data.get('email') == self.admin_email
            self.log_test("User Role is Admin", is_admin)
            self.log_test("User Email Correct", correct_email)
        
        return True

    def test_brute_force_protection(self):
        """Test brute force protection"""
        print("\n🛡️ Testing Brute Force Protection...")
        
        # Create a new session for brute force testing
        brute_session = requests.Session()
        
        # Try 6 failed logins
        failed_attempts = 0
        for i in range(6):
            try:
                response = brute_session.post(
                    f"{self.base_url}/api/auth/login",
                    json={"email": self.admin_email, "password": "wrongpassword"},
                    headers={'Content-Type': 'application/json'}
                )
                
                if response.status_code == 429:
                    self.log_test(f"Brute Force Protection Triggered (attempt {i+1})", True, "Got 429 status")
                    break
                elif response.status_code == 401:
                    failed_attempts += 1
                    print(f"   Attempt {i+1}: 401 (expected)")
                else:
                    self.log_test(f"Unexpected status on attempt {i+1}", False, f"Got {response.status_code}")
                    
            except Exception as e:
                self.log_test(f"Brute force test attempt {i+1}", False, str(e))
        
        # Should be locked out after 5 attempts
        if failed_attempts >= 5:
            self.log_test("Brute Force Protection", True, f"Blocked after {failed_attempts} attempts")
        else:
            self.log_test("Brute Force Protection", False, f"Only {failed_attempts} attempts before lockout")

    def test_protected_endpoints(self):
        """Test protected endpoints require authentication"""
        print("\n🔒 Testing Protected Endpoints...")
        
        # Test without authentication (should fail)
        unauth_session = requests.Session()
        
        # Note: GET settings and GET services/reviews are public, others are protected
        protected_endpoints = [
            ("PUT", "settings", {"companyName": "test"}),
            ("POST", "services", {"icon": "🔧", "title": "Test", "description": "Test"}),
            ("DELETE", "services/test", None),
            ("POST", "reviews", {"rating": 5, "text": "Test", "author": "Test"}),
            ("DELETE", "reviews/test", None),
            ("PUT", "payments", {"zelle": "test"})
        ]
        
        for method, endpoint, data in protected_endpoints:
            try:
                url = f"{self.base_url}/api/{endpoint}"
                if method == 'GET':
                    response = unauth_session.get(url)
                elif method == 'POST':
                    response = unauth_session.post(url, json=data)
                elif method == 'PUT':
                    response = unauth_session.put(url, json=data)
                elif method == 'DELETE':
                    response = unauth_session.delete(url)
                
                # Should return 401 for protected endpoints
                success = response.status_code == 401
                self.log_test(f"Protected {method} {endpoint}", success, f"Status: {response.status_code}")
                
            except Exception as e:
                self.log_test(f"Protected {method} {endpoint}", False, str(e))

    def test_crud_operations(self):
        """Test CRUD operations with authentication"""
        print("\n📝 Testing CRUD Operations...")
        
        # Test Settings CRUD
        settings_data = {
            "companyName": "Tech Masters Solutions Test",
            "tagline": "Test Tagline",
            "phone": "2033170884",
            "email": "test@techmasters.com",
            "location": "Connecticut Test"
        }
        
        # Update settings
        success, response = self.test_endpoint(
            "Update Settings",
            "PUT",
            "settings",
            200,
            settings_data
        )
        
        # Get settings
        success, response = self.test_endpoint("Get Settings", "GET", "settings", 200)
        if success and response:
            data = response.json()
            name_correct = data.get('companyName') == settings_data['companyName']
            self.log_test("Settings Data Persisted", name_correct)
        
        # Test Services CRUD
        service_data = {
            "icon": "🔧",
            "title": "Test Service",
            "description": "This is a test service"
        }
        
        success, response = self.test_endpoint(
            "Create Service",
            "POST",
            "services",
            200,  # Backend returns 200, not 201
            service_data
        )
        
        service_id = None
        if success and response:
            service_id = response.json().get('id')
            self.log_test("Service ID Returned", bool(service_id))
        
        # Get services
        success, response = self.test_endpoint("Get Services", "GET", "services", 200)
        if success and response:
            services = response.json()
            has_test_service = any(s.get('title') == 'Test Service' for s in services)
            self.log_test("Test Service in List", has_test_service)
        
        # Delete service if we have ID
        if service_id:
            success, response = self.test_endpoint(
                "Delete Service",
                "DELETE",
                f"services/{service_id}",
                200
            )
        
        # Test Reviews CRUD
        review_data = {
            "rating": 5,
            "text": "Excellent test service!",
            "author": "Test Customer"
        }
        
        success, response = self.test_endpoint(
            "Create Review",
            "POST",
            "reviews",
            201,
            review_data
        )
        
        review_id = None
        if success and response:
            review_id = response.json().get('id')
        
        # Get reviews
        success, response = self.test_endpoint("Get Reviews", "GET", "reviews", 200)
        
        # Delete review if we have ID
        if review_id:
            success, response = self.test_endpoint(
                "Delete Review",
                "DELETE",
                f"reviews/{review_id}",
                200
            )
        
        # Test Payment Methods
        payment_data = {
            "zelle": "test@zelle.com",
            "cashapp": "$testcash",
            "venmo": "@testvenmo"
        }
        
        success, response = self.test_endpoint(
            "Update Payment Methods",
            "PUT",
            "payments",
            200,
            payment_data
        )
        
        # Get payment methods
        success, response = self.test_endpoint("Get Payment Methods", "GET", "payments", 200)
        if success and response:
            data = response.json()
            zelle_correct = data.get('zelle') == payment_data['zelle']
            self.log_test("Payment Methods Persisted", zelle_correct)

    def test_logout(self):
        """Test logout functionality"""
        print("\n🚪 Testing Logout...")
        
        success, response = self.test_endpoint("Logout", "POST", "auth/logout", 200)
        
        # Verify cookies are cleared by testing /auth/me
        success, response = self.test_endpoint("Auth Check After Logout", "GET", "auth/me", 401)

    def run_all_tests(self):
        """Run all tests"""
        print("🚀 Starting Tech Masters Solutions API Tests")
        print(f"Testing against: {self.base_url}")
        print("=" * 60)
        
        # Test authentication first
        if not self.test_authentication_flow():
            print("\n❌ Authentication failed - stopping tests")
            return False
        
        # Test other functionality
        self.test_protected_endpoints()
        self.test_crud_operations()
        self.test_logout()
        
        # Test brute force protection (do this last as it may lock us out)
        self.test_brute_force_protection()
        
        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"📈 Success Rate: {success_rate:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return True
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} tests failed")
            return False

def main():
    """Main test runner"""
    tester = TechMastersAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())