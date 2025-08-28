import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Recycle, Shield } from "lucide-react";

import AdminAuthService from "@/utils/adminAuth";
import { setLocalStorage } from "@/utils/localStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const adminAuth = new AdminAuthService();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (generalError) setGeneralError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setGeneralError("");

    try {
      const res = await adminAuth.login(formData);
      if (res?.admin) {
        setLocalStorage("user", res.admin);
        navigate("/admin/dashboard");
      } else if (res?.status === 401) {
        setGeneralError("Invalid email or password");
      } else {
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    } catch {
      setGeneralError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="relative flex items-center justify-center">
              <Recycle className="h-10 w-10 text-admin-primary" />
              <Shield className="absolute h-6 w-6 text-admin-primary" />
            </div>
            <h1 className="text-3xl font-bold">Admin Login</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your credentials to access the admin panel
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="admin@example.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="text-sm text-red-500"
                  role="alert"
                >
                  {errors.email}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/admin-forgot-password"
                  className="text-sm font-medium underline text-admin-primary"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "border-red-500" : ""}
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
              />
              {errors.password && (
                <p
                  id="password-error"
                  className="text-sm text-red-500"
                  role="alert"
                >
                  {errors.password}
                </p>
              )}
            </div>
            {generalError && (
              <p className="text-sm text-red-600" role="alert">
                {generalError}
              </p>
            )}
            <Button
              className="w-full bg-admin-primary hover:bg-admin-secondary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login to Admin Panel"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link
              to="/login"
              className="font-medium text-admin-primary hover:underline"
            >
              Return to User Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
