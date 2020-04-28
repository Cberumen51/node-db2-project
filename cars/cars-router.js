const express = require("express")

const cardb = require("../data/config")
const router = express.Router()


router.get("/", async (req, res, next) => {
    try {
        const cars = await cardb("car-dealer")
        res.json(cars)
        } catch(err){
        next(err)
        }
    })

router.get("/:id", async (req,res,next) => {
    try {
        const { id } = req.params;
        const car = await cardb("car-dealer")
          .where({ id })
          .first();
    
        res.json(car);
      } catch (err) {
        next(err);
      }
    });

router.post("/", async (req,res,next) => {
    try {
        const carData = req.body;
        const [id] = await cardb("car-dealer").insert(carData);
        const newCar = await cardb("car-dealer").where({ id });
    
        res.status(201).json(newCar);
      } catch (err) {
        next(err);
      }
    });

router.put("/:id", async (req,res,next) => {
    try {
        const payload = {
          vin: req.body.vin,
          make: req.body.make,
          model: req.body.model,
          mileage: req.body.mileage,
          transmission: req.body.transmission,
          title: req.body.title
        };
    
        await cardb("car-dealer").where("id", req.params.id).update(payload);
        const updatedCar = await cardb("car-dealer").where("id", req.params.id).first();
        res.json(updatedCar);
      } catch (err) {
        next(err);
      }
    });

router.delete("/:id", async (req,res,next) => {
    try {
        await cardb("car-dealer").where("id", req.params.id).del();
        res.status(204).end();
      } catch (err) {
        next(err);
      }
    });


module.exports = router;