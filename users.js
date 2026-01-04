const router = require("express").Router();
const db = require("../db");

/* GET ALL */
router.get("/", (req,res)=>{
  db.query("SELECT * FROM users", (err,rows)=>{
    if(err) return res.status(500).json(err);
    res.json(rows);
  });
});

/* GET BY ID */
router.get("/:id",(req,res)=>{
  db.query("SELECT * FROM users WHERE id=?", [req.params.id], (err,rows)=>{
    if(err) return res.status(500).json(err);
    res.json(rows[0]);
  });
});

/* CREATE */
router.post("/",(req,res)=>{
  const {name,email}=req.body;
  if(!name||!email) return res.status(400).json("All fields required");
  db.query("INSERT INTO users (name,email) VALUES (?,?)",[name,email],(err,result)=>{
    if(err) return res.status(500).json(err);
    res.json({message:"User added", id:result.insertId});
  });
});

/* UPDATE */
router.put("/:id",(req,res)=>{
  const {name,email}=req.body;
  db.query("UPDATE users SET name=?, email=? WHERE id=?", [name,email,req.params.id], (err)=>{
    if(err) return res.status(500).json(err);
    res.json("User updated");
  });
});

/* DELETE */
router.delete("/:id",(req,res)=>{
  db.query("DELETE FROM users WHERE id=?", [req.params.id], err=>{
    if(err) return res.status(500).json(err);
    res.json("User deleted");
  });
});

module.exports = router;