pragma solidity ^0.4.4;

contract Tictactoe {

  //address[2][9];
  address player1;
  address player2;
  string[9] board;  //First dimension is for the players (Only first two), Last dimension is for the board 

  function Tictactoe() public {
    // constructor
    player1 = msg.sender;
    board[0] = "X";
  }

  function getPlayer1() public constant returns(address) {
    return player1;
  }
/*
  function getStatus() public constant returns (string) {
    return "Hello!";
  }
*/

  function getBoardSize() public constant returns(uint) {
    return board.length;
  }

  function getBoardStatus() public constant returns(string) {
    return board[0];
  }
}
