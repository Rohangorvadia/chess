export const Testing = (board, setBoard, chess, socket) => {
  return (
    <div>
      {board.map((row, i) => (
        <div className="flex" key={i}></div>
      ))}
    </div>
    //     <div className="text-white">
    //       {board.map((row, i) => (
    //         <div className="flex" key={i}>
    //           {row.map((square, j) => {
    //             const squareRepresentation = String.fromCharCode(97 + j) + (8 - i);

    //             return (
    //               <div
    //                 key={j}
    //                 onClick={() => handleSquareClick(squareRepresentation, square)}
    //                 onContextMenu={(e) => {
    //                   handleRightClick(e, squareRepresentation);
    //                 }}
    //                 className={`relative w-20 h-20 flex justify-center  ${
    //                   (i + j) % 2 === 0 ? "bg-gray-400" : "bg-gray-300"
    //                 }`}
    //               >
    //                 {/* Rank notation */}
    //                 {j === 0 && (
    //                   <div className="pt-5 absolute left-1 top-1 transform -translate-y-1/2 text-sm text-gray-700">
    //                     {8 - i}
    //                   </div>
    //                 )}
    //                 {/* File notation */}
    //                 {i === 7 && (
    //                   <div className="absolute bottom-1 right-1 transform -translate-x-1/2 text-sm text-gray-700">
    //                     {String.fromCharCode(97 + j)}
    //                   </div>
    //                 )}
    //                 {/* Chess piece */}
    //                 {square ? (
    //                   <img
    //                     className="max-w-16 max-h-16 pt-2"
    //                     src={`./${
    //                       square.color === "b"
    //                         ? square.type
    //                         : `${square.type.toUpperCase()}w`
    //                     }.svg`}
    //                     alt={`${square.color} ${square.type}`}
    //                   />
    //                 ) : null}
    //               </div>
    //             );
    //           })}
    //         </div>
    //       ))}
    //     </div>
  );
};
