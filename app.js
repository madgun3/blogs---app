const express = require("express");
const app = express();
const mongoose = require("mongoose");


//call Db

const Article = require("./models/articleSchema")



//Dealte & update.
const methodOverride = require("method-override")
app.use(methodOverride("_method"))



app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// All Gets.
app.get("/", (req, res) => {
    Article.find().then(result => {
         res.render("index",{AAA:result});
    }).catch(err => {
        console.log(err);
    })
 
});

app.get("/NewArticle", (req, res) => {
     
  res.render("NewArticle");
  
});

// app.get("/ShowArticle/:id", (req, res) => {
//   const userId = req.params.id;

//   Article.findById(userId)
//     .then(article => {
//       res.render("ShowArticle", { article, AAA:result });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });


app.get("/ShowArticle/:id", (req, res) => {
  const userId = req.params.id;
   
  Article.findById(userId)
    .then(article => {
   
    
      res.render("ShowArticle", { article });
    })
    .catch(err => {
      console.log(err);
    });
});



app.get("/edit/:id", (req, res) => {
    const userIdEdit = req.params.id; 
 

  Article.findById(userIdEdit)
    .then(article => {
        console.log(article);
    
      res.render("edit", { article });
    })
    .catch(err => {
      console.log(err);
    });
});

//All Posts.
app.post("/NewArticle", (req, res) => {
    
  Article
    .create(req.body)
    .then( result => {
         
      res.redirect("/");
    })
    .catch( err => {
      console.log(err);
    });
});



//All updates.
app.post("/Edit/:id", async (req, res) => {
    try {
        await Article.findByIdAndUpdate(req.params.id, {
            
            title: req.body.title,
            Description: req.body.Description
        });

        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});



/// all dealte

app.delete("/articles/:id", async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id)
        res.redirect("/")
    } catch (err) {
        console.log(err)
    }
})

 
// DB connect
mongoose
  .connect(
    "mongodb://devabo:123123Aa@ac-ltaadle-shard-00-00.lxac4ln.mongodb.net:27017,ac-ltaadle-shard-00-01.lxac4ln.mongodb.net:27017,ac-ltaadle-shard-00-02.lxac4ln.mongodb.net:27017/?ssl=true&replicaSet=atlas-lt6x30-shard-0&authSource=admin&appName=Cluster0",
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Server Starting now");
    });
  })
  .catch((err) => {
    console.log(err);
  });
