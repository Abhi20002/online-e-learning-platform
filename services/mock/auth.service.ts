import type {
  User,
  AuthSession,
  LoginFormData,
  SignupFormData,
  ApiResponse,
} from "@/types";
import { users } from "@/mock/users";
import { sleep, generateId } from "@/lib/utils";
import { STORAGE_KEYS } from "@/constants";

/**
 * Mock Authentication Service
 * Simulates API calls with realistic delays
 */

class AuthService {
  /**
   * Login user with email and password
   */
  async login(data: LoginFormData): Promise<ApiResponse<AuthSession>> {
    // Simulate network delay
    await sleep(800);

    // Find user by email
    const user = users.find((u) => u.email === data.email);

    // Check if user exists
    if (!user) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    // Mock password validation (in real app, this would be hashed)
    // For demo, any password works
    if (!data.password || data.password.length < 6) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    // Check if user is active
    if (user.status !== "active") {
      return {
        success: false,
        error: "Your account has been suspended. Please contact support.",
      };
    }

    // Generate session
    const session: AuthSession = {
      user,
      token: generateId(32),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    };

    // Store in localStorage if remember me is checked
    if (data.rememberMe) {
      this.storeSession(session);
    }

    return {
      success: true,
      data: session,
      message: "Login successful!",
    };
  }

  /**
   * Signup new user
   */
  async signup(data: SignupFormData): Promise<ApiResponse<AuthSession>> {
    // Simulate network delay
    await sleep(1000);

    // Check if email already exists
    const existingUser = users.find((u) => u.email === data.email);
    if (existingUser) {
      return {
        success: false,
        error: "An account with this email already exists",
      };
    }

    // Create new user
    const newUser: User = {
      id: generateId(16),
      email: data.email,
      name: data.name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
      role: "student",
      status: "active",
      mobile: data.mobile,
      joinedDate: new Date().toISOString(),
      enrolledCourses: [],
      completedCourses: [],
      certificates: [],
    };

    // Add to mock users array (in real app, this would be saved to database)
    users.push(newUser);

    // Generate session
    const session: AuthSession = {
      user: newUser,
      token: generateId(32),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    // Store session
    this.storeSession(session);

    return {
      success: true,
      data: session,
      message: "Account created successfully!",
    };
  }

  /**
   * Logout user
   */
  async logout(): Promise<ApiResponse<void>> {
    await sleep(300);

    // Clear session from localStorage
    this.clearSession();

    return {
      success: true,
      message: "Logged out successfully!",
    };
  }

  /**
   * Get current user from stored session
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    await sleep(200);

    const session = this.getStoredSession();

    if (!session) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    // Check if session is expired
    if (new Date(session.expiresAt) < new Date()) {
      this.clearSession();
      return {
        success: false,
        error: "Session expired",
      };
    }

    // Get fresh user data
    const user = users.find((u) => u.id === session.user.id);

    if (!user) {
      this.clearSession();
      return {
        success: false,
        error: "User not found",
      };
    }

    return {
      success: true,
      data: user,
    };
  }

  /**
   * Forgot password - send reset link
   */
  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    await sleep(1000);

    const user = users.find((u) => u.email === email);

    if (!user) {
      // For security, don't reveal if email exists
      return {
        success: true,
        message: "If an account exists with this email, you will receive a password reset link.",
      };
    }

    return {
      success: true,
      message: "Password reset link sent to your email!",
    };
  }

  /**
   * Reset password with token
   */
  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<ApiResponse<void>> {
    await sleep(800);

    // In real app, validate token
    if (!token || token.length < 10) {
      return {
        success: false,
        error: "Invalid or expired reset token",
      };
    }

    if (newPassword.length < 8) {
      return {
        success: false,
        error: "Password must be at least 8 characters",
      };
    }

    return {
      success: true,
      message: "Password reset successfully!",
    };
  }

  /**
   * Update user profile
   */
  async updateProfile(
    userId: string,
    updates: Partial<User>
  ): Promise<ApiResponse<User>> {
    await sleep(600);

    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return {
        success: false,
        error: "User not found",
      };
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      ...updates,
    };

    // Update stored session if exists
    const session = this.getStoredSession();
    if (session && session.user.id === userId) {
      session.user = users[userIndex];
      this.storeSession(session);
    }

    return {
      success: true,
      data: users[userIndex],
      message: "Profile updated successfully!",
    };
  }

  /**
   * Change password
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse<void>> {
    await sleep(700);

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    // Mock password validation
    if (!currentPassword || currentPassword.length < 6) {
      return {
        success: false,
        error: "Current password is incorrect",
      };
    }

    if (newPassword.length < 8) {
      return {
        success: false,
        error: "New password must be at least 8 characters",
      };
    }

    return {
      success: true,
      message: "Password changed successfully!",
    };
  }

  // ============================================
  // PRIVATE HELPER METHODS
  // ============================================

  private storeSession(session: AuthSession): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.authToken, session.token);
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(session.user));
    }
  }

  private getStoredSession(): AuthSession | null {
    if (typeof window === "undefined") return null;

    const token = localStorage.getItem(STORAGE_KEYS.authToken);
    const userStr = localStorage.getItem(STORAGE_KEYS.user);

    if (!token || !userStr) return null;

    try {
      const user = JSON.parse(userStr) as User;
      return {
        user,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };
    } catch {
      return null;
    }
  }

  private clearSession(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.authToken);
      localStorage.removeItem(STORAGE_KEYS.user);
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
