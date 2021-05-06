

const   puzzle={
    run(){
        this.cached_DOM()
        this.first_action()
    },

    cached_DOM(){
        this.puzzle_board = $("#puzzle-board")
        this.start = $("#start")
        this.puzzle_pieces = this.puzzle_board.find(".puzzle-pieces")
        this.piece_one = this.puzzle_board.find("#one")
        this.display = $(".none")
        this.stats= $("#winstats")
        this.playagain = $("#playagain")

    },
    
    first_action(){
        $(this.start).click(this.game_start)
        $(this.playagain).click(this.restart)
    },

    game_start(){
        puzzle.random_grid()
        puzzle.puzzle_complete_check()
        $(puzzle.start).css({display: "none"})
        $(puzzle.puzzle_pieces).css({filter: "none"})
        $(puzzle.piece_one).text("")
        $(puzzle.piece_one).css({background:"rgba(0, 0, 0, .1)"})
        puzzle.bind()
    },

    bind(){
        $(this.puzzle_pieces).click(this.get_id)
        $(this.puzzle_pieces).click(this.get_positions)
        $(this.puzzle_pieces).click(this.get_data_number)
        $(this.puzzle_pieces).click(this.check_data_number)
        $(this.puzzle_pieces).click(this.puzzle_complete_check)
    },

    random_grid(){
        topp= ["1/2", "2/3", "3/4", "1/2", "2/3", "3/4", "1/2", "2/3","3/4"]
        leftt= ["1/2","1/2","1/2","2/3","2/3","2/3","3/4","3/4","3/4"]
        order= ["one","two","three","four","five","six","seven","eight","nine"]
        random_order=[0,2,5,1,7,6,3,8,4]
        for (let i = 0; i <puzzle.puzzle_pieces.length; i++) {
            $(puzzle.puzzle_pieces[random_order[i]]).css({gridColumn:  topp[i]})
            $(puzzle.puzzle_pieces[random_order[i]]).css({gridRow:  leftt[i]})
            $(puzzle.puzzle_pieces[random_order[i]]).attr("data-number", order[i])
        }
    },

    get_id(event){
        empty_piece_data_number = $(puzzle.piece_one).attr("data-number")
        piece_data_number = $(event.target).attr("data-number")
    },

    get_positions(event){
        empty_top = $(puzzle.piece_one).css("grid-column")
        empty_left = $(puzzle.piece_one).css("grid-row")
        piece_top = $(event.target).css("grid-column")
        piece_left = $(event.target).css("grid-row")
    },

    check_data_number(event){
        if(empty_piece_data_number == "one"){
            switch (piece_data_number) {
                case "two":case"four":
                puzzle.switch_position(event.target, empty_top, empty_left, piece_top,piece_left)
                puzzle.switch_data_number(event.target,empty_piece_data_number, piece_data_number)
            }
        }else if(empty_piece_data_number == "two"){
            switch (piece_data_number) {
                case "one":case"five": case"three":
                puzzle.switch_position(event.target, empty_top, empty_left, piece_top,piece_left)
                puzzle.switch_data_number(event.target,empty_piece_data_number, piece_data_number)
            }
        }else if(empty_piece_data_number == "three"){
            switch (piece_data_number) {
                case "two":case"six":
                puzzle.switch_position(event.target, empty_top, empty_left, piece_top,piece_left)
                puzzle.switch_data_number(event.target,empty_piece_data_number, piece_data_number)
            }
        }else if(empty_piece_data_number == "four"){
            switch (piece_data_number) {
                case "one":case"five": case"seven":
                puzzle.switch_position(event.target, empty_top, empty_left, piece_top,piece_left)
                puzzle.switch_data_number(event.target,empty_piece_data_number, piece_data_number)
            }
        }else if(empty_piece_data_number =="five"){
            switch (piece_data_number) {
                case "four":case"two": case"six": case"eight":
                puzzle.switch_position(event.target, empty_top, empty_left, piece_top,piece_left)
                puzzle.switch_data_number(event.target,empty_piece_data_number, piece_data_number)
            }
        }else if(empty_piece_data_number == "six"){
            switch (piece_data_number) {
                case "three":case"five": case"nine":
                puzzle.switch_position(event.target, empty_top, empty_left, piece_top,piece_left)
                puzzle.switch_data_number(event.target,empty_piece_data_number, piece_data_number)
            }
        }else if(empty_piece_data_number == "seven"){
            switch (piece_data_number) {
                case "four":case"eight":
                puzzle.switch_position(event.target, empty_top, empty_left, piece_top,piece_left)
                puzzle.switch_data_number(event.target,empty_piece_data_number, piece_data_number)
            }
        }else if(empty_piece_data_number == "eight"){
            switch (piece_data_number) {
                case "seven":case"five": case"nine":
                puzzle.switch_position(event.target, empty_top, empty_left, piece_top,piece_left)
                puzzle.switch_data_number(event.target,empty_piece_data_number, piece_data_number)
            }
        }else if(empty_piece_data_number == "nine"){
            switch (piece_data_number) {
                case "eight":case"six":
                puzzle.switch_position(event.target, empty_top, empty_left, piece_top,piece_left)
                puzzle.switch_data_number(event.target,empty_piece_data_number, piece_data_number)
            }
        }
    },

    switch_data_number(target,empty_piece, selected_piece){
        $(target).attr("data-number", empty_piece)
        $(puzzle.piece_one).attr("data-number", selected_piece)
    },

    switch_position(empty, empty_top,empty_left,piece_top,piece_left){
        $(puzzle.piece_one).css({gridColumn:  piece_top})
        $(puzzle.piece_one).css({gridRow:  piece_left})
        $(empty).css({gridColumn: empty_top})
        $(empty).css({gridRow: empty_left})
    },

    puzzle_complete_check(){
        right_data_order= ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
        check_order =[]
        for(let index =0; index <puzzle.puzzle_pieces.length;index++){
            if($(puzzle.puzzle_pieces[index]).attr("data-number") == right_data_order[index]){
                check_order.push("passed")
            }
        }if(check_order.length == "9"){
            $(puzzle.display).css({display: "grid"})
            $(puzzle.stats).text(`Congrats!! You solved the puzzle`)
            $(puzzle.piece_one).css({background:""})
            $(puzzle.puzzle_pieces).unbind("click")
            $(puzzle.piece_one).unbind("click")
            $(puzzle.puzzle_pieces).css({filter: "blur(3px"})
        }
    },

    restart(){
        puzzle.bind()
        puzzle.first_action()
        $(puzzle.display).css({display: "none"})
        $(puzzle.start).css({display: "block"})
        $(puzzle.puzzle_pieces).css({filter: "blur(3px)"})
        $(puzzle.piece_one).css({background:"white"})
    }
}
puzzle.run()