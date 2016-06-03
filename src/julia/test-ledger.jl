# sample ledger
@usingcurrencies USD, CAD

# make a ledger for testing
ledger = Ledger()

cash = asset!(ledger, "Cash")
ob = equity!(ledger, "Opening Balance")

transfer!(ledger, Date(2015, 11, 29), ob, cash, 100USD)

bal = balances(ledger)

# simulate some activity
bankloan = liability!(ledger, "Bank Loan")
inventory = asset!(ledger, "Inventory")
cogs = expense!(ledger, "Cost of Goods Sold")
rent = expense!(ledger, "Rent Expense")
sales = revenue!(ledger, "Sales")

transfer!(ledger, Date(2015, 11, 30), bankloan, cash, 5000USD)
transfer!(ledger, Date(2015, 12, 01), cash, inventory, 1000USD)
transfer!(ledger, Date(2015, 12, 02), inventory, cogs, 20USD)
transfer!(ledger, Date(2015, 12, 02), sales, cash, 30CAD)
transfer!(ledger, Date(2015, 12, 03), bankloan, cash, 2000USD)
transfer!(ledger, Date(2015, 12, 04), cash, rent, 50CAD)

for i in 5:10
    sale = rand(10CAD:0.01CAD:20CAD)
    itemcost = valuate(Dict(:CAD => 0.7, :USD => 1.0), :USD, sale)
    transfer!(ledger, Date(2015, 12, i), inventory, cogs, itemcost)
    transfer!(ledger, Date(2015, 12, i), sales, cash, sale)
end

bal = balances(ledger)
