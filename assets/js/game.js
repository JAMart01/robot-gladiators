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

for (var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}
