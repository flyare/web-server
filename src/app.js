const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('../src/utils/forecast')
const geocode = require('../src/utils/geocode')

const app = express()
const port = process.env.PORT || 3000

const publicDirectory = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get("", (req, res) => {
    res.render('index', {
        title: 'Weather title',
        name: 'Weather App',
        message: 'Home page'
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "No address search."
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            
            res.send({
                latitude,
                longitude,
                location,
                forecastData
            })
        })
    })

    // res.send({
    //     tempture: 56,
    //     address: req.query.address
    // })
})

app.get("/help", (req, res) => {
    res.render('help', {
        title: "Help page",
        name: "Duc phan",
        message: 'Page help for infomation'
    })
})

app.get("/about", (req, res) => {
    res.render('about', {
        title: "About page",
        name: "Duc phan",
        message: 'Help page artilce no'
    })
})

app.get("/help/*", (req, res) => {
    res.render('404', {
        title: "404 page",
        name: "Duc phan",
        message: 'Help page artilce no'
    })
})

app.get("*", (req, res) => {
    res.render('404', {
        title: "404 page",
        name: "Duc phan",
        message: 'No page show more!'
    })
})

app.listen(port, () => {
    console.log("Server up on port", port)
})