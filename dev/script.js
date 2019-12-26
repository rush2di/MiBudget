class UI {
  constructor() {
    this.budgetBalance = document.querySelector(".budget_balance");
    this.budgetIncome = document.querySelector(".budget_income_value");
    this.budgetExpenses = document.querySelector(".budget_expenses_value");
    this.expPercentage = document.querySelector(".budget_expenses_percentage");
    this.notif = document.querySelector(".notif");
    this.form = document.querySelector(".add_val");
    this.inputType = document.querySelector(".type_select");
    this.inputDes = document.querySelector(".add_description");
    this.inputAmount = document.querySelector(".add_value");
    this.subBtn = document.querySelector(".add_btn");
    this.incomeDOM_li = document.querySelector(".income_ui");
    this.expenseDOM_li = document.querySelector(".expense_ui");
    this.incomeList = [];
    this.expenseList = [];
    this.itemId = 0;
  }
  // form submit method
  formSubmit() {
    const type = this.inputType.value,
      description = this.inputDes.value,
      amount =
        this.inputAmount.value !== "" && parseInt(this.inputAmount.value);
    if (description === "" || amount < 0 || amount === false) {
      this.notif.classList.add("shown");
      this.notif.innerHTML = `<p>missing values</p>`;
      const portal = this;
      setTimeout(() => {
        portal.notif.classList.remove("shown");
      }, 4000);
    } else {
      let item = { id: this.itemId, type, description, amount };
      type === "inc" ? this.incomeList.push(item) : this.expenseList.push(item);
      this.inputDes.value = "";
      this.inputAmount.value = "";
      this.listsRenderToDOM(type, this.itemId, description, amount);
      console.log(this.incomeList);
      this.showBalance();
      this.itemId++;
    }
  }
  // method to calculate the total
  // balance and render a convenient
  // color depending on balance state
  showBalance() {
    let income = this.totalIncome();
    let expense = this.totalExpense();
    let balance = income - expense;
    let percentage = income > 0 ? Math.round((expense / income) * 100) : 0;
    this.expPercentage.innerHTML = `${percentage}%`;
    this.budgetBalance.innerHTML = balance.toFixed(2);
    if (balance > 0) {
      this.budgetBalance.style.color = "#55b759";
    } else if (balance === 0) {
      this.budgetBalance.style.color = "white";
    } else if (balance < 0) {
      this.budgetBalance.style.color = "#f44336";
    }
    return balance;
  }
  // methods to calculate the total
  // of income and expense sources
  totalIncome() {
    if (this.incomeList.length > 1) {
      let calc = this.incomeList.reduce((acc, { amount }) => {
        return acc + amount;
      }, 0);
      let total = calc.toFixed(2);
      this.budgetIncome.innerHTML = total;
      return total;
    } else if (this.incomeList.length === 1) {
      let firstSub = this.incomeList[0].amount.toFixed(2);
      this.budgetIncome.innerHTML = firstSub;
      return firstSub;
    }
    return 0.0;
  }
  totalExpense() {
    if (this.expenseList.length > 1) {
      let calc = this.expenseList.reduce((acc, { amount }) => {
        return acc + amount;
      }, 0);
      let total = calc.toFixed(2);
      this.budgetExpenses.innerHTML = total;
      return total;
    } else if (this.expenseList.length === 1) {
      let firstSub = this.expenseList[0].amount.toFixed(2);
      this.budgetExpenses.innerHTML = firstSub;
      return firstSub;
    }
    return 0.0;
  }
  // method to render income
  // and expense lists to DOM
  listsRenderToDOM(type, id, description, amount) {
    if (type === "inc") {
      const div = document.createElement("div");
      div.setAttribute("id", id);
      div.classList.add("income_list");
      const newListID = document.createElement("div");
      newListID.classList.add("list_item");
      newListID.innerHTML = `
        <div>${description}</div>
        <div id="amount">
          <div class="budget_income_value">${amount.toFixed(2)}</div>
          <div id="delete_btn">x</div>
        </div>
      </div>`;
      div.appendChild(newListID);
      this.incomeDOM_li.appendChild(div);
    } else if (type === "exp") {
      const div = document.createElement("div");
      div.setAttribute("id", id);
      div.classList.add("expense_list");
      const newListID = document.createElement("div");
      newListID.classList.add("list_item");
      newListID.innerHTML = `
        <div>${description}</div>
        <div id="amount">
          <div class="budget_expense_value">${amount.toFixed(2)}</div>
          <div id="delete_btn">x</div>
        </div>
      </div>`;
      div.appendChild(newListID);
      this.expenseDOM_li.appendChild(div);
    }
  }
  // delete button handler method: deletes
  // the target from the DOM, and from the array
  // storing its values,then updates the balance
  deleteBtn(e) {
    let deleteTarget = e.parentElement.parentElement.parentElement;
    let classScraper = deleteTarget.className;
    let idScraper = deleteTarget.getAttribute("id");
    if (classScraper === "income_list") {
      const targetIndex = this.incomeList.findIndex(a => {
        return a.id == idScraper;
      });
      this.incomeList.splice(targetIndex, 1);
    } else if (classScraper === "expense_list") {
      const targetIndex = this.expenseList.findIndex(a => {
        return a.id == idScraper;
      });
      this.expenseList.splice(targetIndex, 1);
    }
    deleteTarget.remove();
    this.showBalance();
  }
}

let appInit = () => {
  const form = document.querySelector(".add_val"),
    tables = document.querySelector(".tables");
  // new UI class instance
  const ui = new UI();
  // form submit event handler
  form.addEventListener("submit", e => {
    e.preventDefault();
    ui.formSubmit();
  });
  // delete button handler for newly
  // added income and expense lists
  tables.addEventListener("click", e => {
    if (e.srcElement.id === "delete_btn") {
      ui.deleteBtn(e.target);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  appInit();
});
