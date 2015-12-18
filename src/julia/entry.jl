using Base.REPL

print("""

  ASSIJN  ║  Flexible multi-currency accounting
          ║  Documentation: https://github.com/totalverb/assijn
          ║  Type “help” for help.
          ║
          ║  Version $VERSION ($DATE)
""")
println()

COMMANDS = ["help", "rebuild"]

# like Base.Docs.print_correction
function print_correction(io, word)
    cors = Base.Docs.levsort(word, COMMANDS)
    print(io, "Perhaps consider: ")
    print(io, "“" * cors[1] * "”")
    println(io, ".")
end

while true
    print_with_color(:green, "assijn> ")
    input = readline()
    if isempty(input)
        break
    else
        input = strip(input)
    end

    if input == "help"
        println("""
        Currently this command-line UI is mostly useless.

        To run a Julia command, type ], then the Julia command.

        If you want to quit the program, send an EOF (end of file) with Ctrl-D.
        """)
    elseif input == "rebuild"
        print_with_color(:blue, "INFO: Rerunning Gulp...\n")
        run(bs)
        println()
    elseif input[1] == ']'
        try
            println(eval(parse(input[2:end])))
            println()
        catch e
            bt = catch_backtrace()
            Base.with_output_color(:red, STDOUT) do io
                print(io, e, bt, "\n")
            end
            println()
        end
    else
        print_with_color(:red, "ERROR: I can’t understand your command.\n")
        print_correction(STDOUT, input)
        println("Type “help” for help.")
        println()
    end
end
