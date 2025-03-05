const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin, // Read from standard input (keyboard)
  output: process.stdout // Write to standard output (console)
});

let list = [];

function menu(){
    console.log("Welcome to Grocery Shopper!");
    console.log("Please choose one of the available options:");
    console.log("(1): displays the current grocery list");
    console.log("(2): prompts you to add an item to the list");
    console.log("(3): prompts you to remove an item from the list");
    console.log("(4): prompts you to set an item on the list as bought");
    console.log("(5): exit Grocery Shopper");
}


function display(){
    console.log("Displaying grocery list...");
        // Functionality for option 1
        console.log(list);
        menu();
}

async function addItem(){
    console.log("adding item to the list...");
    // Functionality for option 2
    let itemname = "";
    let quantity = 0;
    let price = 0;
    let bought = false;
    
    await new Promise((callbackfn, errorfn) => {
        rl.question('Enter name of item:', (name) => {
            itemname = name;
            callbackfn();
        }), ()=> {
            errorFn();
            
        };
        
    });
    await new Promise((callbackfn, errorfn) => {
        rl.question('Enter quantity:', (q) => {
            quantity = Number(q);
            callbackfn();
        }, ()=> {
            errorFn();
        });
    });
    await new Promise((callbackfn, errorfn) => {
        rl.question('Enter price:', (p) => {
            price = Number(p);
            let item = {itemname, quantity, price, bought};
            list.push(item);
            console.log("Item successfully added!\n");
            menu()
            callbackfn();
        }, ()=> {
            errorFn();
        });
    });
}

function removeItem(){
    //case 3 functionality
    rl.question('Enter name of item to be removed:', (itemname) => {
        const delitem = list.find(item => item.itemname === itemname);
        if(delitem == null){
            console.log('Item not found!');
        }
        else{
            console.log('item found, removing item...');
            list = list.filter(item => item !== delitem);
            console.log("Item successfully removed!\n");
        }
    menu()
    });
}

function buyItem(){
    rl.question('Enter the item you wish to buy:', (itemname) =>{
        const index = list.findIndex(item => item.itemname === itemname && item.bought === false);
        if(index == -1){
            console.log('Item not found!');
        }
        else{
            console.log('item found, buying item...');
            
            list[index].bought = true;
            console.log("Item successfully bought!\n");
        }
        menu()
    })
}

function handler(option) {
    switch (option) {
      case '1':
        display();
        break;

      case '2':
        addItem();
        break;
         
      case '3':
        removeItem();
        break;

      case '4':   
        buyItem();
        break;

      case '5':
        console.log("Exiting Grocery Shopper...");
        rl.close();
        break;

      default:
        console.log("Invalid option, please try again.");
    }
    
    
  }

  function grocerystore(){
        menu();
        rl.on('line', (ops) => {
            
            handler(ops);
            
        });
       
  }

grocerystore();

/*rl.prompt('setPrompt', (menu) => {
    
    console.log("Please choose one of the available options:");
    console.log("(display): displays the current grocery list");
    console.log("(add): prompts you to add an item to the list");
    console.log("(remove): prompts you to remove an item from the list");
    console.log("(buy): prompts you to set an item on the list as bought");
    console.log("");
});

rl.getPrompt();
*/


/*rl.on('line', (line) => {
    console.log(line);
});

rl.once('close', () => {
     // end of input
     console.log("Goodbye");
 });

rl.question('Enter name:', (name) => {
	console.log(name);
});
*/
