/*const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
  
  console.log(fetchPromise);
  
  fetchPromise.then((response) => {
    console.log(`Received response: ${response.status}`);
  });
  
  console.log("Started request…");
  */

  /*const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
  
  fetchPromise
    .then((response) => {
        if(!response.ok){
            throw new Error(`Http error: ${response.status}`);
        }
        return response.json()
    })   
    .then((data) => {
            console.log(data[0].name);
    }).catch((error)=>{
        console.error(error);
    });*/

    /*const fetchPromise = fetch(
        "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
      );
      
      fetchPromise
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data[0].name);
        })
        .catch((error) => {
          console.error(`Could not get products: ${error}`);
        });*/


        const getPieceUnicode = (piece) => {
          const unicodePieces = {
              'king_white': '\u2654',
              'queen_white': '\u2655',
              'rook_white': '\u2656',
              'bishop_white': '\u2657',
              'knight_white': '\u2658',
              'pawn_white': '\u2659',
              'king_black': '\u265A',
              'queen_black': '\u265B',
              'rook_black': '\u265C',
              'bishop_black': '\u265D',
              'knight_black': '\u265E',
              'pawn_black': '\u265F',
          };
      
          return unicodePieces[piece.toLowerCase()] || '';
      };
      
      // Example usage
      console.log(getPieceUnicode('king_white'));  // Outputs: ♔
      console.log(getPieceUnicode('queen_black')); // Outputs: ♛
      
      
  