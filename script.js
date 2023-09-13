document.addEventListener("DOMContentLoaded", function() {
    let gameState = "start";
    document.getElementById("start-button").addEventListener("click", gameLoop);
  
    function gameLoop() {
      if (gameState === "start") {
        document.getElementById("game-text").innerText = "You find yourself in a mysterious brewery. Do you go to the 'Taproom' or 'Brewery Floor'?";
        gameState = "brewery";
      } else if (gameState === "brewery") {
        const choice = prompt("Do you go to the 'Taproom' or 'Brewery Floor'?");
        if (choice.toLowerCase() === "taproom") {
          document.getElementById("game-text").innerText = "Cheers! You find yourself among jovial beer enthusiasts. You've been handed a free pint of their special IPA! You win!";
          gameState = "end";
        } else if (choice.toLowerCase() === "brewery floor") {
          document.getElementById("game-text").innerText = "Oops! You accidentally fall into a vat of unfinished stout. You've become part of the next brew! You lose!";
          gameState = "end";
        } else {
          document.getElementById("game-text").innerText = "Invalid option. No beer for you until you decide!";
        }
      }
    }
  });
  