
import $ from "jquery";
import { gameStart } from ".";
import { getTopScores } from "./score";

const guiContainer = document.createElement('div')
guiContainer.classList.add("gui-container");

export function createStartMenu() {
    const scoreData = getTopScores()

    const scoreboardUiHtml = `
      <div class="scoreboard">
        <ol>
          ${scoreData
            .map(
                (scoreItem) =>
                    `<li>${scoreItem.score} (${new Date(
                        scoreItem.timestamp
                    ).toTimeString()})</li>`
            )
            .join("")}
        </ol>
      </div>
  
      
    `;



    $(guiContainer).html(`
        <div>
            <div class="start-button-container">
                Start Game
            </div>
            
            <br />

            ${scoreboardUiHtml}
        </div>
    `);
    $(".start-button-container").on('click', function () {
        // This will run when the start button is clicked
        gameStart();

        closeMenu();

        console.log('pressed');
    });
}


export function createBaseGUI() {
    document.body.appendChild(guiContainer);
}

export function closeMenu() {
    $(guiContainer).html('');
}



