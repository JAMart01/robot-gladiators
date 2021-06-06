//Game States
//  "WIN" - Player robot has defeated all enemy-robots
//      *Fight all enemy robots
//      *Defeat all enemy robots
//  "LOSE" - Player robot's health is zero or less



// The Fight Function is being defined here

var fightOrSkip = function () {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.')

    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    //if player picks "skip" confirm and then leave the loop
    promptFight = promptFight.toLocaleLowerCase();

    if (promptFight === "skip") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        //if yes(true) leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            //subtract money from playerMoney for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            
            //return true if a player wants to leave
            return true;
        }
    }
    return false;
}


var fight =function(enemy){

    //keep track of who goes first
    var isPlayerTurn = true;

    //randomly change player turn
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }


    // repeat and execute as long as the enemy-robot is alive
    while (playerInfo.health > 0 && enemy.health > 0){

        if (isPlayerTurn){

            //ask player if they'd like to fight or skip using the fightOrSkip function
            if (fightOrSkip()) {

                // if true, leave fight by breaking loop
                break;
            } 

         //remove enemy's health by subtracting the ammount set in the playerAttack variable
        
         //generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.health =  Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name + " attacked " + enemy.name + ", " + enemy.name + " now has " + enemy.health + " health remaining. "
            );

            //check enemy health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died! ");

                //award player money for winning 
                playerInfo.money= playerInfo.money + 20;

                // leave while loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        }
        else {

            //remove players health by subtracting the ammount set in the enemyAttack variable
            var damage = randomNumber(enemy.attack - 3, enemy.attack);


            playerInfo.health = Math.max(0, playerInfo.health - damage);
            
            console.log(
                enemy.name + " has attacked " + playerInfo.name + ", " + playerInfo.name + " now has " + playerInfo.health + " health remaining"
            );

            //check player health
            if(playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died! ");
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        //switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
        } 
    };
// Fight function definition ends here


// Function to start a new game
var startGame = function() {
    //reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
    
        if (playerInfo.health > 0) {
        
            //let player know what round they are in, remember that arrays start at 0 so it needs to have + 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );

            //pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyObj = enemyInfo[i];

            //reset enemy health
            pickedEnemyObj.health = randomNumber(40, 60);

            //use debugger to pause the script and check what's going on at that moment
            debugger;

            //pass the pickedEnemyName variables value into the fight function where it will assume the value of the enemyName parameter
            fight(pickedEnemyObj);

            //if we're not at the last enemy in the array 
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                //ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                
                //if yes take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        } 
    }

    endGame();

}

// Function to end the entire game 
var endGame = function() {
    //if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
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


//shop function 
var shop = function() {
    //ask player what they'd like to do
    var shopOptionPrompt = window.prompt (
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );

    shopOptionPrompt = parseInt(shopOptionPrompt);
    //use switch to carry out an action
    switch (shopOptionPrompt) {
        case 1:
            
            playerInfo.refillHealth();
            break;

        case 2: 
            
            playerInfo.upgradeAttack();
            break;


        case 3: 
            window.alert("Leaving the store.");

            //do nothing so function will end
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");

            //call shop() again to force player to pick a valid option
            shop();
            break;
    }
};


// Global Variables Start 

//function to generate a random numeric value
var randomNumber = function(min, max) {
   var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

var getPlayerName = function() {
    var name = "";
    //add loop here with prompt and condition
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?")
    }

    console.log("Your robot's name is " + name)
    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    }, //comma!
    refillHealth: function() {
        if (this.money >= 7){
            this.health += 20;
            this.money -= 7;
            window.alert("Refilled 20 health in exchange for 7 dollars.");
        }
        else {
            window.alert("You don't have enough money!");
        }
    }, //comma!
    upgradeAttack: function() {
        if (this.money >= 7){
            this.attack += 6;
            this.money -= 7;
            window.alert("Increased attack by 6 in exchange for 7 dollars.");
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];
//Global Variables End


//start the game when the page loads
startGame();