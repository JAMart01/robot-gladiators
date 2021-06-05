//Game States
//  "WIN" - Player robot has defeated all enemy-robots
//      *Fight all enemy robots
//      *Defeat all enemy robots
//  "LOSE" - Player robot's health is zero or less




// Global Variables Start
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;
//Global Variables End



// The Fight Function is being defined here

var fight =function(enemyName){

    // repeat and execute as long as the enemy-robot is alive
    while (playerHealth > 0 && enemyHealth > 0){

        //window.alert("Welcome to Robot Gladiators!");

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.");

        // if player picks "skip" confirm then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
        
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip){
            window.alert(playerName + " has decided to skip this fight. Goodbye!");
            //subtract money from playerMoney for skipping
            playerMoney = playerMoney - 10;
            console.log("playerMoney", playerMoney);
            break;
            }
        } 

         //remove enemy's health by subtracting the ammount set in the playerAttack variable
        
            enemyHealth = enemyHealth - playerAttack;
            console.log(
                playerName + " attacked " + enemyName + ", " + enemyName + " now has " + enemyHealth + " health remaining. "
            );

            //check enemy health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died! ");

                //award player money for winning 
                playerMoney= playerMoney + 20;

                // leave while loop since enemy is dead
                break;
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }

            //remove players health by subtracting the ammount set in the enemyAttack variable

            playerHealth = playerHealth - enemyAttack;
            console.log(
                enemyName + " has attacked " + playerName + ", " + playerName + " now has " + playerHealth + "health remaining"
            );

            //check player health
            if(playerHealth <= 0) {
                window.alert(playerName + " has died! ");
                break;
            } else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }
        } 
    };
// Fight function definition ends here


// Function to start a new game
var startGame = function() {
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
    
        if (playerHealth > 0) {
        
            //let player know what round they are in, remember that arrays start at 0 so it needs to have + 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );

            //pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];

            //reset enemy health
            enemyHealth = 50;

            //use debugger to pause the script and check what's going on at that moment
            debugger;

            //pass the pickedEnemyName variables value into the fight function where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);
        } 
    }

    endGame();

}

// Function to end the entire game 
var endGame = function() {
    //if player is still alive, player wins!
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    } 
    else {
        window.alert("You've lose your robot in battle.");
    }

    //ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

//start the game when the page loads
startGame();