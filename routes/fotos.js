var express = require('express');
var router = express.Router();

const {Sequelize, Op, where} = require('sequelize');
const { route } = require('.');
const foto = require('../models/foto');
const Foto = require('../models').foto;
const Etiqueta = require('../models').etiqueta; 


router.get('/findAllbyRate/json', function(req,res,next){
    let lower = parseFloat(req.query.lower);
    let higher = parseFloat(req.query.higher);
    Foto.findAll({
        attributes: {exclude: ["updatedAt"]},
        include:[{
            model: Etiqueta,
            attributes: ['texto'],
                through: {attributes:[]},
        }],
        where: {
            calificacion:{
                [Op.between]:[lower, higher]
            }
        }
    })
    .then(fotos => {
        res.json(fotos);
    })
    .catch(error => res.status(400).send(error))
})

router.get('/findAllbyRate/view', function(req,res,next){
    let lower = parseFloat(req.query.lower);
    let higher = parseFloat(req.query.higher);
    Foto.findAll({
        attributes: {exclude: ["updatedAt"]},
        include:[{
            model: Etiqueta,
            attributes: ['texto'],
                through: {attributes:[]},
        }],
        where: {
            calificacion:{
                [Op.between]:[lower, higher]
            }
        }
    })
    .then(fotos => {
        res.render('fotos-rate', {title: 'fotos-rate', arrFotos:fotos});
    })
    .catch(error => res.status(400).send(error))
})

router.get('/findAllById/:id/json', function(req,res,next){
    let id = parseInt(req.params.id);
    Foto.findAll({
        attributes: {exclude: ["updatedAt"] },
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: {attributes: []}
        }],
        where:{
            [Op.and]: {id: id}
        }
    })
    .then(fotos => {res.json(fotos);
    })
    .catch(error => tes.status(400).send(error))
})

router.get('/findAll/json', function(req, res, next) {
    Foto.findAll({
        attributes: { exclude: ["updatedAt"] },
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: {attributes: []}
            }],  
    })
    .then(fotos => {
        res.json(fotos);
    })
    .catch(error =>
        res.status(400).send(error)
    );
});

    
router.get('/findAll/view', function(req, res, next) {
    Foto.findAll({
        attributes: { exclude: ["updatedAt"] },
        include: [{
            model: Etiqueta, 
            attributes: ['texto'],
            through: {attributes: []}
        }]
    })
    .then(fotos => {
        res.render('fotos', { title: 'Fotos', arrFotos: fotos });
    })
    .catch(error => res.status(400).send(error));
});

module.exports = router;