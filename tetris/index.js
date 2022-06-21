window.addEventListener('keydown', function (e) {
    if(e.key == " ") e.preventDefault;
})

class Tetris    {
    constructor()   {
        this.canvas = document.getElementById("canvas")
        this.contex = this.canvas.getContext("2d")
        this.GAME_WIDTH = this.canvas.width
        this.GAME_HEIGHT = this.canvas.height
        this.board = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.speed = 750
        this.points =  0
        this.time
        this.currpiece = []
        this.currpos
        this.nextpiece = []
        this.interval
        this.end_game = false
    }

    Updater()   {
        var x, y, leny = this.board.length, lenx = this.board[0].length
        for(y = 0; y < leny; y++)   {
            for(x = 0; x < lenx; x++)   {
                this.screenDrawer(this.board[y][x], x, y)
            }
        }
    }

    screenDrawer(type, x, y)  {
        switch(type)    {
            case 1:
                this.contex.fillStyle = "red"
                this.contex.fillRect(this.GAME_WIDTH/10 * x, this.GAME_HEIGHT/20 * y, this.GAME_WIDTH/10, this.GAME_HEIGHT/20)
                break
            case 2:
                this.contex.fillStyle = "blue"
                this.contex.fillRect(this.GAME_WIDTH/10 * x, this.GAME_HEIGHT/20 * y, this.GAME_WIDTH/10, this.GAME_HEIGHT/20)
                break
            case 3:
                this.contex.fillStyle = "yellow"
                this.contex.fillRect(this.GAME_WIDTH/10 * x, this.GAME_HEIGHT/20 * y, this.GAME_WIDTH/10, this.GAME_HEIGHT/20)
                break
            case 4:
                this.contex.fillStyle = "orange"
                this.contex.fillRect(this.GAME_WIDTH/10 * x, this.GAME_HEIGHT/20 * y, this.GAME_WIDTH/10, this.GAME_HEIGHT/20)
                break
            case 5:
                this.contex.fillStyle = "brown"
                this.contex.fillRect(this.GAME_WIDTH/10 * x, this.GAME_HEIGHT/20 * y, this.GAME_WIDTH/10, this.GAME_HEIGHT/20)
                break
            case 6:
                this.contex.fillStyle = "pink"
                this.contex.fillRect(this.GAME_WIDTH/10 * x, this.GAME_HEIGHT/20 * y, this.GAME_WIDTH/10, this.GAME_HEIGHT/20)
                break
            case 7:
                this.contex.fillStyle = "purple"
                this.contex.fillRect(this.GAME_WIDTH/10 * x, this.GAME_HEIGHT/20 * y, this.GAME_WIDTH/10, this.GAME_HEIGHT/20)
                break
        }
    }

    leftRight() {
        document.addEventListener("keydown", (event) => {
            console.log(event.code);
            event.preventDefault();
            switch(event.code)   {
                case "ArrowLeft":
                    if(this.currpos != 0)   {
                        this.currpos--
                        console.log(this.currpos)
                        if(this.pieceCheck() == true){
                            this.currpos++
                        }else   {
                            this.contex.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT)
                            this.draw()
                            this.Updater()
                        }
                    }
                    break
                case "ArrowUp":
                    this.rotatePiece()
                    break
                case "ArrowRight":
                    if(this.currpos + this.currpiece[0].length - 1 != 9)  {
                        this.currpos++
                        console.log(this.currpos)
                        if(this.pieceCheck() == true){
                            this.currpos--
                        }else   {
                            this.contex.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT)
                            this.draw()
                            this.Updater()
                        }
                    }
                    break
                case "ArrowDown":
                    if(this.end_game != true && this.speed != 100)  {
                        clearInterval(this.interval)
                        this.speed = 100
                        this.gameLoop()
                    }
                    break
            }
        })

        document.addEventListener("keyup", (event) => {
            console.log(event.code)
            if(event.code == "ArrowDown" && this.end_game != true)  {
                clearInterval(this.interval)
                this.speed = 750
                this.gameLoop()
            }
        })
    }

    draw()  {
        var x, y, i, j
        for(y = this.time, i = 0; i < this.currpiece.length; y++, i++)   {
            for(x = this.currpos, j = 0; j < this.currpiece[i].length; x++, j++)   {
                this.screenDrawer(this.currpiece[i][j], x, y)
            }
        }

    }

    pieceGen(type)  {
        var piece
        switch(type)    {
            case 1:
                piece = [
                    [1, 1, 1],
                    [0, 1, 0]
                ]
                break
            case 2:
                piece = [
                    [2, 2],
                    [2, 2]
                ]
                break
            case 3:
                piece = [
                    [3, 0],
                    [3, 0],
                    [3, 3]
                ]
                break
            case 4:
                piece = [
                    [0, 4],
                    [0, 4],
                    [4, 4]
                ]
                break
            case 5:
                piece = [
                    [5],
                    [5],
                    [5],
                    [5]
                ]
                break
            case 6:
                piece = [
                    [0, 6, 6],
                    [6, 6, 0]
                ]
                break
            case 7:
                piece = [
                    [7, 7, 0],
                    [0, 7, 7]
                ]
                break
        }
        console.log(piece)
        this.time = - piece.length
        this.currpiece = this.nextpiece
        this.nextpiece = piece
        this.currpos = 4
    }

    GAME()  {
        document.getElementById("result").innerHTML = "GAME RUNNING"
        document.getElementById("result2").innerHTML = "POINTS: " + this.points
        this.leftRight()
        this.pieceGen((Math.random() * 100).toFixed(0) % 7 + 1)
        this.pieceGen((Math.random() * 100).toFixed(0) % 7 + 1)
        this.gameLoop()
    }

    gameLoop()  {
        this.interval = setInterval(() => {
            this.contex.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT)
            this.draw()
            this.Updater()
            this.time++
            if(this.time * (this.GAME_HEIGHT/20) + this.currpiece.length * (this.GAME_HEIGHT/20) > this.GAME_HEIGHT || this.pieceCheck() == true)    {
                this.time--
                var i, j, lenx = this.currpiece[0].length, leny = this.currpiece.length
                for(i = 0; i < leny; i++)    {
                    for(j = 0; j < lenx; j++)    {
                        if(this.currpiece[i][j] != 0 && (i + this.time) >= 0)
                            this.board[i + this.time][j + this.currpos] = this.currpiece[i][j]
                    }
                }
                if(this.rowCheck() == false)    {
                    clearInterval(this.interval)
                    this.end_game = true
                }
                document.getElementById("result2").innerHTML = "POINTS: " + this.points
                this.pieceGen((Math.random() * 100).toFixed(0) % 7 + 1)
            }
        }, this.speed)
    }

    rowCheck()  {
        if(this.endGame() == true)  return false

        var board = this.board.reverse()
        var i, f, found = []
        for(i = 0; i < 19; i++) {
            f = board[i].every((value) => {
                return (value != 0)
            })
            if(f == true)
                found.push(i)
        }
        
        if(found.length != 0)   {
            for(i = found[0] + 1, f = 1; i < 19; i++)  {
                if(i == found[f])  {
                    f++
                    continue
                }
                board[i].forEach((value, index) => {
                    board[i - f][index] = value
                })
            }
            
            this.points += f * 100
            this.screenDrawer()
        }
        this.board = board.reverse()
        console.log(this.board)
        console.log(f)
        return true
    }

    pieceCheck()    {
        var x, y, i, j, leny = this.currpiece.length, lenx = this.currpiece[0].length, flag = false
        for(i = 0, y = this.time; i < leny; i++, y++)    {
            for(j = 0, x = this.currpos; j < lenx; j++, x++)    {
                if(y >= 0 && this.currpiece[i][j] != 0 && this.board[y][x] != 0)  {
                    flag = true
                    break
                }
            }
            if(flag == true)
                break
        }
        console.log(flag)
        return flag
    }

    rotatePiece()   {
        var piece = [], lenx, leny, x, y
        do{
            piece = []
            leny = this.currpiece.length
            lenx = this.currpiece[0].length
            for(x = 0; x < lenx; x++)   {
                piece.push([])
                for(y = 0; y < leny; y++)   {
                    piece[x].push(this.currpiece[y][x])
                }
            }
            this.currpiece = piece.reverse()
        }while(this.pieceCheck() != false || this.currpiece[0].length - 1 + this.currpos > 9)
    }

    endGame()   {
        var end = this.board[0].some((value) => {
            return (value != 0)
        })

        if(end == true) {
            console.log("Game over")
            document.getElementById("result").innerHTML = "GAME OVER"
        }

        
        return end
    }
}


var game = new Tetris()
game.GAME()
