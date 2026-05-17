"""A small command-line calculator.

Run this file with Python and choose an operation from the menu. The module
also exposes simple arithmetic functions that can be imported elsewhere.
"""

from __future__ import annotations


def add(left: float, right: float) -> float:
    """Return the sum of two numbers."""
    return left + right


def subtract(left: float, right: float) -> float:
    """Return the difference between two numbers."""
    return left - right


def multiply(left: float, right: float) -> float:
    """Return the product of two numbers."""
    return left * right


def divide(left: float, right: float) -> float:
    """Return the quotient of two numbers.

    Raises:
        ValueError: If ``right`` is zero.
    """
    if right == 0:
        raise ValueError("Cannot divide by zero.")
    return left / right


OPERATIONS = {
    "1": ("add", add),
    "2": ("subtract", subtract),
    "3": ("multiply", multiply),
    "4": ("divide", divide),
}


def read_number(prompt: str) -> float:
    """Read a valid floating-point number from standard input."""
    while True:
        raw_value = input(prompt).strip()
        try:
            return float(raw_value)
        except ValueError:
            print("Please enter a valid number.")


def main() -> None:
    """Run the interactive calculator."""
    print("Simple Calculator")
    print("1. Add")
    print("2. Subtract")
    print("3. Multiply")
    print("4. Divide")

    choice = input("Choose an operation (1-4): ").strip()
    if choice not in OPERATIONS:
        print("Invalid operation.")
        return

    left = read_number("Enter the first number: ")
    right = read_number("Enter the second number: ")
    operation_name, operation = OPERATIONS[choice]

    try:
        result = operation(left, right)
    except ValueError as error:
        print(error)
        return

    print(f"Result ({operation_name}): {result:g}")


if __name__ == "__main__":
    main()
