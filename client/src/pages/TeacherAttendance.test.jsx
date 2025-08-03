/* global jest */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TeacherAttendance from "./TeacherAttendance";
import useFetchWithAuth from "../hooks/useFetchWithAuth";
import { describe, it, expect, beforeEach } from '@jest/globals';

jest.mock("../hooks/useFetchWithAuth");

const mockFetchWithAuth = jest.fn();
useFetchWithAuth.mockReturnValue(mockFetchWithAuth);

describe("TeacherAttendance", () => {
  beforeEach(() => {
    mockFetchWithAuth.mockReset();
  });

  it("renders the component and displays loading state", async () => {
    mockFetchWithAuth.mockResolvedValueOnce({
      json: async () => ({ success: true, data: [] }),
    });

    render(<TeacherAttendance />);

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(mockFetchWithAuth).toHaveBeenCalledWith("/api/teacher/classes"));
  });

  it("displays error message when fetching classes fails", async () => {
    mockFetchWithAuth.mockRejectedValueOnce(new Error("Failed to fetch"));

    render(<TeacherAttendance />);

    await waitFor(() => expect(screen.getByText(/unable to connect to the server/i)).toBeInTheDocument());
  });

  it("displays classes and allows selecting a class", async () => {
    mockFetchWithAuth.mockResolvedValueOnce({
      json: async () => ({ success: true, data: [{ _id: "1", name: "Class 1", section: "A" }] }),
    });

    render(<TeacherAttendance />);

    await waitFor(() => expect(screen.getByText(/class 1/i)).toBeInTheDocument());

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });
    expect(screen.getByRole("combobox").value).toBe("1");
  });

  it("fetches and displays students when a class is selected", async () => {
    mockFetchWithAuth
      .mockResolvedValueOnce({
        json: async () => ({ success: true, data: [{ _id: "1", name: "Class 1", section: "A" }] }),
      })
      .mockResolvedValueOnce({
        json: async () => ({ success: true, data: [{ _id: "s1", name: "Student 1", rollNumber: "101" }] }),
      });

    render(<TeacherAttendance />);

    await waitFor(() => expect(screen.getByText(/class 1/i)).toBeInTheDocument());

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });

    await waitFor(() => expect(screen.getByText(/student 1/i)).toBeInTheDocument());
  });

  it("marks attendance and displays success message", async () => {
    mockFetchWithAuth
      .mockResolvedValueOnce({
        json: async () => ({ success: true, data: [{ _id: "1", name: "Class 1", section: "A" }] }),
      })
      .mockResolvedValueOnce({
        json: async () => ({ success: true, data: [{ _id: "s1", name: "Student 1", rollNumber: "101" }] }),
      })
      .mockResolvedValueOnce({
        json: async () => ({ success: true }),
      });

    render(<TeacherAttendance />);

    await waitFor(() => expect(screen.getByText(/class 1/i)).toBeInTheDocument());

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });

    await waitFor(() => expect(screen.getByText(/student 1/i)).toBeInTheDocument());

    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByText(/mark attendance/i));

    await waitFor(() => expect(screen.getByText(/attendance marked successfully/i)).toBeInTheDocument());
  });
});
