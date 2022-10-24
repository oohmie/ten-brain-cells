
const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    database: "review"
})

app.get('/review', (req, res) => {
    db.query("SELECT * FROM review", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.post('/create', (req, res) => {
    const building = req.body.building
    const floor = req.body.floor
    const toilet = req.body.toilet
    const rating = req.body.rating
    const name = req.body.name
    const reviewing = req.body.reviewing

    db.query("INSERT INTO review (building, floor, toilet, rating, name, reviewing) VALUES(?,?,?,?,?,?)", [building, floor, toilet, rating, name, reviewing],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values inserted")
            }
        }
    )
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM review WHERE id = ?", id, (err, result) =>{
        if(err){
            console.log(err)
        } else{
            res.send(result)
        }
    })
})

app.listen('3001', () => {
    console.log('Server is running on port 3001')
})