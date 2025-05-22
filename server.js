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
    budget = newBudget;
    return res.status(200).send();
}

function handleNewSpend(req,res){
    const amount = Number(req.query.amount)
    const thisID = expenseID
    expenses[thisID] = amount
    expenseID += 1


    spending += amount
    over = spending > budget;
    
    const response = {spendID: thisID, over: over}
    return res.status(200).json(response)

}

function updateSpend(req,res){
    let {expenseID, newAmount} = req.body
    console.log(expenseID, newAmount)
    expenseID = Number(expenseID)
    spending -= expenses[expenseID] 
    expenses[expenseID] = Number(newAmount)
    spending += Number(newAmount)
    over = spending > budget

    const response = {over: over}
    return res.status(200).json(response)

}

app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}...`);
});