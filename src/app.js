const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Path for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Handle bars engine
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Static directory to server
app.use(express.static(publicDirectory))


app.get('', (req,res)=> {
    res.render('index',{
        title: 'Weather app',
        name: 'Marco Custodio'
    })
})

app.get('/about', (req,res)=> {
    res.render('about',{
        title: 'About me',
        name: 'Marco Custodio'
    })
})

app.get('/help', (req,res)=> {
    res.render('help',{
        title: 'Help page',
        message: 'Welcome to the help page',
        name: 'Marco Custodio'
    })
})

app.get('/weather', (req,res)=> {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if (error){
            return res.send({
                error
            })
        }
    
        forecast(latitude,longitude, (error, {description , temperature}) => {
            if (error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast : description,
                location,
                temperature,
                address : req.query.address
            })
          })
    })

    
})

app.get('/products', (req,res) =>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=> {
    res.render('404',{
        title: '404 page',
        message: 'Help article not found',
        name: 'Marco Custodio'
    })
})

app.get('*', (req,res)=> {
    res.render('404',{
        title: '404 page',
        message: 'Page not found',
        name: 'Marco Custodio'
    })
})



app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})