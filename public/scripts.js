// public/scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
  
    const renderExpenses = (expenses) => {
      expenseList.innerHTML = '';
      expenses.forEach((expense) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${expense.description}</span>
          <span>${expense.amount}</span>
          <button data-id="${expense.id}" class="delete-btn">Delete</button>
        `;
        expenseList.appendChild(li);
      });
    };
  
    const getExpenses = async () => {
      const response = await fetch('/expenses');
      const expenses = await response.json();
      renderExpenses(expenses);
    };
  
    const addExpense = async (description, amount) => {
      const response = await fetch('/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, amount }),
      });
      const newExpense = await response.json();
      getExpenses();
      return newExpense;
    };
  
    const deleteExpense = async (id) => {
      await fetch(`/expenses/${id}`, { method: 'DELETE' });
      getExpenses();
    };
  
    expenseForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const description = document.getElementById('description').value;
      const amount = document.getElementById('amount').value;
      await addExpense(description, amount);
      expenseForm.reset();
    });
  
    expenseList.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-btn')) {
        const id = event.target.getAttribute('data-id');
        deleteExpense(id);
      }
    });
  
    getExpenses();
  });
  