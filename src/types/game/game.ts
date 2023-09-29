export enum GameTypes {
    TicTacToe = 'Tic-Tac-Toe',
    Other = 'Other'
}

export type GameType = keyof typeof GameTypes;


