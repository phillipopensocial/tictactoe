pragma solidity ^0.4.18;

contract SimpleStorage {
  uint[] board = new uint[](9);
    address player1;
    address player2;
    uint start = 0;
    uint winner = 0;

    function SimpleStorage(){
        player1 = msg.sender;
    }
    
    function joinGame(){
        player2 = msg.sender;
    }

    function resetBoard() {
      board = new uint[](9);
      winner = 0;
    }
    
    function doMove(uint place) returns (string){
        
        var (winner, message) = checkWinner();
        if (winner > 0) {
            return message;
        }
        
        // correct users is on turn
        if(start == 0){
            if(msg.sender != player1) return "you are not player 1";
        }else if(start == 1){
            if(msg.sender != player2) return "you are not player 2";
        }
        
        // is on the board
        if(place < 0 || place >= 9) return "not on the board";
        
        // Is not already set
        if(board[place] != 0) return "already occupied";
        
        board[place] = start+1;
        start = 1- start;
        
        
        return "OK";   
    }
    
    function winningMsg(uint winningPlayer) private returns (string) {
        if (winner == 1) {
            return "Winner is player 1!";
        } 
        if (winner == 2) {
            return "Winner is player 2!";
        }
        
        return "";
    }

    
    uint[][] tests = [[0,1,2],[3,4,5],[6,7,8], [0,3,6],[1,4,7],[2,5,8], [0,4,8],[2,4,6]  ];
    // 0 1 2
    // 3 4 5
    // 6 7 8
    function checkWinner() constant returns (uint, string){
        if (winner > 0) {
            return (winner, winningMsg(winner));
        }
        
        for(uint i =0; i < 8;i++){
            uint[] memory b = tests[i];
            if(board[b[0]] != 0 && board[b[0]] == board[b[1]] && board[b[0]] == board[b[2]]) {
                winner = board[b[0]];
                return (winner, winningMsg(winner)); 
            }
        }
        
        return (0, "No winners.");
    }
    
    function current() constant returns(string, string) {
        var (winningPlayer, message) = checkWinner();
        
        bytes memory out = new bytes(11);
        byte[] memory signs = new byte[](3);
        signs[0] = "-";
        signs[1] = "X";
        signs[2] = "O";
        bytes(out)[3] = "|";
        bytes(out)[7] = "|";
        
        for(uint i = 0; i < 9; i++){
            bytes(out)[i + i/3] = signs[board[i]];
        }
        
        return (message, string(out));
    }

}
