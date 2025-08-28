import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LoginPage from "@/pages/login";

// Mocks
const navigateMock = vi.fn();
const loginMock = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => navigateMock,
    Link: ({ to, children }: any) => <a href={to}>{children}</a>,
  };
});

vi.mock("@/utils/userAuth", () => {
  return {
    default: class {
      login = loginMock;
    },
  };
});

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setup = () =>
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

  it("renders the login form", () => {
    setup();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });

  it("shows invalid email format error", async () => {
    setup();
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "invalid" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "pass1234" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(await screen.findByText(/email is invalid/i)).toBeInTheDocument();
  });

  it("submits form and navigates on successful login", async () => {
    loginMock.mockResolvedValue({
      user: { id: "1", email: "test@example.com" },
    });

    setup();
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "pass1234" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "pass1234",
      });

      expect(navigateMock).toHaveBeenCalledWith("/user/dashboard");
    });
  });

  it("shows error on invalid credentials (401)", async () => {
    loginMock.mockResolvedValue({ status: 401 });

    setup();
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText(/invalid email or password/i)
    ).toBeInTheDocument();
  });
});
