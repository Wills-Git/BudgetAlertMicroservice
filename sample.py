import requests

BASE_URL = "http://localhost:54253"

def get_overview():
    response = requests.get(f"{BASE_URL}/")
    print("Current State:", response.json())

def set_budget():
    amount = input("Enter new budget amount: ")
    response = requests.post(f"{BASE_URL}/newbudget", params={"amount": amount})
    print("Budget updated." if response.ok else "Failed to update budget.")

def add_expense():
    amount = input("Enter expense amount: ")
    response = requests.post(f"{BASE_URL}/newspend", params={"amount": amount})
    print("Expense added:", response.json() if response.ok else "Failed to add expense.")

def update_expense():
    expense_id = input("Enter expense ID to update: ")
    new_amount = input("Enter new amount: ")
    payload = {
        "expenseID": int(expense_id),
        "newAmount": float(new_amount)
    }
    response = requests.post(f"{BASE_URL}/updateSpend", json=payload)
    print("Expense updated:", response.json() if response.ok else "Failed to update expense.")

def main():
    while True:
        print("\n--- Budget Tracker ---")
        print("1. Get Budget and Expenses")
        print("2. Set Budget")
        print("3. Add Expense")
        print("4. Update Expense")
        print("5. Exit")
        choice = input("Choose an action: ")

        if choice == "1":
            get_overview()
        elif choice == "2":
            set_budget()
        elif choice == "3":
            add_expense()
        elif choice == "4":
            update_expense()
        elif choice == "5":
            print("Exiting...")
            break
        else:
            print("Invalid option")

if __name__ == "__main__":
    main()