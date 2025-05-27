import express from 'express'

const app = express();
app.use(express.json())
const PORT = 54253


//values
let budget = 0
const expenses = {}
let expenseID = 1
let spending = Object.values(expenses).reduce((sum, curr) => sum + curr, 0)

let over = false


//routes
app.get("/", handleGetBudgetAndExpenses)
app.get("/budget", handleGetBudget)
app.get("/expenses", handleGetExpenses)
app.post("/newbudget", handleNewBudget)
app.post("/newspend", handleNewSpend)
app.post("/updateSpend", updateSpend)

function handleGetBudgetAndExpenses(req,res){
    const response = {budget: budget, expenses: expenses, over: over}
    return res.status(200).json(response)
}
function handleGetBudget(req,res){
    const response = {budget: budget}
    return res.status(200).json(response)
}
function handleGetExpenses(req,res){
    const response = {expenses: expenses}
    return res.status(200).json(response)
}

function handleNewBudget(req,res){
    const newBudget = Number(req.query.amount)
    if (!isNaN(newBudget)) {
    budget = newBudget;
    return res.status(200).send();
    } else {
        return res.status(400).json({error:"Invalid budget."})
    }

}

function handleNewSpend(req,res){
    const amount = Number(req.query.amount)

    if (!req.query.amount || isNaN(amount)) {
        return res.status(400).json({ error: "Invalid amount." });
    }
    const thisID = expenseID
    expenses[thisID] = amount
    expenseID += 1


    spending += amount
    over = spending > budget;
    
    const response = {spendID: thisID, budgetState: over}
    return res.status(200).json(response)

}

function updateSpend(req,res){
    let {expenseID, newAmount} = req.body
    expenseID = Number(expenseID);
    newAmount = Number(newAmount);

    if (
        isNaN(expenseID) ||
        !(expenseID in expenses) ||
        isNaN(newAmount)
    ) {
        return res.status(400).json({ error: "Invalid expense ID or new amount" });
    }
    spending -= expenses[expenseID];
    expenses[expenseID] = newAmount;
    spending += newAmount;

    over = spending > budget;
    const response = { budgetState: over };

    return res.status(200).json(response);
}

app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}...`);
});