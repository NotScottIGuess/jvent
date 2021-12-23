Simple event system for events between objects

**Creating a new event**

    const myEvent = new Jvent("optional name");

**Add Handlers**
*Anonymous functions*


    myEvent.add(function(e){
      // use with caution. this might not be what you expect
      console.log(e);
    });

    myEvent.add((e) => {
      console.log(e);
    });

*Object methods*

    class Example{
    
      constructor(myEvent){
        myEvent.add(this, "fired");
      }
    
      fired(e){
        console.log(e);
      }

    }
    
   **Firing Events**

    myEvent.fire({some: "data"});
