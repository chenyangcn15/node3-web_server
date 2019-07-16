const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Chen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Chen'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        usefulLink: 'Google.com',
        title: 'Help Page',
        name: 'Chen'
    })
})


app.get('/weather', (req, res) => {
    //const address = req.query.address
    if(!req.query.address)
    {
        return res.send({
            error: 'An address should be provided!'
        })
    }
    else{   
        geocode(req.query.address,(error, response) => {
            if(error)
            {
                return res.send({error})
            }
            forecast(response.lat, response.lon, (error, fdata) => {
                if(error) 
                {
                    return res.send({
                        obj: 'I am here',
                         error
                    })
                }
                res.send({
                    location: response.loc,
                    info: fdata
                })
              })
        })    
}
})

app.get('/help/*', (req, res) =>{
    res.render('404_page',{
        error_message: 'help article is not found',
        title: 404,
        name:'Chen'
    })
})

app.get('*', (req, res) => {
    res.render('404_page', {
        error_message: 'Page not found',
        title: 404,
        name: 'Chen'
    })
})

app.listen(3000, () =>{
    console.log('serser is up on port 3000')
})