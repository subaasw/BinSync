import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AdminAuthService from "@/utils/adminAuth";
import { setLocalStorage } from "@/utils/localStorage";
import { useNavigate } from "react-router";
import AdminLoginPage from "../admin-login";

vi.mock("@/utils/adminAuth", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      login: vi.fn(),
    })),
  };
});

vi.mock("@/utils/localStorage", () => ({
  setLocalStorage: vi.fn(),
}));

describe("AdminLoginPage", () => {
  let loginMock: ReturnType<typeof vi.fn>;
  let navigateMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    loginMock = vi.fn();
    (AdminAuthService as any).mockImplementation(() => ({
      login: loginMock,
    }));

    navigateMock = vi.fn();
    (useNavigate as any) = () => navigateMock;

    render(
      <MemoryRouter>
        <AdminLoginPage />
      </MemoryRouter>
    );
  });

  it("renders all inputs and buttons", () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /login to admin panel/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
    expect(screen.getByText(/return to user login/i)).toBeInTheDocument();
  });

  it("shows validation errors if form is submitted empty", async () => {
    fireEvent.click(
      screen.getByRole("button", { name: /login to admin panel/i })
    );

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });

  it("shows validation error for invalid email", async () => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "invalidemail" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "validpassword" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /login to admin panel/i })
    );

    expect(await screen.findByText(/email is invalid/i)).toBeInTheDocument();
  });

  it("disables submit button and shows loading text when submitting", async () => {
    loginMock.mockResolvedValue({ admin: { id: "1" } });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "admin@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /login to admin panel/i })
    );

    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByRole("button")).toHaveTextContent(/logging in/i);

    await waitFor(() => expect(loginMock).toHaveBeenCalled());
  });

  it("calls login and navigates on successful login", async () => {
    loginMock.mockResolvedValue({
      admin: { id: "123", email: "admin@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "admin@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /login to admin panel/i })
    );

    await waitFor(() =>
      expect(loginMock).toHaveBeenCalledWith({
        email: "admin@example.com",
        password: "password123",
      })
    );

    expect(setLocalStorage).toHaveBeenCalledWith("user", {
      id: "123",
      email: "admin@example.com",
    });
    expect(navigateMock).toHaveBeenCalledWith("/admin/dashboard");
  });

  it("does not navigate if login fails", async () => {
    loginMock.mockResolvedValue(null);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "admin@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /login to admin panel/i })
    );

    await waitFor(() => expect(loginMock).toHaveBeenCalled());

    expect(setLocalStorage).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });
});
