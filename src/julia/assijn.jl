#= ASSIJN Accounting Software =#

using Currencies
using Accounting
using Mux
using JSON

include("test-ledger.jl")

ormatch(r::RegexMatch, x) = r.match
ormatch(r::Void, x) = x
extension(f) = ormatch(match(r"(?<=\.)[^\.\\/]*$", f), "")
fileheaders(f) = Dict("Content-Type" =>
    get(Mux.mimetypes, extension(f), "application/octet-stream"))
redirectheaders(loc) = Dict(
    "Location" => loc)

fileresponse(f) = Dict(
    :file => f,
    :body => open(readbytes, f),
    :headers => fileheaders(f))

staticfile(path) = req -> fileresponse(path)

function serveledger(req)
    accountid = req[:params][:aid]
end

function servebalancesheet(req)
    s = if haskey(req[:params], :cur)
        valuate(ecbrates(), Symbol(req[:params][:cur]), balancesheet(ledger))
    else balancesheet(ledger) end

    Dict(
        :body => json(s),
        :headers => Dict("Content-Type" => "application/json"))
end

@app assijn = (
    Mux.defaults,
    page("/ledger/:aid", serveledger),
    page("/bs/", servebalancesheet),
    page("/bs/:cur", servebalancesheet),
    page("/", staticfile("lijn-build/assijn.html")),
    page("/react.js", staticfile("lijn-build/react.js")),
    page("/react-dom.js", staticfile("lijn-build/react-dom.js")),
    page("/assijn.js", staticfile("lijn-build/assijn.js")),
    page("/assijn.css", staticfile("lijn-build/assijn.css")),
    Mux.notfound())

serve(assijn)
