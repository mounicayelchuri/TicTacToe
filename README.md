# TicTacToe


1st systemInput is generated by choosing random block.
Remaining system move is predicted by checking the following three cases :
1. check if all system moves match with any two moves present in winmoves , then return the remaining winmove.
2.check if all users moves match with any two moves present in winmoves , then return the remaining winmove (defense).
3. If both above or not satisifed then return move based on existing system moves which leads to a winmove
