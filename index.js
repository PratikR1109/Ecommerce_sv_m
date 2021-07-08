var express = require('express'),
ejs = require('ejs'),
path = require('path'),
bodyParser = require('body-parser'),
fileUpload = require('express-fileupload'),
url = '',
// url = "mongodb://localhost:27017",
dbName = 'mantradiamond',
// dbName="jewellery",
MongoClient = require('mongodb').MongoClient,
objectId = require('mongodb').ObjectID,
session = require('express-session'),
assets = require('assert'),
http = require('http'),
app = express(),
helmet = require('helmet'),
port = '3000',
fs = require('fs');

var uniqid = require('randomatic');

// const axios = require['dd'] = result8[result8.length - 1].name;i('axios');
// const fs = require('fs').promises;

// const bcrypt = require('bcrypt');

//const crypto = require('crypto');

// var sess='';

 var BaseUrl = "https://mantradiamond.com";
// var BaseUrl = "http:/['dd'] = result8[result8.length - 1].name;/3.6.102.34:"+port;
//var BaseUrl = "http://localhost:"+port;
// console.log(BaseUrl)

app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

//path of website........
app.use(express.static('views'));

app.use(express.static(path.join(__dirname, 'views')));

app.use(helmet());

app.use(fileUpload());

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var server = app.listen(port, () => {
    console.log("We Are Live On " + port)
})

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(session({
    secret: 'fsd84h507JKNJ9hg8&jndas*(jnjzcz',
    resave: true,
    saveUninitialized: true
  }));

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    assets.equal(null, err);
    if (err) throw err;
    // console.log(err)
    const db = client.db(dbName);
    console.log("mongodb is connected with database =", dbName)

    // axios.get('https://ghibliapi.herokuapp.com/films')
    // .then((response) => {
    //     console.log('Successfully retrieved our list of movies');
    //     response.data.forEach(movie => {
    //         console.log(`${movie['title']}, ${movie['release_date']}`);
    //     });
    // })

    function responseData(file, data, res) {  
        data['BaseUrl'] = BaseUrl;
        // data['active'] = typeof sess.active != 'undefined' ? sess.active : 'dashboard';
        res.render(file, data);
      }


    app.get('/index', (req, res) => {
        sess ='';
      // sess.active = 'des';
      aggregate = [
        {
          $lookup: {
            from: 'subcategory',
            localField: 'id',
            foreignField: 'category',
            as: 'item',
          }
        }];

      db.collection("category").aggregate(aggregate).toArray((err, result) => { 
        db.collection('banner').find({}).toArray((err, result2) => {
          db.collection('product').find({tselling: 'checked'}).toArray((err, result3) => {
            db.collection('product').find({lcollection: 'checked'}).toArray((err, result4) => {
              db.collection('product').find({}).sort({ _id: -1 }).limit(10).toArray((err, result5) => {
                db.collection('poster').find({}).toArray((err, result6) => {


                  // console.log(result3)

                  var a = [];
                  for(var i = 0; i < result3.length; i++){
                       var ts = {
                        _id: result3[i]._id,
                        name: result3[i].name,
                        price: parseInt(result3[i].price),
                        image: result3[i].image,
                      }
                      a.push(ts)
                  }

                  var b = [];
                  for(var i = 0; i < result4.length; i++){
                       var lc = {
                        _id: result4[i]._id,
                        name: result4[i].name,
                        price: parseInt(result4[i].price),
                        image: result4[i].image,
                      }
                      b.push(lc)
                  }

                  var c = [];
                  for(var i = 0; i < result5.length; i++){
                       var lp = {
                        _id: result5[i]._id,
                        name: result5[i].name,
                        price: parseInt(result5[i].price),
                        image: result5[i].image,
                      }
                      c.push(lp)
                  }

                  data = {
                    data1: result,
                    banner:result2,
                    tselling: a,
                    lcollection: b,
                    lproduct: c,
                    poster: result6
                  }

                  // console.log(result)
                  responseData('jewellery/index.html', data, res)
                  // res.send(data);
                })
              })
            })
          })
        })
      })
    })

    app.get('/', (req, res) => {
      sess ='';
      // sess.active = 'des';
      aggregate = [
        {
          $lookup: {
            from: 'subcategory',
            localField: 'id',
            foreignField: 'category',
            as: 'item',
          }
        }];

      db.collection("category").aggregate(aggregate).toArray((err, result) => { 
        db.collection('banner').find({}).toArray((err, result2) => {
          db.collection('product').find({tselling: 'checked'}).toArray((err, result3) => {
            db.collection('product').find({lcollection: 'checked'}).toArray((err, result4) => {
              db.collection('product').find({}).sort({ _id: -1 }).limit(10).toArray((err, result5) => {
                db.collection('poster').find({}).toArray((err, result6) => {
                  db.collection('pccategory').find({pcategory: 'Gold'}).toArray((err, result7) => {
                    db.collection('pccategory').find({pcategory: 'Diamond'}).toArray((err, result8) => {
                      db.collection('labourcharges').find({}).toArray((err, result9) => {

                      var m =[];
                      for(var i = 0; i < result5.length; i++){
                        if(req.params._id != result5[i]._id){
                              var goldamont = (result5[i].ggram * result7[result7.length-1].amount ) / 10;
                              var diamondamount = result5[i].dcarat * result8[result8.length-1].amount;
                              var extradiamondamount = diamondamount + result5[i].extradiamondamount;
                              var labourcharge = result5[i].ggram * result9[0].amount;
                              var sumamount = goldamont + extradiamondamount + labourcharge;
                              // console.log(sumamount)
                            var data = {
                              _id: result5[i]._id,
                              name: result5[i].name,
                              price: parseInt(sumamount),
                              image: result5[i].image
                            }
                            // console.log(data)
                            m.push(data)
                        }
                      }

                      var l =[];
                      for(var i = 0; i < result4.length; i++){
                        if(req.params._id != result4[i]._id){
                              var goldamont = (result4[i].ggram * result7[result7.length-1].amount ) / 10;
                              var diamondamount = result4[i].dcarat * result8[result8.length-1].amount;
                              var extradiamondamount = diamondamount + result4[i].extradiamondamount;
                              var labourcharge = result4[i].ggram * result9[0].amount;
                              var sumamount = goldamont + extradiamondamount + labourcharge;
                              // console.log(sumamount)
                            var data = {
                              _id: result4[i]._id,
                              name: result4[i].name,
                              price: parseInt(sumamount),
                              image: result4[i].image
                            }
                            // console.log(data)
                            l.push(data)
                        }
                      }

                      var h =[];
                      for(var i = 0; i < result3.length; i++){
                        if(req.params._id != result3[i]._id){
                              var goldamont = (result3[i].ggram * result7[result7.length-1].amount ) / 10;
                              var diamondamount = result3[i].dcarat * result8[result8.length-1].amount;
                              var extradiamondamount = diamondamount + result3[i].extradiamondamount;
                              var labourcharge = result3[i].ggram * result9[0].amount;
                              var sumamount = goldamont + extradiamondamount + labourcharge;
                              // console.log(sumamount)
                            var data = {
                              _id: result3[i]._id,
                              name: result3[i].name,
                              price: parseInt(sumamount),
                              image: result3[i].image
                            }
                            // console.log(data)
                            h.push(data)
                        }
                      }

                      data = {
                        data1: result,
                        banner:result2,
                        tselling: h,
                        lcollection: l,
                        lproduct: m,
                        poster: result6
                      }

                      // console.log(data)
                      responseData('jewellery/index.html', data, res)
                      // res.send(data);
                    })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })


    app.get('/contactus', (req, res) => {
      sess = '';
      aggregate = [
        {
          $lookup: {
            from: 'subcategory',
            localField: 'id',
            foreignField: 'category',
            as: 'item',
          }
        }];

        db.collection("category").aggregate(aggregate).toArray((err, result) => { 
          data = {
            data1 : result
          }
          responseData('jewellery/contact.html', data, res)
        })

    })

    app.get('/about-mantradiamond', (req, res) => {
      sess = '';
      aggregate = [
        {
          $lookup: {
            from: 'subcategory',
            localField: 'id',
            foreignField: 'category',
            as: 'item',
          }
        }];

        db.collection("category").aggregate(aggregate).toArray((err, result) => { 
          data = {
            data1 : result
          }
          responseData('jewellery/about-mantradiamond.html', data, res)
        })

    })

    app.get('/privacypolicy', (req, res) => {
      sess = '';
      aggregate = [
        {
          $lookup: {
            from: 'subcategory',
            localField: 'name',
            foreignField: 'category',
            as: 'item',
          }
        }];

        db.collection("category").aggregate(aggregate).toArray((err, result) => { 
          data = {
            data1 : result
          }
          responseData('jewellery/privacypolicy.html', data, res)
        })

    })

    app.get('/termsandconditions', (req, res) => {
      sess = '';
      aggregate = [
        {
          $lookup: {
            from: 'subcategory',
            localField: 'name',
            foreignField: 'category',
            as: 'item',
          }
        }];

        db.collection("category").aggregate(aggregate).toArray((err, result) => { 
          data = {
            data1 : result
          }
          responseData('jewellery/termsandconditions.html', data, res)
        })

    })



    app.get('/admin', (req, res) => {
        responseData('adminPanel/index.html', {
            msg: '',
            msgs: '',
            error: true
        }, res);
    })

    app.post('/addbanner', (req, res) => {
      sess = req.session;
      // sess.active = 'banner';

      if (typeof sess.email != 'undefined') {
      
        var file = req.files.uploaded_image;
        var img_name = Date.now() + '_' + file.name;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/PNG" ) {

          file.mv('views/jewellery/image/' + img_name, function (err) {
            if (err)
              return res.status(500).send(err);

            var item = {
              image: img_name,
              date: new Date()
            };
            db.collection('banner').insert(item, function (err, result2) {
              res.redirect('/banner');
            })
          })
        }
      } else {
      res.redirect('/admin');
    }
    })

    app.post('/editamount/:_id', (req, res) => {
      sess = req.session

      if (typeof sess.email != 'undefined') {

        var query = { _id: objectId(req.params._id)};
        var data = { $set: { amount: parseFloat(req.body.amount) }}

        db.collection('pccategory').updateOne(query, data, function (err, result2) {
          res.redirect('/category')
        })

      } else {
        res.redirect('/admin');
      }

    })


   

    app.post('/editlabourcharge/:_id', (req, res) => {
      sess = req.session

      if (typeof sess.email != 'undefined') {

        var query = { _id: objectId(req.params._id)};
        var data = { $set: { amount: parseFloat(req.body.amount) }}

        db.collection('labourcharges').updateOne(query, data, function (err, result2) {
          res.redirect('/category')
        })

      } else {
        res.redirect('/admin');
      }

    })

    app.get('/editamount/:_id', (req, res) => {
      sess = req.session

      if (typeof sess.email != 'undefined') {
            
        db.collection('pccategory').findOne({_id: objectId(req.params._id)}, (err, result1) => {
          data = {
            data : result1
          }
          responseData('adminPanel/editamount.html', data, res)
        })
      
      } else {
        res.redirect('/admin');
      }
    })


    app.post('/addposter', (req, res) => {
      sess = req.session;
      // sess.active = 'banner';

      if (typeof sess.email != 'undefined') {
      
        var file = req.files.uploaded_image;
        var img_name = Date.now() + '_' + file.name;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/PNG" ) {

          file.mv('views/jewellery/image/' + img_name, function (err) {
            if (err)
              return res.status(500).send(err);

            var item = {
              image: img_name,
              date: new Date()
            };
            db.collection('poster').insert(item, function (err, result2) {
              res.redirect('/banner');  
            })
          })
        }
      } else {
      res.redirect('/admin');
    }
    })

    // app.post('/forgotpass', (req, res) => {
    //   db.collection('login').find({}).toArray((err, login) => {
    //     var data = req.body;
    //     var query = { _id: objectId(login[0]._id)};
    //     var update = { $set: { password: data.newpassword }}

    //     if(data.oldpassword == login[0].password){
    //       db.collection('login').updateOne(query, update)
    //       res.redirect('/admin')
    //     }else{
    //       res.send(`<head><meta http-equiv="refresh" content="4;URL=`+BaseUrl+`/admin"></head><p style="color: black;font-size: 30px; position: fixed;top: 50%;left: 50%;margin-top: -100px;margin-left: -200px;"><span class="countdown"></span><span id="time"></span> 
    //       <script>function startTimer(duration, display) {
    //         var timer = duration, minutes, seconds;
    //         setInterval(function () {
    //             minutes = parseInt(timer / 60, 10);
    //             seconds = parseInt(timer % 60, 10);
        
    //             minutes = minutes < 10 ? "0" + minutes : minutes;
    //             seconds = seconds < 10 ? "0" + seconds : seconds;
        
    //             display.textContent = minutes + ":" + seconds;
        
    //             if (--timer < 0) {
    //                 timer = duration;
    //             }
    //         }, 1000);
    //     }
        
    //     window.onload = function () {
    //         var threesecond = 3,
    //             display = document.querySelector('#time');
    //         startTimer(threesecond, display);
    //     };</script> 
    //     <span id="time"></span><br> Your Entered Old Password is Wrong :(</p>`)
    //     }
    //   })
    // })

    app.get('/banner', (req, res) => {
      sess = req.session;
      // sess.active = 'banner';

      if (typeof sess.email != 'undefined') {

        db.collection('banner').find({}).toArray((err, result) =>{
          db.collection('poster').find({}).toArray((err, result1) =>{
            console.log('banner data available', result);

            var data = {
              data1: result1,
              data: result
            }

            responseData('adminPanel/banner.html', data, res)
          })
        })

      } else {
        res.redirect('/admin');
      }
    })

    app.post('/login', (req, res) => {
        sess = req.session;
        // sess.active = 'product';
        
        var email = req.body.email;
        var password = req.body.password;
    
        if (email && password) {
          
          db.collection("login").findOne({ email: email, password: password }, function (err, result) {
           
          if (err) {
              console.log(err);
          } 
            else if (result) {
              sess.email = req.body.email;
              // console.log(sess.email);
  
              res.redirect('/product/1');
            }
            else {
              responseData('adminPanel/index.html', {
                msg: 'email and password not metch',
                msgs: '',
                error: true
              }, res);
            }
            res.end();
          });
        }
        else {
          responseData('adminPanel/index.html', {
            msg: '',
            msgs: 'Please Enter Email And Password',
            error: true
          }, res);
          res.end();
        }
    });

  app.get('/category/:name/:page', (req, res) => {
    console.log('yes data arrive here')
    // sess.active = 'dashboard';
    var perPage = 12;
    var page = (typeof req.params.page != 'undefined') ? (req.params.page == 0) ? 1 : req.params.page || 1 : 1;
    var skip = (perPage * page) - perPage;
    var limit = "LIMIT " + skip + ", " + perPage;

    aggregate = [{
      $lookup: {
        from: 'subcategory',
        localField: 'id',
        foreignField: 'category',
        as: 'item',
      }
    }];

    db.collection("category").aggregate(aggregate).toArray((err, result3) => {

      db.collection('category').findOne({ name: req.params.name }, (err, result2) => {
        // console.log(result2._id, 'hh')
      //  console.log(result2)
        // return;
          if (!result2) {
            return res.redirect('/');
          }
        var cID = (result2.id).toString()
        db.collection('product').countDocuments({ category: cID }, (err, userCount) => {
          console.log(userCount, 'sss')
          if (skip >= userCount) {
            return res.redirect('/');
          }
          db.collection('product').find({ category: cID }).sort({ _id: -1 }).skip(skip).limit(perPage).toArray((err, result) => {

            db.collection('pccategory').find({ pcategory: 'Gold' }).toArray((err, result7) => {
              db.collection('pccategory').find({ pcategory: 'Diamond' }).toArray((err, result8) => {
                // console.log(result)

                db.collection('labourcharges').find({}).toArray((err, result9) => {



                  var l = [];
                  for (var i = 0; i < result.length; i++) {
                    if (req.params._id != result[i]._id) {
                      var goldamont = (result[i].ggram * result7[result7.length - 1].amount) / 10;
                      var diamondamount = result[i].dcarat * result8[result8.length - 1].amount;
                      var extradiamondamount = diamondamount + result[i].extradiamondamount;
                      var labourcharge = result[i].ggram * result9[0].amount;

                      var sumamount = goldamont + extradiamondamount + labourcharge;
                      // console.log(sumamount)
                      var data = {
                        _id: result[i]._id,
                        name: result[i].name,
                        price: parseInt(sumamount),
                        image: result[i].image
                      }
                      console.log(data)
                      l.push(data)
                    }
                  }

                  data = {
                    data1: result3,
                    data: l
                  }

                  // console.log(result2.name)
                  // console.log(result[0].category)
                  data['categorys'] = result[0].category;
                  data['categoryName'] = result2.name;
                  data['search'] = {};
                  data['current'] = page;
                  data['pages'] = Math.ceil(userCount / perPage);
                  responseData('jewellery/cproduct.html', data, res)
                })
              })
            })
          })
        })
      })
    })
  })


/*  app.get('/scategory/:name/:page', (req, res) => {
    console.log('yes data arrive here')
    // sess.active = 'dashboard';
    var perPage = 12;
    var page = (typeof req.params.page != 'undefined') ? (req.params.page == 0) ? 1 : req.params.page || 1 : 1;
    var skip = (perPage * page) - perPage;
    var limit = "LIMIT " + skip + ", " + perPage;

    aggregate = [{
      $lookup: {
        from: 'subcategory',
        localField: 'id',
        foreignField: 'category',
        as: 'item',
      }
    }];

    db.collection("category").aggregate(aggregate).toArray((err, result3) => {

      db.collection('subcategory').findOne({ name: req.params.name }, (err, result2) => {
        // console.log(result2._id, 'hh')
      //  var cID = (result2._id).toString()
if (!result2) {
          return res.redirect('/');
        }
var cID = (result2._id).toString()
        db.collection('product').countDocuments({ subcategory: cID }, (err, userCount) => {
          console.log(userCount)
          if (skip >= userCount) {
            return res.redirect('/');
          }
          db.collection('product').find({ subcategory: cID }).sort({ _id: -1 }).skip(skip).limit(perPage).toArray((err, result) => {
            // console.log(result)

            db.collection('pccategory').find({ pcategory: 'Gold' }).toArray((err, result7) => {
              db.collection('pccategory').find({ pcategory: 'Diamond' }).toArray((err, result8) => {
                // console.log(result)

                db.collection('labourcharges').find({}).toArray((err, result9) => {



                  var l = [];
                  for (var i = 0; i < result.length; i++) {
                    if (req.params._id != result[i]._id) {
                      var goldamont = (result[i].ggram * result7[result7.length - 1].amount) / 10;
                      var diamondamount = result[i].dcarat * result8[result8.length - 1].amount;
                      var extradiamondamount = diamondamount + result[i].extradiamondamount;
                      var labourcharge = result[i].ggram * result9[0].amount;

                      var sumamount = goldamont + extradiamondamount + labourcharge;
                      // console.log(sumamount)
                      var data = {
                        _id: result[i]._id,
                        name: result[i].name,
                        price: parseInt(sumamount),
                        image: result[i].image
                      }
                      console.log(data)
                      l.push(data)
                    }
                  }
                  data = {
                    data1: result3,
                    data: l
                  }

                  // console.log(result2.name)
                  // console.log(result[0].category)
                  data['categorys'] = result[0].category;
                  data['categoryName'] = result2.name;
                  data['search'] = {};
                  data['current'] = page;
                  data['pages'] = Math.ceil(userCount / perPage);
                  responseData('jewellery/scproduct.html', data, res)
                })
              })
            })
          })
        })
      })
    })
  })*/



  app.get('/scategory/:category/:name/:page', (req, res) => {
   // console.log('yes data arrive here')
    // sess.active = 'dashboard';
    var perPage = 12;
    var page = (typeof req.params.page != 'undefined') ? (req.params.page == 0) ? 1 : req.params.page || 1 : 1;
    var skip = (perPage * page) - perPage;
    var limit = "LIMIT " + skip + ", " + perPage;

    aggregate = [{
      $lookup: {
        from: 'subcategory',
        localField: 'id',
        foreignField: 'category',
        as: 'item',
      }
    }];

    db.collection("category").aggregate(aggregate).toArray((err, result3) => { 
      db.collection('category').findOne({name: req.params.category}, (err2, myres) => {
       db.collection('subcategory').findOne({ name: req.params.name, category: myres.id }, (err, result2) => {
        // console.log(result2._id, 'hh')
      //  var cID = (result2._id).toString()
        if (!result2) {
          return res.redirect('/');
        }
        var cID = (result2._id).toString()
        db.collection('product').countDocuments({ subcategory: cID }, (err, userCount) => {
     //     console.log(userCount)
     //    if (skip >= userCount) {
     //       return res.redirect('/');
     //     }
          var pnf = {
            data1: result3
          }
          pnf['scategory'] = result2.name; 
          pnf['category'] = myres.name;
          if (skip >= userCount) {
            return responseData('jewellery/pnotavailable.html', pnf, res)
          }
          db.collection('product').find({ subcategory: cID, category: myres.id }).sort({ _id: -1 }).skip(skip).limit(perPage).toArray((err, result) => {
            // console.log(result)

            db.collection('pccategory').find({ pcategory: 'Gold' }).toArray((err, result7) => {
              db.collection('pccategory').find({ pcategory: 'Diamond' }).toArray((err, result8) => {
                // console.log(result)

                db.collection('labourcharges').find({}).toArray((err, result9) => {



                  var l = [];
                  for (var i = 0; i < result.length; i++) {
                    if (req.params._id != result[i]._id) {
                      var goldamont = (result[i].ggram * result7[result7.length - 1].amount) / 10;
                      var diamondamount = result[i].dcarat * result8[result8.length - 1].amount;
                      var extradiamondamount = diamondamount + result[i].extradiamondamount;
                      var labourcharge = result[i].ggram * result9[0].amount;

                      var sumamount = goldamont + extradiamondamount + labourcharge;
                      // console.log(sumamount)
                      var data = {
                        _id: result[i]._id,
                        name: result[i].name,
                        price: parseInt(sumamount),
                        image: result[i].image
                      }
                      console.log(data)
                      l.push(data)
                    }
                  }
                  data = {
                    data1: result3,
                    data: l
                  }

                  // console.log(result2.name)
                  // console.log(result[0].category)
                  data['categorys'] = result[0].category;
                  data['category'] = myres.name;
                  data['scategory'] = result2.name;
                  data['search'] = {};
                  data['current'] = page;
                  data['pages'] = Math.ceil(userCount / perPage);
                  responseData('jewellery/scproduct.html', data, res)
                  })
                })
              })
            })
          })
        })
      })
    })
  })

    
      app.get('/products/:_id', (req, res) => {

        if (!objectId.isValid(req.params._id)) {
          return res.redirect('/');
        }

        aggregate = [{
          $lookup: {
            from: 'subcategory',
            localField: 'id',
            foreignField: 'category',
            as: 'item',
          }
        }];

        db.collection("category").aggregate(aggregate).toArray((err, result3) => {
          db.collection("product").findOne({ _id: objectId(req.params._id) }, (err, result2) => {
            // console.log(result2, 'hh')
            if (!(result2)) {
              return res.redirect('/');
            }
            db.collection("category").findOne({ id: result2.category }, (err, result4) => {

              var cID = (result2.category).toString()
              db.collection('product').find({ 'category': cID }).sort({ date: -1 }).toArray((err, result) => {
                db.collection('pccategory').find({}).toArray((err, result6) => {

                  db.collection('pccategory').find({ pcategory: 'Gold' }).toArray((err, result7) => {
                    db.collection('pccategory').find({ pcategory: 'Diamond' }).toArray((err, result8) => {
                      db.collection('labourcharges').find({}).toArray((err, result9) => {
                        db.collection('subcategory').findOne({_id: objectId(result2.subcategory)}, (err, result10) => {
                        
                        var goldamont = (result2.ggram * result7[result7.length - 1].amount) / 10;
                        var diamondamount = result2.dcarat * result8[result8.length - 1].amount;
                        var extradiamondamount = diamondamount + result2.extradiamondamount;
                        var labourcharge = result2.ggram * result9[0].amount;
                        var sumamount = goldamont + extradiamondamount + labourcharge;

                        var result5 = {
                          _id: result2._id,
                          name: result2.name,
                          price: parseInt(sumamount),
                          category: result4.name,
                          dcarat: result2.dcarat,
                          dpeaces: result2.dpeaces,
                          ggram: result2.ggram,
                          subcategory: result10.name,
                          image: result2.image,
                          video: result2.video,
                          description: result2.description
                        }
                        console.log(result5)
                        var h = [];
                        for (var i = 0; i < result.length; i++) {
                          if (req.params._id != result[i]._id) {
                            if (i <= 8) {
                              var goldamont = (result[i].ggram * result7[result7.length - 1].amount) / 10;
                              var diamondamount = result[i].dcarat * result8[result8.length - 1].amount;
                              var extradiamondamount = diamondamount + result[i].extradiamondamount;
                              var labourcharge = result[i].ggram * result9[0].amount;

                              var sumamount = goldamont + extradiamondamount + labourcharge;
                              // console.log(sumamount)
                              var data = {
                                _id: result[i]._id,
                                name: result[i].name,
                                price: parseInt(sumamount),
                                category: result[i].category,
                                position: result[i].position,
                                image: result[i].image,
                                date: result[i].date
                              }
                              // console.log(data)
                              h.push(data)
                            }
                          }
                        }
                        data = {
                          data1: result3,
                          data2: result5,
                          data3: result6,
                          data: h
                        }
                        // res.send(data)

                        data['ct'] = result7[result7.length - 1].name;
                        data['dd'] = result8[result8.length - 1].name;
                        responseData('jewellery/inquiry.html', data, res)
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })

    app.post('/addinquiry', (req, res) => {
      var data = req.body;
      var item = {
        contactname : data.contactname,
        mobile: data.mobile,
        id: data.id,
        name: data.name,
        category: data.category,
        image: data.image,
        date: new Date()
      };
      db.collection('inquiry').insertOne(item, function (err, result2) {
        res.redirect('/');
      })
    })

      app.get('/inquiry/:page', (req, res) => {

        sess = req.session;
        if (typeof sess.email != 'undefined') {
          var perPage = 10;
          var page = (typeof req.params.page != 'undefined') ? (req.params.page == 0) ? 1 : req.params.page || 1 : 1;
          var skip = (perPage * page) - perPage;
          var limit = "LIMIT " + skip + ", " + perPage;
          db.collection('inquiry').countDocuments((err, userCount) => {
            db.collection('inquiry').find({}).sort({ _id: -1 }).skip(skip).limit(perPage).toArray((err, result) => {

              data = {
                data: result
              }
              data['search'] = {};
              data['current'] = page;
              data['pages'] = Math.ceil(userCount / perPage);

              responseData('adminPanel/inquiry.html', data, res)
            })
          })
        } else {
          res.redirect('/admin');
        }
      })

    app.post('/deleteinquiry/:_id', (req, res) => {
      sess = req.session
      if(typeof sess.email != 'undefined'){
      db.collection("inquiry").deleteOne({ _id: objectId(req.params._id) }, (err, rows) => {
        // console.log("id deleted succeessfully")
        res.redirect('/inquiry/1')
      })
    }else{
      res.redirect('/admin');
    }
    })

    app.get('/product/:page', (req, res) => {
     
      sess = req.session;
      // sess.active = 'product';
      if(typeof sess.email != 'undefined'){
        var perPage = 10;
        var page = (typeof req.params.page != 'undefined') ? (req.params.page == 0) ? 1 : req.params.page || 1 : 1;
        var skip = (perPage * page) - perPage;
        var limit = "LIMIT " + skip + ", " + perPage;
        db.collection('product').countDocuments((err, userCount) => {
          db.collection('category').find({}).toArray((err, result2) => {
            db.collection('subcategory').find({}).toArray((err, result3) => {
            // console.log(result2)
              db.collection('product').find({}).sort({ _id: -1 }).skip(skip).limit(perPage).toArray((err, result) => {
            var a = [];
            for(var j = 0; j < result.length; j++){
              for(var i = 0; i < result2.length; i++){
                for(var k = 0; k < result3.length; k++){
                  if(result2[i].id == result[j].category && result3[k]._id == result[j].subcategory){
                    var data = {
                      _id: result[j]._id,
                      categoryName: result2[i].name,
                      subcategoryName: result3[k].name,
                      tselling: result[j].tselling,
                      lcollection: result[j].lcollection,
                      description: result[j].description,
                      name: result[j].name,
                      dcarat: result[j].dcarat,
                      ggram: result[j].ggram,
                      image: result[j].image,
                      position: result[j].position,
                    }
                    a.push(data)
                  }
                }
              }
            }
            // console.log(a)
            data = {
              data: a
            }
            data['search'] = {};
            data['current'] = page;
            data['totalproduct'] = userCount;
            data['pages'] = Math.ceil(userCount / perPage);

          responseData('adminPanel/product.html',data, res)
          // res.send(data)
          })
        })
        })
      })
      }else{
        res.redirect('/admin');
      }
    })


    app.get('/addProduct', (req, res) => {
      sess = req.session;
      if(typeof sess.email != 'undefined'){

        db.collection('category').find({}).toArray((err, result) => {
          db.collection('pcategory').find({}).toArray((err, result2) => {

            var data = {
            data: result,
            data2: result2
          }
          responseData('adminPanel/addproduct.html', data, res)

          })
        })
      }else{
        res.redirect('/admin');
      }
    })


    app.get('/labourcharges', (req, res) => {
      sess = req.session;

      if (typeof sess.email != 'undefined') {

        db.collection('labourcharges').find({}).toArray((err, result) => {

          var data = {
            data: result[0],
          }
          responseData('adminPanel/labourcharge.html', data, res)
        })
      } else {
        res.redirect('/admin');
      }
    })

    app.get('/editproduct/:_id', (req, res) => {
      sess = req.session
      if(typeof sess.email != 'undefined'){
        if (!objectId.isValid(req.params._id)) {
          return res.redirect('/product/1');
        }
        db.collection('category').find({}).toArray((err, result1) => {
          db.collection('product').findOne({_id: objectId(req.params._id)}, (err, result3) => {
          if(result3 == null || result3 == undefined || result3.length < 1){
            return res.redirect('/product/1');
          }
            db.collection('category').findOne({id: result3.category}, (err, result2) => {
              db.collection('subcategory').findOne({_id: objectId(result3.subcategory)}, (err, result4) => {
                db.collection('subcategory').find({category: result4.category}).toArray((err, result5) => {
                  // console.log(result2)
                  data = {
                    data: result3,
                    data1: result1,
                    data2: result2,
                    data3: result4,
                    data4: result5,
                    error: true
                  }
                  responseData('adminPanel/editproduct.html', data, res);
                  res.end()
                })
              })
            })
          })
        })
      }else{
        res.redirect('/admin');
      }
    })

    app.get('/editcategory/:id', (req, res) => {
      sess = req.session
      if(typeof sess.email != 'undefined'){
          db.collection('category').findOne({id: req.params.id}, (err, result3) => {
            // console.log(result2)
            data = {
              data: result3,
              error: true
            }
            responseData('adminPanel/editcategory.html', data, res);
            res.end()
          })
      }else{
        res.redirect('/admin');
      }
    })

    app.post('/editcategory/:id', (req, res) => {
      sess = req.session
      if(typeof sess.email != 'undefined'){
        var item = {
          name: req.body.name
        }
        db.collection('category').updateOne({ id: req.params.id }, { $set: item })
        res.redirect('/category')
      }else{
        res.redirect('/admin');
      }
    })


    app.get('/editsubcategory/:_id', (req, res) => {
      sess = req.session
      if (typeof sess.email != 'undefined') {
        db.collection('subcategory').findOne({ _id: objectId(req.params._id) }, (err, result3) => {
          // console.log(result2)
          data = {
            data: result3,
            error: true
          }
          responseData('adminPanel/editsubcategory.html', data, res);
          res.end()
        })
      } else {
        res.redirect('/admin');
      }
    })


  app.post('/editsubcategory/:_id', (req, res) => {
    sess = req.session
    if (typeof sess.email != 'undefined') {
      var item = {
        name: req.body.name
      }
      db.collection('subcategory').countDocuments({ name: req.body.name, category: req.body.category }, (err1, result1) => {
        if (result1 == 0) {
          db.collection('subcategory').updateOne({ _id: objectId(req.params._id) }, { $set: item }, (err2, result2) => {
            res.redirect('/category')
          })
        } else {
          res.send({ error: true })
        }
      })
    } else {
      res.redirect('/admin');
    }
  })

   /* app.post('/editsubcategory/:_id', (req, res) => {
      sess = req.session
      if (typeof sess.email != 'undefined') {
        var item = {
          name: req.body.name
        }
        db.collection('subcategory').updateOne({ _id: objectId(req.params._id)}, { $set: item })
        res.redirect('/category')
      } else {
        res.redirect('/admin');
      }
    })

    app.get('/demoapi', (req, res) => {

      var data = req.query;
      res.send(data)
    })*/

  /*  app.post('/deleteproduct/:_id', (req, res) => {
      sess = req.session
      if (typeof sess.email != 'undefined') {
        db.collection("product").findOneAndDelete({ _id: objectId(req.params._id) }, (err, rows) => {
          res.redirect('/product/1')
        })
      } else {
        res.redirect('/admin');
      }
    })*/

   app.post('/deleteproduct/:_id', (req, res) => {
    sess = req.session
    if (typeof sess.email != 'undefined') {

      db.collection('product').findOne({ _id: objectId(req.params._id) }, (err1, findproduct) => {
        for (var i = 0; i < (findproduct.image).length; i++) {
          const imagepath = 'views/jewellery/image/' + findproduct.image[i];
          fs.unlink(imagepath, (err) => {
            if (err) {
              console.error(err)
              return
            }
          })
        }

        const videopath = 'views/jewellery/video/' + findproduct.video;
        fs.unlink(videopath, (err) => {
          if (err) {
            console.error(err)
            return
          }
        })
        db.collection("product").findOneAndDelete({ _id: objectId(req.params._id) }, (err2, rows) => {
          res.redirect('/product/1')
        })
      })
    } else {
      res.redirect('/admin');
    }
  })

    app.post('/tselling/:_id', (req, res) => {
      sess = req.session
      if(typeof sess.email != 'undefined'){
        db.collection("product").findOne({ _id: objectId(req.params._id) }, (err, result) => {
          if(result.tselling == 'checked'){
            var item = {
              tselling: '0',
            };
            db.collection('product').updateOne({ _id: objectId(req.params._id) }, { $set: item })
          }else{
            var item = {
              tselling: 'checked',
            };
            db.collection('product').updateOne({ _id: objectId(req.params._id) }, { $set: item })
          }
        })
      }else{
        res.redirect('/admin');
      }
    })


    app.post('/lcollection/:_id', (req, res) => {
      sess = req.session
      if(typeof sess.email != 'undefined'){
        db.collection("product").findOne({ _id: objectId(req.params._id) }, (err, result) => {
          if(result.lcollection == 'checked'){
            var item = {
              lcollection: '0',
            };
            db.collection('product').updateOne({ _id: objectId(req.params._id) }, { $set: item })
          }else{
            var item = {
              lcollection: 'checked',
            };
            db.collection('product').updateOne({ _id: objectId(req.params._id) }, { $set: item })
          }
        })
      }else{
        res.redirect('/admin');
      }
    })




    app.post('/deletebanner/:_id', (req, res) => {
      sess = req.session
      if (typeof sess.email != 'undefined') {
        db.collection("banner").deleteOne({ _id: objectId(req.params._id) }, (err, rows) => {
          // console.log("id deleted succeessfully")
          res.redirect('/banner')
        })
      } else {
        res.redirect('/admin');
      }
    })

    app.post('/deleteposter/:_id', (req, res) => {
      sess = req.session
      if (typeof sess.email != 'undefined') {
        db.collection("poster").deleteOne({ _id: objectId(req.params._id) }, (err, rows) => {
          // console.log("id deleted succeessfully")
          res.redirect('/banner')
        })
      } else {
        res.redirect('/admin');
      }
    })

    app.post('/deletecategory/:_id', (req, res) => {
      sess = req.session
      if (typeof sess.email != 'undefined') {
        db.collection("category").deleteOne({ _id: objectId(req.params._id) }, (err, rows) => {
          // console.log("id deleted succeessfully")
          res.redirect('/category')
        })
      } else {
        res.redirect('/admin');
      }
    })


    app.post('/deletesubcategory/:_id', (req, res) => {
      sess = req.session
      if (typeof sess.email != 'undefined') {
        db.collection("subcategory").deleteOne({ _id: objectId(req.params._id) }, (err, rows) => {
          // console.log("id deleted succeessfully")
          res.redirect('/category')
        })
      } else {
        res.redirect('/admin');
      }
    })

    app.post('/deletepccategory/:_id/:length', (req, res) => {
      sess = req.session
      if (typeof sess.email != 'undefined') {
        db.collection("pccategory").deleteOne({ _id: objectId(req.params._id) }, (err, rows) => {
          // console.log("id deleted succeessfully")
          res.redirect('/category')
        })
      } else {
        res.redirect('/admin');
      }
    })

    // app.get('/category', (req, res) => {
    //   sess = req.session;
    //   sess.active = 'category';

    //   if(typeof sess.email != 'undefined'){
    //     db.collection("category").find({}).toArray((err, result) => {
    //       // console.log(result)
    //       // var data = {
    //       //   data: result
    //       // }

    //       // responseData('adminPanel/category.html', data, res)
    //       responseData('adminPanel/category.html', {
    //         msg1: '',
    //         data: result,
    //         error: true
    //       }, res)
    //     })
        
    //   }else{
    //     res.redirect('/admin');
    //   }
    // })

    app.get('/getcategory', (req, res) => {
      db.collection("category").find({}).toArray((err, result) => { 
        res.send(result)
      })
    })

    app.get('/getsubcategory/:id', (req, res) => {
      db.collection("subcategory").find({category: req.params.id}).toArray((err, result) => { 
        res.send(result)
      })
    })

    app.get('/getpccategory/:_id', (req, res) => {
      db.collection("pccategory").find({pcategory: req.params._id}).toArray((err, result) => { 
        res.send(result)
      })
    })


    app.get('/category', (req, res) => {
      sess = req.session;
      if (typeof sess.email != 'undefined') {

        aggregate = [{
          $lookup: {
            from: 'pccategory',
            localField: 'name',
            foreignField: 'pcategory',
            as: 'item',
          }
        }];

        category = [{
          $lookup: {
            from: 'subcategory',
            localField: 'id',
            foreignField: 'category',
            as: 'item',
          }
        }];

        db.collection("pcategory").aggregate(aggregate).toArray((err, result1) => {
          db.collection("category").aggregate(category).toArray((err, result) => {
            data = {
              data1: result,
              data2: result1,
              error: true
            }
            responseData('adminPanel/subcategory.html', data, res)
          })
        })
      } else {
        res.redirect('/admin');
      }
    })

    app.post('/insertcategory', (req, res) => {
      sess = req.session;

      if(typeof sess.email != 'undefined'){

        var data = req.body;
          // console.log(data)
          var file = req.files.uploaded_image;
          var img_name = Date.now() + '_' + file.name;

          if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/gif") {

            file.mv('views/jewellery/image/' + img_name, function (err) {
              if (err)
                return res.status(500).send(err);

          insertData = {
            name: data.name,
            image: img_name,
            date: new Date(),
            id : uniqid('Aa0',15)
          }
          db.collection('category').find({name: data.name}).toArray((err, result) => {
            db.collection("category").find({}).toArray((err, result1) => {

            // console.log('d', result.length)

            if(result.length > 0){

              responseData('adminPanel/category.html', {
                msg1: 'Category already Available',
                data: result1,
                error: true
              }, res)

            }else{

              db.collection("category").insert(insertData)
              res.redirect('/category');

            }
            

          })
        })
        })
          }
      } else {
      res.redirect('/admin');
      }
    })


   /* app.post('/insertsubcategory', (req, res) => {
      sess = req.session;

      if(typeof sess.email != 'undefined'){

        var data = req.body;
          // console.log(data)
          insertData = {
            category: data.category,
            name: data.name,
            date: new Date()
          }

          db.collection("subcategory").insert(insertData)
          res.redirect('/category');

        } else {
          res.redirect('/admin');
        }
      })*/


  app.post('/insertsubcategory', (req, res) => {
    sess = req.session;

    if (typeof sess.email != 'undefined') {

      var data = req.body;
      insertData = {
        category: data.category,
        name: data.name,
        date: new Date()
      }

      db.collection('subcategory').countDocuments({ name: data.name, category: data.category }, (err1, result1) => {
        if (result1 == 0) {
          db.collection("subcategory").insertOne(insertData, (err2, result2) => {
            res.send({ error: false })
          })
        } else {
          res.send({ error: true })
        }
      })

    } else {
      res.redirect('/admin');
    }
  })

    app.post('/insertpcategory', (req, res) => {
      sess = req.session;

      if(typeof sess.email != 'undefined'){

        var data = req.body;
          // console.table(data)

          insertData = {
            name: data.name,
            pcategory: data.pcategory,
            amount: parseFloat(0),
            date: new Date()
          }
          
          db.collection("pccategory").insertOne(insertData)
          res.redirect('/category');
          
        } else {
          res.redirect('/admin');
        }
      })

      app.post('/insertbudget', (req, res) => {
        sess = req.session;
  
        if(typeof sess.email != 'undefined'){
  
          var data = req.body;
            console.table(data)
  
            insertData = {
              name: data.name,
              date: new Date()
            }
            
            db.collection("pcategory").insertOne(insertData)
            res.redirect('/category');
            
          } else {
            res.redirect('/admin');
          }
        })

       /* app.post('/insertproduct', (req, res) => {
          sess = req.session;

          if (typeof sess.email != 'undefined') {
            var data = req.body;

            var file = req.files.uploaded_image;
            var img_name = Date.now() + '_' + file.name;

            if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/gif") {

              file.mv('views/jewellery/image/' + img_name, function (err) {
                if (err)
                  return res.status(500).send(err);

                var dc = data.dcarat == '' ? 0 : parseFloat(data.dcarat);
                var dp = data.dpeaces == '' ? 0 : parseFloat(data.dpeaces);
                var edc = data.extradiamondcarate == '' ? 0 : parseFloat(data.extradiamondcarate);
                var edq = data.extradiamondquantity == '' ? 0 : parseFloat(data.extradiamondquantity);
                var eda = data.extradiamondamount == '' ? 0 : parseFloat(data.extradiamondamount);

                insertdata = {
                  name: data.name,
                  ggram: parseFloat(data.ggram),
                  category: data.category,
                  subcategory: data.subcategory,
                  dcarat: dc,
                  dpeaces: dp,
                  extradiamondcarate: edc,
                  extradiamondquantity: edq,
                  extradiamondamount: eda,
                  description: data.description,
                  image: img_name,
                  date: new Date()
                }

                db.collection('product').insertOne(insertdata)
                res.redirect('/addProduct');
              })
            }
          } else {
            res.redirect('/admin');
          }
        })*/

        
  app.post('/insertproduct', (req, res) => {
    sess = req.session;

    if (typeof sess.email != 'undefined') {

      var data = req.body;
      var multiImg = [];
      var vfile = req.files.uploaded_video;
      if (vfile) {
        var video_name = Date.now() + '_' + vfile.name;
        if (vfile.mimetype == "video/mp4" || vfile.mimetype == "video/mkv" || vfile.mimetype == "video/3gp") {

          vfile.mv('views/jewellery/video/' + video_name, function (err) {
            if (err)
              return res.status(500).send(err);
            addData();

          })
        }
      }
      else {
        addData();
      }

      function addData() {
        var file = req.files.uploaded_image;
        if (!Array.isArray(file)) {
          file = [file];
        }

        function addImg(file, i, done) {
          var img_namess = Date.now() + '_' + file[i].name;
          var img_name = img_namess.trim();

          if (file[i].mimetype == "image/jpeg" || file[i].mimetype == "image/png" || file[i].mimetype == "image/jpg") {

            file[i].mv('views/jewellery/image/' + img_name, function (err) {
              if (err)
                return res.status(500).send(err)
            })
            multiImg.push(img_name)
            if (typeof file[++i] != 'undefined') {
              addImg(file, i, done);
            } else {
              return done();
            }

          }
        }

        addImg(file, 0, (done) => {
          console.log(multiImg, 'd')
          var dc = data.dcarat == '' ? 0 : parseFloat(data.dcarat);
          var dp = data.dpeaces == '' ? 0 : parseFloat(data.dpeaces);
          var edc = data.extradiamondcarate == '' ? 0 : parseFloat(data.extradiamondcarate);
          var edq = data.extradiamondquantity == '' ? 0 : parseFloat(data.extradiamondquantity);
          var eda = data.extradiamondamount == '' ? 0 : parseFloat(data.extradiamondamount);

          insertdata = {
            name: data.name,
            ggram: parseFloat(data.ggram),
            category: data.category,
            subcategory: data.subcategory,
            dcarat: dc,
            dpeaces: dp,
            extradiamondcarate: edc,
            extradiamondquantity: edq,
            extradiamondamount: eda,
            description: data.description,
            image: multiImg,
            video: video_name,
            date: new Date()
          }
          db.collection('product').insertOne(insertdata)
          res.redirect('/addProduct');
        })

      }
    } else {
      res.redirect('/admin');
    }
  })


  app.post('/editproductimage/:_id', (req, res) => {
    sess = req.session;

    if (typeof sess.email != 'undefined') {
      var data = req.body;

      var multiImg = [];
      var file = req.files.uploaded_image;
      if (!Array.isArray(file)) {
        file = [file];
      }
      for (var i = 0; i < file.length; i++) {

        var img_namess = Date.now() + '_' + file[i].name;

        var img_name = img_namess.trim();
        console.log(img_name)
        if (file[i].mimetype == "image/jpeg" || file[i].mimetype == "image/png" || file[i].mimetype == "image/jpg") {

          file[i].mv('views/jewellery/image/' + img_name, function (err) {
            if (err)
              return res.status(500).send(err);
          })

          var img_names = {
            img: img_name
          }

          multiImg.push(img_names)
        }
      }

      var multipleImg = [];
      for (var i = 0; i < multiImg.length; i++) {
        multipleImg.push(multiImg[i].img)
      }

      db.collection('product').updateOne({ _id: objectId(req.params._id) }, { $push: { image: { $each: multipleImg } } }, (req, result) => {
        res.redirect('/product/1')
      })
    } else {
      res.redirect('/admin')
    }
  })

        app.get('/getamountvalue/:_id/:kt/:dd', (req, res) => {

          // console.log(req.params._id,req.params.kt,req.params.dd  )
          db.collection('product').findOne({_id: objectId(req.params._id)}, (err, result1) => {
            db.collection('pccategory').findOne({_id: objectId(req.params.kt)}, (err, result2) => {
              db.collection('pccategory').findOne({_id: objectId(req.params.dd)}, (err, result3) => {
                db.collection('labourcharges').find({}).toArray((err, result4) => {

                // console.log(result4[0])

                var goldamont = (result1.ggram * result2.amount ) / 10;
                var labourcharge = result1.ggram * result4[0].amount;
                var diamondamount = result1.dcarat * result3.amount;
                var extradiamondamount = diamondamount + result1.extradiamondamount;

                // console.log(goldamont,'Gold')
                // console.log(diamondamount, 'diamond')
                // console.log(extradiamondamount, 'extradiamond')

                var sumamount = goldamont + extradiamondamount + labourcharge;

                res.send({data: parseInt(sumamount), dd: result3.name, kt: result2.name});

                // console.log(result1.name, result2.name, result3.name)
                // var arr=[1,2,3,4];
                // console.log(arr[arr.length-1])
              })
              })
            })
          })
        })

    // app.post('/insertproduct', (req, res) => {
    //   sess = req.session;

    //   if (typeof sess.email != 'undefined') {
      
    //       var data = req.body;
    //       // console.table(data);
    //       var file = req.files.uploaded_image;
    //       var img_name = Date.now() + '_' + file.name;

    //       if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/gif") {

    //         file.mv('views/jewellery/image/' + img_name, function (err) {
    //           if (err)
    //             return res.status(500).send(err);

    //           var item = {
    //             name: data.name,
    //             price: parseFloat(data.price),
    //             category: data.category,
    //             subcategory: data.subcategory,
    //             pcategory: data.pcategory,
    //             pccategory: data.pccategory,
    //             tselling:'0',
    //             lcollection:'0',
    //             image: img_name,
    //             description: data.description,
    //             date: new Date()
    //           };
    //           db.collection('product').insert(item, function (err, result2) {
    //             res.redirect('/addProduct');
    //           })
    //         })
    //       }
    //     } else {
    //     res.redirect('/admin');
    //   }
    // })


    // app.post('/priceupdown', (req, res) => {
    //   sess = req.session;

    //   if (typeof sess.email != 'undefined') {
        
    //     var data = req.body;
    //     console.log(data)

    //     if('+' == data.price){

    //       var query = { pccategory: req.body.pccategory};
    //       // "$concat": [ { "$substr": [ { "$multiply": [ { "$divide": [ "$count", {"$literal": nums }] }, 100 ] }, 0,2 ] }, "", "%" ]
    //       var data = { $mul: { price: JSON.parse(req.body.amount) }}

    //     //   var data = [
    //     //     { "$group": { "_id": {"colour":  "$colour"}, "count": { "$sum": 1 }}},   
    //     //     { "$project": {
    //     //         "count": 1,
    //     //         "percentage": {
    //     //             "$concat": [ { "$substr": [ { "$multiply": [ { "$divide": [ "$count", total ] }, 100 ] }, 0,4 ] }, "", "%" ]}
    //     //         }
    //     //     }
    //     // ]  

    //       db.collection('product').updateMany(query, data, function (err, result2) {
    //         res.redirect('/pricerise')
    //       })

    //     }else if('-' == data.price){
    //       var query = { pccategory: req.body.pccategory};
    //       var data = { $inc: { price: -req.body.amount }}

    //       db.collection('product').updateMany(query, data, function (err, result2) {
    //         res.redirect('/pricerise')
    //       })

    //     }
        
    //   } else {
    //     res.redirect('/admin');
    //   }
    // })


   /* app.post('/editproductimage/:_id', (req, res) => {
      sess = req.session;

      if (typeof sess.email != 'undefined') {
          var file = req.files.uploaded_image;
          var img_name = Date.now() + '_' + file.name;
          if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
            file.mv('views/jewellery/image/' + img_name, function (err) {
              if (err)
                return res.status(500).send(err);
              var item = {
                image: img_name,
                date: new Date()
              };
              db.collection('product').updateOne({ _id: objectId(req.params._id) }, { $set: item }, function (err, result2) {
                res.redirect('/Product/1');
              })
            })
          }
        } else {
        res.redirect('/admin');
      }
    })*/

      app.post('/editproduct/:_id', (req, res) => {
        sess = req.session;

        if (typeof sess.email != 'undefined') {
          var data = req.body;
           var dc = data.dcarat == '' ? 0 : parseFloat(data.dcarat);
      var dp = data.dpeaces == '' ? 0 : parseFloat(data.dpeaces);
      var edc = data.extradiamondcarate == '' ? 0 : parseFloat(data.extradiamondcarate);
      var edq = data.extradiamondquantity == '' ? 0 : parseFloat(data.extradiamondquantity);
      var eda = data.extradiamondamount == '' ? 0 : parseFloat(data.extradiamondamount);

      var item = {
        name: data.name,
        ggram: parseFloat(data.ggram),
        category: data.category,
        subcategory: data.subcategory,
        dcarat: dc,
        dpeaces: dp,
        extradiamondcarate: edc,
        extradiamondquantity: edq,
        extradiamondamount: eda,
        description: data.description,
        date: new Date()
      }
      db.collection('product').updateOne({ _id: objectId(req.params._id) }, { $set: item }, function (err, result20) { 
           res.redirect('/product/1');
          })
        } else {
          res.redirect('/admin');
        }
      })
       

  app.post('/editproductvideo/:_id', (req, res) => {
    sess = req.session;

    if (typeof sess.email != 'undefined') {
      db.collection('product').findOne({_id: objectId(req.params._id)}, (err, result1) => {
        var path = 'views/jewellery/video/' + result1.video;
        fs.unlink(path, (err) => {})

      var file = req.files.uploaded_video;
      var img_name = Date.now() + '_' + file.name;
      if (file.mimetype == "video/mp4" || file.mimetype == "video/mkv" || file.mimetype == "video/3gp") {
        file.mv('views/jewellery/video/' + img_name, function (err) {
          if (err)
            return res.status(500).send(err);
          var item = {
            video: img_name,
            date: new Date()
          };
          db.collection('product').updateOne({ _id: objectId(req.params._id) }, { $set: item }, function (err, result2) {
            res.redirect('/Product/1');
          })
        })
      }
    })
    } else {
      res.redirect('/admin');
    }
  })

  app.get('/deleteimage/:image/:_id', (req, res) => {
    var img = req.params.image;
    var id = req.params._id;
    var path = 'views/jewellery/image/' + img;
      fs.unlink(path, (err) => {
        db.collection('product').updateOne({ _id: objectId(id) }, { $pull: { image: img }}, (req, result) => {
          res.send({error: false})
        })
      })
  })

    app.get('/logout', (req, res) => {
      req.session.destroy(function (err) {
        console.log(err);
        res.redirect('/admin');
      })
    })

/*    app.use(function (req, res) {
        res.send('<style>*{transition:all .6s}html{height:100%}body{font-family:Lato,sans-serif;color:#888;margin:0}#main{display:table;width:100%;height:100vh;text-align:center}.fof{display:table-cell;vertical-align:middle}.fof h1{font-size:50px;display:inline-block;padding-right:12px;animation:type .5s alternate infinite}@keyframes type{from{box-shadow:inset -3px 0 0 #888}to{box-shadow:inset -3px 0 0 transparent}}</style><div id="main"><div class="fof"><h1>Error 404, Page Not Found</h1></div></div>')
    })*/


  app.use(function (req, res) {
    aggregate = [{
      $lookup: {
        from: 'subcategory',
        localField: 'id',
        foreignField: 'category',
        as: 'item',
      }
    }];

    db.collection("category").aggregate(aggregate).toArray((err, result3) => {
      responseData('jewellery/404.html', {data1: result3}, res)
    })
  })





})
