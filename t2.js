class Game  {
    constructor()   {
        this.canvas
        this.context
        this.GAME_WIDTH
        this.GAME_HEIGHT
        this.positions = [
                          [ 0, 0, 0 ],
                          [ 0, 0, 0 ], 
                          [ 0, 0, 0 ] 
                        ]
        this.count = 0
        this.flag = 0

        this.points = [0, 0] // 0 = O, 1 = X
        this.form = true // true = X, O false = O, X
        this.people = true // false = p, c  true = p, p
    }
    
    startGame() {
        this.canvas = document.getElementById("canvas")
        this.context = canvas.getContext("2d")
        this.GAME_WIDTH = this.canvas.width
        this.GAME_HEIGHT = this.canvas.height
        console.log("Game started successfully!!!")
    }

    generateFirstFrame()    {
        this.context.beginPath()
        for(var i = 1; i < 3; i++)  {
            this.context.moveTo((this.GAME_WIDTH/3)*i, 10)
            this.context.lineTo((this.GAME_WIDTH/3)*i, this.GAME_HEIGHT - 10)
        }
        for(i = 1; i < 3; i++)  {
            this.context.moveTo(10, (this.GAME_HEIGHT/3)*i)
            this.context.lineTo(this.GAME_WIDTH - 10, (this.GAME_HEIGHT/3)*i)
        }
        this.context.stroke()
    }

    winCheck()  {
        var tmp, y, x, key

        for(y = 0; y < 3; y++)  {
            key = this.positions[y][0]
            if(key != 0)    {
                if(this.positions[y].every((value) => {
                    return (key == value)
                }) == true) {
                    return key
                }
            }
        }

        for(x = 0; x < 3; x++)  {
            key = this.positions[0][x]
            if(key != 0)    {
                tmp = key
                for(y = 1; y < 3; y++)  {
                    if(this.positions[y][x] != key) {
                        tmp = 0
                        break
                    }
                }
                if(tmp != 0)    {
                    return key
                }
            }
        }

        key = this.positions[0][0]
        if(key != 0)    {
            for(x = 1, y = 1; x != 3; x++, y++) {
                if(this.positions[y][x] != key) {
                    key = 0
                    break
                }
            }
        }
        if(key != 0)    {
            return key
        }

        key = this.positions[2][0]
        if(key != 0)    {
            for(x = 1, y = 1; x != 3; x++, y--) {
                if(this.positions[y][x] != key) {
                    key = 0
                    break
                }
            }
        }
        if(key != 0)    {
            return key
        }

        return 0
    }

    endMessage(winner)  {
        if(winner == 1 + this.form) {
            console.log("The winner is: X")
            document.getElementById("winner").innerHTML = "Winner: X"
            this.points[1]++
            console.log(this.points)
            return 1
        }else if(winner == 2 - this.form)   {
            console.log("The winner is: O")
            document.getElementById("winner").innerHTML = "Winner: 0"
            this.points[0]++
            console.log(this.points)
            return 1 // ;)
        }

        return 0
    }

    imageGen(x, y, form)  {
        var img = new Image()
        var img1 = "x_t.png"
        var img2 = "o_t.png"
        img.onload = () =>  {
            console.log("loaded " + (form == this.form ? img1 : img2))
            this.context.drawImage(img ,this.GAME_HEIGHT/3 * x, this.GAME_WIDTH/3 * y, this.GAME_HEIGHT/3, this.GAME_WIDTH/3)
        }
        img.src = (form == this.form ? img1 : img2)
    }

    turn(x, y)  {
        var flag = 0
        if(this.positions[y][x] != 0)   {
            console.log("Not empty, try again")
        }else   {
            this.count++
            this.positions[y][x] = this.count%2 + 1
            this.imageGen(x, y, this.count%2)
            
            console.log(["x: " + x, "y: " + y, "turn: " + (this.positions[y][x] == 1 ? 'X' : 'O')])
            
            if(flag != 1)
                flag = this.endMessage(this.winCheck())

            if(this.count == 9 && flag != 1) {
                flag = 1
                document.getElementById("winner").innerHTML = "Winner: tie"
            }

            if(this.people == false)    {
                this.count++
                if(this.count != 8 && flag != 1)  {
                    console.log("flag = ", flag)
                    this.ComputerTurnEasy()
                    flag = this.endMessage(this.winCheck())
                }else   {
                    flag = 1
                    if(this.count > 9)
                        document.getElementById("winner").innerHTML = "Winner: tie"
                }
                    
            }
        }
        return flag
    }

    ComputerTurnEasy()  {
        var x, y
        do{
            x = Math.random() * 100, y = Math.random() * 100
            x = x.toFixed(0) % 3, y = y.toFixed(0) % 3
        }while(this.positions[y][x] != 0)
        console.log([x, y])
        this.positions[y][x] = 1
        this.imageGen(x, y, 0)
    }

    mouseClick()    {
        var click = {
            x: 0,
            y: 0
        }
        var x, y
        this.canvas.addEventListener("mousedown", (event) => {
            var tmp = this.canvas.getBoundingClientRect()
            click.x = event.clientX - tmp.left
            click.y = event.clientY - tmp.top

            if(this.flag == 0)   {
                for(var i = 1; i <= 3; i++) {
                    if((this.GAME_WIDTH/3)*i > click.x) {
                        x = i-1
                        break
                    }
                }

                for(i = 1; i <= 3; i++) {
                    if((this.GAME_HEIGHT/3)*i > click.y)    {
                        y = i-1
                        break
                    }   
                }

                this.flag = this.turn(x, y)
                console.log(game.positions)
            }
        })
    }

    newGame()   {
        this.context.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT)
        this.generateFirstFrame()
        this.positions = [ 
                           [ 0, 0, 0 ], 
                           [ 0, 0, 0 ], 
                           [ 0, 0, 0 ] 
                         ]
        this.count = 0
        this.flag = 0
        console.log(this.points)
        document.getElementById("winner").innerHTML = "Winner:    "
    }

    game()  {
        this.startGame()
        this.generateFirstFrame()
        this.mouseClick()
    }
}

var game = new Game()
game.game()

function PersonVsPerson()   {
    game.people = true
    game.newGame()
}

function PersonVsComp()   {
    game.people = false
    game.newGame()
}

function O()   {
    game.form = false
    game.newGame()
}

function X()   {
    game.form = true
    game.newGame()
}