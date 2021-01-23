const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

app.use(express.json());
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '../public')))
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

const partialsPath =  path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sachin singh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sachin singh'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is simple help text',
        title: 'Help',
        name: 'Sachin singh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide and address'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
         if(error){
             return res.send({ error})
         }
         forecast(latitude, longitude, (error, forecastData) => {
             if(error){
                 return res.send({ error })
             }
             res.send({
                forecast: forecastData,
                location,
                address: req.query.address 
             })
         })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sachin Singh',
        errorMessage: 'Help aticle not found'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
       return  res.send({
            error: 'you must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})




app.get('*', (req, res) => {
  res.render('404', {
      title: '404',
      name: 'Sachin singh',
      errorMessage: 'Page not found'
  })
})



app.listen(3000, () => {
    console.log(`server is listen on port 3000`)
})