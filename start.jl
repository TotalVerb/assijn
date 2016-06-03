#! /usr/bin/julia --color=yes

# helper functions
function print_header(header)
    print_with_color(:yellow, header, "\n")
    print_with_color(:yellow, "≡" ^ length(header), "\n")
    println()
end

# assijn version
VERSION = v"0.0.0"
DATE = Date(2015, 12, 11)

# execute build script
println("Hey! We’re booting up ASSIJN. Thank you for trying our product!")
println("It might take some time, so please be patient.")
println()
print_header("Executing Build Script")

bs = `gulp build`
run(bs)

println()

# execute daemon
print_header("Starting ASSIJN")

print_with_color(:green, "NB! ")
println("Don’t mind the warnings. They’ll be gone in a future release.")

include("lijn-build/assijn.jl")


# interactive mode
print_header("Welcome to ASSIJN")

include("lijn-build/entry.jl")
