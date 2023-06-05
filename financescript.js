document.addEventListener('DOMContentLoaded', function() {
    let transactions = [];
    let balance = 0;
  
    const balanceNumberElement = document.getElementById('balance-number');
    const balanceWordsElement = document.getElementById('balance-words');
    const transactionTableBody = document.querySelector('#transaction-table tbody');
    const addBtn = document.getElementById('add-btn');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const typeSelect = document.getElementById('type');
  
    // Update balance elements
    function updateBalance() {
      balanceNumberElement.textContent = formatNumber(balance);
      balanceWordsElement.textContent = convertNumberToWords(balance);
    }
  
    // Format number with commas
    function formatNumber(num) {
      return num.toLocaleString('en-IN');
    }
  
    // Convert number to words
    function convertNumberToWords(num) {
      const words = [
        '',
        'One',
        'Two',
        'Three',
        'Four',
        'Five',
        'Six',
        'Seven',
        'Eight',
        'Nine',
        'Ten',
        'Eleven',
        'Twelve',
        'Thirteen',
        'Fourteen',
        'Fifteen',
        'Sixteen',
        'Seventeen',
        'Eighteen',
        'Nineteen'
      ];
      const tens = [
        '',
        '',
        'Twenty',
        'Thirty',
        'Forty',
        'Fifty',
        'Sixty',
        'Seventy',
        'Eighty',
        'Ninety'
      ];
  
      if (num === 0) {
        return 'Zero Rupees Only';
      }
  
      // Function to convert a three-digit number to words
      function convertThreeDigitNumber(num) {
        let wordsStr = '';
  
        if (num >= 100) {
          wordsStr += words[Math.floor(num / 100)] + ' Hundred ';
          num %= 100;
        }
  
        if (num >= 20) {
          wordsStr += tens[Math.floor(num / 10)] + ' ';
          num %= 10;
        }
  
        if (num > 0) {
          wordsStr += words[num] + ' ';
        }
  
        return wordsStr.trim();
      }
  
      let wordsStr = '';
      let crore = Math.floor(num / 10000000);
      num %= 10000000;
      let lakh = Math.floor(num / 100000);
      num %= 100000;
      let thousand = Math.floor(num / 1000);
      num %= 1000;
  
      if (crore > 0) {
        wordsStr += convertThreeDigitNumber(crore) + ' Crore ';
      }
  
      if (lakh > 0) {
        wordsStr += convertThreeDigitNumber(lakh) + ' Lakh ';
      }
  
      if (thousand > 0) {
        wordsStr += convertThreeDigitNumber(thousand) + ' Thousand ';
      }
  
      if (num > 0) {
        wordsStr += convertThreeDigitNumber(num);
      }
  
      wordsStr += 'Rupees Only';
  
      return wordsStr.trim();
    }
  
    // Add transaction
    function addTransaction() {
      const description = descriptionInput.value.trim();
      const amount = +amountInput.value;
      const type = typeSelect.value;
  
      if (description === '' || !amount || amount <= 0) {
        alert('Please enter a valid description and amount.');
        return;
      }
  
      const transaction = {
        id: new Date().getTime(),
        description,
        amount,
        type,
      };
  
      transactions.push(transaction);
      balance += type === 'income' ? amount : -amount;
      updateBalance();
      updateTransactionTable();
  
      descriptionInput.value = '';
      amountInput.value = '';
      typeSelect.value = 'income';
      descriptionInput.focus();
    }
  
    // Delete transaction
    function deleteTransaction(id) {
      const transaction = transactions.find(transaction => transaction.id === id);
      if (!transaction) return;
  
      transactions = transactions.filter(transaction => transaction.id !== id);
      balance -= transaction.type === 'income' ? transaction.amount : -transaction.amount;
      updateBalance();
      updateTransactionTable();
    }
  
    // Update transaction table
    function updateTransactionTable() {
      transactionTableBody.innerHTML = '';
  
      transactions.forEach(transaction => {
        const row = document.createElement('tr');
  
        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = transaction.description;
  
        const amountCell = document.createElement('td');
        amountCell.textContent = formatNumber(transaction.amount);
  
        const typeCell = document.createElement('td');
        typeCell.textContent = transaction.type;
  
        const actionCell = document.createElement('td');
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteTransaction(transaction.id));
        actionCell.appendChild(deleteBtn);
  
        row.appendChild(descriptionCell);
        row.appendChild(amountCell);
        row.appendChild(typeCell);
        row.appendChild(actionCell);
  
        transactionTableBody.appendChild(row);
      });
    }
  
    // Event listeners
    addBtn.addEventListener('click', addTransaction);
  
    // Initial update
    updateBalance();
    updateTransactionTable();
  
    // Set the personal finance variable from local storage
    const varname = localStorage.getItem('varname');
    const financeVariableElement = document.querySelector('.finance-variable');
    if (varname) {
      financeVariableElement.textContent = `Personal Finance Management of ${varname}`;
    }
  });
  