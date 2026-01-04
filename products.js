const router = require("express").Router();
const db = require("../db");

/* GET ALL */
router.get("/",(req,res)=>{
  db.query("SELECT * FROM products",(err,rows)=>{
    if(err) return res.status(500).json(err);
    res.json(rows);
  });
});

/* GET BY ID */
router.get("/:id",(req,res)=>{
  db.query("SELECT * FROM products WHERE id=?", [req.params.id], (err,rows)=>{
    if(err) return res.status(500).json(err);
    res.json(rows[0]);
  });
});

/* CREATE */
router.post("/",(req,res)=>{
  const {name,price}=req.body;
  if(!name||!price) return res.status(400).json("All fields required");
  db.query("INSERT INTO products (name,price) VALUES (?,?)",[name,price],(err,result)=>{
    if(err) return res.status(500).json(err);
    res.json({message:"Product added", id:result.insertId});
  });
});

/* UPDATE */
router.put("/:id",(req,res)=>{
  const {name,price}=req.body;
  db.query("UPDATE products SET name=?, price=? WHERE id=?", [name,price,req.params.id], (err)=>{
    if(err) return res.status(500).json(err);
    res.json("Product updated");
  });
});

/* DELETE */
router.delete("/:id",(req,res)=>{
  db.query("DELETE FROM products WHERE id=?", [req.params.id], err=>{
    if(err) return res.status(500).json(err);
    res.json("Product deleted");
  });
});

module.exports = router;